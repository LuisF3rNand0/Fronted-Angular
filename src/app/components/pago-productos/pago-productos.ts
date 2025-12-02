import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../service/carrito-service'
import { RouterModule } from '@angular/router';
import { OrdenService } from '../../service/orden-service';
import { Producto } from '../../model/producto';

@Component({
  selector: 'app-pago-productos',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './pago-productos.html',
  styleUrl: './pago-productos.css',
})


export class PagoProductos implements OnInit{

  carrito: any[] = [];
  total: number = 0;

  metodoPago: string = "";

  tarjeta = {
    numero: '',
    fecha: '',
    cvv: ''
  };

  yape = {
    numero: ''
  };

  constructor(
    private carritoService: CarritoService,
    private ordenService:OrdenService
  ) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.carritoService.obtenerCarrito().subscribe(data => {
      this.carrito = data;

      (this.carrito as any[]).forEach((p: any) => {
        if (!p.cantidadSeleccionada) p.cantidadSeleccionada = 1;
      });

      this.total = this.carrito.reduce(
        (s, p) => s + (p.precio * p.cantidadSeleccionada),
        0
      );
    });
  }
  
  procesarPago() {

    // 1️⃣ Verificar login
  if (!localStorage.getItem("usuario")) {
    alert("Debes iniciar sesión antes de pagar");
    window.location.href = "/login";
    return;
  }

  // 2️⃣ Obtener usuario
  const usuario = JSON.parse(localStorage.getItem("usuario")!);
  const usuarioId = usuario.usu_id;

  // 3️⃣ Depurar productos del carrito
  console.log("Carrito completo:", this.carrito);

  // 4️⃣ Enviar SOLO lo que Spring necesita
  const data = {
    usuarioId: usuarioId,
    detalles: this.carrito.map((p: any) => ({
      productoId: Number(p.id ?? p.prod_id),
      cantidad: Number(p.cantidadSeleccionada)
    }))
  };

  console.log("Carrito completo:", this.carrito);
  console.log("Usuario desde localStorage:", usuario);
  console.log("Orden que Angular envía:", data);
  console.log("Carrito REAL:", this.carrito); 




  // 5️⃣ Enviar al backend
  this.ordenService.crearOrden(data).subscribe({
    next: (res) => {
      console.log("Orden creada:", res);
      alert("Orden creada exitosamente ✔");

      this.carritoService.limpiar().subscribe(() => {
        this.carrito = [];
        this.total = 0;
      });
    },
    error: (err) => {
      console.error("ERROR Spring:", err);
      alert("Ocurrió un error al procesar el pago.");
    }
  });
  } 

}
