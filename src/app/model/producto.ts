export interface Producto {
  id?: number;         // opcional si lo genera el backend
  prod_id?: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  precio: number;
  cantidad?: number;
  usuarioId?: number;  // opcional
}
