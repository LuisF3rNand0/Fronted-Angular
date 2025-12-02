import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { usuario } from '../../service/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class login {
  usuUsername: string = '';
  usu_password: string = '';
  error: string = '';

  constructor(
    private usuarioService: usuario,
    private router: Router
  ) {}

  login() {

     // 🟦🟦🟦 AQUI AGREGAS EL CONSOLE.LOG 🟦🟦🟦
    console.log("JSON que Angular está enviando al backend:");
    console.log({
      usuUsername: this.usuUsername,
      usu_password: this.usu_password
    });
    
    this.usuarioService.login(this.usuUsername, this.usu_password)
      .subscribe({
        next: (resp) => {
          console.log('LOGIN OK', resp);
          //para que se guarde la session
          localStorage.setItem("usuario", JSON.stringify(resp));
          this.error = '';
          this.router.navigate(['/tienda']); // redirige a tienda
        },
        error: (err) => {
          console.log('ERROR LOGIN:', err);
          this.error = 'Usuario o contraseña incorrectos';
        }
      });
  }
}
