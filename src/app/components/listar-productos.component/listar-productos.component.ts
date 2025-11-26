import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto-service';
import { Producto } from '../../model/producto';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './listar-productos.component.html',
})
export class ListarProductosComponent implements OnInit {

  productos: Producto[] = [];
  crearOrden: any;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.listarProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener los productos', err);
      }
    });
  }
}
