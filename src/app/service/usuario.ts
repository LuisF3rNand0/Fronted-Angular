import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class usuario {
 
  private url = 'http://localhost:8080/api/usuarios/login';

  constructor(private http: HttpClient) {}

  login(usuUsername: string, usu_password: string) {
    return this.http.post(this.url, { usuUsername, usu_password });
  }

  isLogged(){
    return localStorage.getItem("usuario") !==null;
  }

  getUsuario(){
    return JSON.parse(localStorage.getItem("usuario")!);
  }

  logout() {
  localStorage.removeItem("usuario");
  }


}