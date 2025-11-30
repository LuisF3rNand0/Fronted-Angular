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

  cargarCarrito(){
    this.carritoService.obtenerCarrito().subscribe(data => {
    this.carrito = data;
    this.total = this.carrito.reduce((s, p) => s + p.precio, 0);
    });
  }

  procesarPago() {

    if (!this.metodoPago) {
      alert("Seleccione un método de pago.");
      return;
    }

    const data = {
      usuarioId: 1,   // más adelante cambiar por el usuario real
      total: this.total,
      detalles: this.carrito.map((p: Producto) => ({
        productoId: p.id,
        nombre: p.nombre,
        cantidad: p.cantidad ? p.cantidad : 1,
        precio: p.precio,
        subtotal: (p.cantidad ? p.cantidad : 1) * p.precio
      }))
    };

    console.log("Orden a enviar:", data);

    this.ordenService.crearOrden(data).subscribe({
      next: (res) => {
        console.log("Orden creada:", res);
        alert("Orden creada exitosamente ✔");

        // Limpiar carrito
        this.carritoService.limpiar().subscribe(() => {
          this.carrito = [];
          this.total = 0;
        });
      },
      error: (err) => {
        console.error("Error al crear la orden:", err);
        alert("Ocurrió un error al procesar el pago.");
      }
    });
  }
}
