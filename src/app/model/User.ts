export interface User {
  usu_id: number;          // corresponde a "usu_id" en la BD
  usuUsername: string;      // el username
  usu_password: string;     // la contraseña
  usu_nom?: string;         // nombre del usuario, opcional si no siempre se usa
  usu_tipo?: string;        // rol/tipo de usuario, opcional
  usu_email?: string;       // opcional, si quieres usar email
  usu_direccion?: string;   // opcional
  usu_telefono?: string;    // opcional
}
