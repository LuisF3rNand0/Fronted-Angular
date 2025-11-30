import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdenService } from '../../service/orden-service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-orden-producto',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './orden-producto.html',
  styleUrls: ['./orden-producto.css']
})
export class OrdenProductoComponent {

  orden = {
    usuarioId: 0,
    detalles: [
      { productoId: 0, cantidad: 1 }
    ]
  };

  constructor(private ordenService: OrdenService) {}

  crearOrden() {
    console.log("Enviando orden:", this.orden);

    this.ordenService.crearOrden(this.orden).subscribe({
      next: (res) => {
        console.log("Orden creada:", res);
        alert("Orden creada con éxito ✔");

        // Reset
        this.orden = {
          usuarioId: 0,
          detalles: [{ productoId: 0, cantidad: 1 }]
        };
      },
      error: (err) => {
        console.error(err);
        alert("Error al crear la orden ❌");
      }
    });
  }

}
