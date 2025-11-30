import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = 'http://localhost:8080/api/carrito';

  constructor(private http: HttpClient) {}

  obtenerCarrito(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  agregarAlCarrito(id: number): Observable<Producto[]> {
    return this.http.post<Producto[]>(`${this.apiUrl}/agregar/${id}`, {});
  }

  eliminar(index: number): Observable<Producto[]> {
    return this.http.delete<Producto[]>(`${this.apiUrl}/eliminar/${index}`);
  }

  limpiar(): Observable<Producto[]> {
    return this.http.delete<Producto[]>(`${this.apiUrl}/limpiar`);
  }

  total(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }
}
