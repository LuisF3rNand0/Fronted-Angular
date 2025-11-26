import { Routes } from '@angular/router';
import { ListarProductosComponent } from './components/listar-productos.component/listar-productos.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto';
import { OrdenProductoComponent } from './components/orden-producto/orden-producto';
import { CarritoComponent } from './components/carrito/carrito';
import { Tienda } from './components/tienda/tienda'; // <-- Importa la tienda
import { PagoProductos } from './components/pago-productos/pago-productos';

export const routes: Routes = [
  { path: '', redirectTo: 'tienda', pathMatch: 'full' },   // <-- Redirige al inicio (tienda)
  { path: 'tienda', component: Tienda },          // <-- Ruta de la tienda
  { path: 'carrito', component: CarritoComponent },
  { path: 'productos', component: ListarProductosComponent },
  { path: 'registrar', component: RegistrarProductoComponent },
  { path: 'orden', component: OrdenProductoComponent },
  { path: 'pagar', component:PagoProductos},
];
