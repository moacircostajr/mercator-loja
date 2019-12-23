import { Injectable } from '@angular/core';
import {Usuario} from '../model/Usuario';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
      private httpClient: HttpClient
  ) { }

    registrarUsuario(usuario: Usuario) {
        // return this.httpClient.post(UtilService.SERV_URL + '/usuarios/novo', usuario);
        return this.httpClient.post(UtilService.SERV_URL + '/usuario', usuario);
    }
}
