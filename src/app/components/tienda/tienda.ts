import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto-service';
import { Producto } from '../../model/producto';
import { CarritoService } from '../../service/carrito-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-tienda',
  standalone: true,
  templateUrl: './tienda.html',
  styleUrls: ['./tienda.css'],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule
  ],
})
export class Tienda implements OnInit {
  productos: any[] = [];
  productosFiltrados: Producto[] = [];
  searchText: string = '';
  carrito: Producto[] = [];
  usuarioLogueado: any = null;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioLogueado = JSON.parse(usuario);
    }
    this.cargarProductosTienda();
    this.actualizarContador();
  }

  cargarProductosTienda() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        console.log('Productos recibidos:', data);
        this.productos = data;
        this.productosFiltrados = data;
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  filtrarProductos() {
    console.log("Escribiendo:", this.searchText);
  
    if (this.searchText.trim() === '') {
      this.productosFiltrados = [...this.productos];
    } else {
      this.productoService.buscarProductos(this.searchText).subscribe({
        next: data => {
          console.log("Respuesta del backend:", data);
          this.productosFiltrados = data;
        },
        error: err => console.error('Error al buscar productos', err)
      });
    }
  }
  
  agregar(id: number) {
    this.carritoService.agregarAlCarrito(id).subscribe(() => {
      this.actualizarContador();
    });
  }

  actualizarContador() {
    this.carritoService.obtenerCarrito().subscribe(data => {
      this.carrito = data; // actualiza el contador
    });
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.usuarioLogueado = null;
    this.router.navigate(['/login']); // redirige al login
  }
}
