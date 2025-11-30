import { Component, OnInit } from '@angular/core';
import { Producto } from '../../model/producto';
import { DecimalPipe , CommonModule} from '@angular/common';
import { CarritoService } from '../../service/carrito-service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-carrito',
  standalone: true, 
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
  imports : [CommonModule,                            // 👈 Necesario para @for y pipes
RouterModule,DecimalPipe]  // 👈 IMPORTAR AQUÍ

})
export class CarritoComponent implements OnInit {

  carrito: Producto[] = [];
  total: number = 0;

  constructor( public carritoService:CarritoService) { }

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(){
    this.carritoService.obtenerCarrito().subscribe(data => {
      this.carrito = data;
      this.calcularTotal();
    });
  }

  eliminar(index:number):void{
    this.carritoService.eliminar(index).subscribe(data => {
      this.carrito = data;
      this.calcularTotal();
    });
  }

  limpiar():void{
    this.carritoService.limpiar().subscribe(data => {
      this.carrito = data;
      this.total = 0;
    });
  }


  calcularTotal(): void {
    this.total = this.carrito.reduce((sum, p) => sum + p.precio, 0);
  }
}
