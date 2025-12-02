import { Component, OnInit } from '@angular/core';
import { Producto } from '../../model/producto';
import { DecimalPipe , CommonModule} from '@angular/common';
import { CarritoService } from '../../service/carrito-service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import {Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdenService } from '../../service/orden-service';

@Component({
  selector: 'app-carrito',
  standalone: true, 
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
  imports : [CommonModule,                            // 👈 Necesario para @for y pipes
RouterModule,DecimalPipe,FormsModule ]  // 👈 IMPORTAR AQUÍ

})
export class CarritoComponent implements OnInit {

  carrito: any[] = [];
  total: number = 0;

  metodoPago: string = "";
  tarjeta = { numero: "", fecha: "", cvv: "" };
  yape = { numero: "" };
  plin = { numero: "" };

  constructor(
    public carritoService: CarritoService,
    private router: Router,
    private ordenService:OrdenService) {}

  ngOnInit(): void {
    this.cargarCarrito();

  }

  cargarCarrito() {
    this.carritoService.obtenerCarrito().subscribe(data => {
      this.carrito = data;

      // Agregar campo cantidadSeleccionada
      (this.carrito as any[]).forEach((p: any) => {
        if (!p.cantidadSeleccionada) {
          p.cantidadSeleccionada = 1;
        }
      });

      this.calcularTotal();
    });
  }

  eliminar(index: number): void {
    this.carritoService.eliminar(index).subscribe(data => {
      this.carrito = data;
      this.calcularTotal();
    });
  }

  limpiar(): void {
    this.carritoService.limpiar().subscribe(data => {
      this.carrito = data;
      this.total = 0;
    });
  }

  actualizarCantidad(): void {
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((sum, p) =>
      sum + (p.precio * p.cantidadSeleccionada), 0);
  }

  procesarPago() {

  // 1. Validar método de pago
  if (!this.metodoPago) {
    alert("Selecciona un método de pago.");
    return;
  }

  // 2. Validar login
  if (!localStorage.getItem("usuario")) {
    alert("Debes iniciar sesión antes de pagar");
    this.router.navigate(['/login']);
    return;
  }

  const usuario = JSON.parse(localStorage.getItem("usuario")!);

  // 3. Armar data
  const data = {
    usuarioId: usuario.usu_id,
    metodoPago: this.metodoPago,
    detalles: this.carrito.map((p: any) => ({
      productoId: Number(p.id ?? p.prod_id),
      cantidad: Number(p.cantidadSeleccionada)
    }))
  };

  // 4. Enviar al backend
  this.ordenService.crearOrden(data).subscribe({
    next: () => {
      alert("Pago procesado correctamente ✔");
      this.carritoService.limpiar().subscribe(() => {
        this.carrito = [];
        this.total = 0;
      });
    },
    error: () => alert("Error al procesar el pago")
  });
}
}
