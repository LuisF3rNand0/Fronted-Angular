import { ProductoService } from './../../service/producto-service';
import { Component } from '@angular/core';
import { Producto } from '../../model/producto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,     // <-- NECESARIO
  imports: [
    FormsModule         // <-- SOLO ESTO NECESITAS
  ],
  templateUrl: './registrar-producto.html',
  styleUrls: ['./registrar-producto.css'],   // <-- CORREGIDO
})
export class RegistrarProductoComponent  {

  producto: Producto = {
    nombre: '',
    precio: 0
  };

  mensaje = '';

  constructor(private ProductoService: ProductoService) {}

  registrar() {
    this.ProductoService.registrar(this.producto).subscribe({
      next: () => {
        this.mensaje = 'Producto registrado con éxito';
        this.producto = { nombre: '', precio: 0 };
      },
      error: () => {
        this.mensaje = 'Error al registrar';
      }
    });
  }
}
