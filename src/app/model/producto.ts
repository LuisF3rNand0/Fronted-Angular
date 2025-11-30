export interface Producto {
  id?: number;         // opcional si lo genera el backend
  nombre: string;
  descripcion?: string;
  imagen?: string;
  precio: number;
  cantidad?: number;
  usuarioId?: number;  // opcional
}
