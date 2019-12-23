import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {Configs} from '../model/Configs';
import { Platform } from '@ionic/angular';
import {BancoLocalService} from './banco-local.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
      // private bancoLocal: BancoLocalService,
      // private indexedDb: Storage,
      // private platform: Platform
  ) {
    // this.dadosUsuario = this.bancoLocal.obterCookie('mercator_usr');
    // this.token = this.dadosUsuario.data.autenticacao;
    // this.dadosUsuario.data.perfil === 'ROLE_GERENTE' ? UtilService.perfilGerente = true : UtilService.perfilGerente = false;
    /*this.indexedDb.get('mercator_config').then(
        (confs: Configs) => confs ? UtilService.atualizacaoManual = confs.atualizManual : UtilService.atualizacaoManual = false
    )
        .catch(e => console.log(e));

    if (this.platform.is('desktop')) {UtilService.conectado = true};
  */
  }
  // static header;
  // static SERV_URL = 'http://localhost:62178'; /* LOCAL - PRODUÇÃO*/
  // static SERV_URL = 'http://mercator.tech:62178'; /* LOCAL - PRODUÇÃO*/
  static SERV_URL = 'http://localhost:8081'; /* LOCAL: JSON-SERVER */
  // static pendenciasProdutos: boolean = false;
  // static pendenciasPedidos: boolean = false;
  // static pendenciasClientes: boolean;
  // static conectado: boolean;
  static usuarioLogado = false;
  static perfilGerente = false;
  // static atualizacaoManual: boolean;
  // dadosUsuario: any;
  // token: string;
  // static SERV_URL = 'http://192.168.43.211:8080'; /* SMARTPHONE */
  // static SERV_URL = 'http://192.168.43.13:8080'; /* SMARTPHONE CLAUDIO */
  // static SERV_URL = 'http://192.168.0.14:8080'; /* KZA D VANIA */
  // static SERV_URL = 'http://10.0.0.11:8080'; /* ITAREMA */


  static centralMsgs(error): string {
    switch (error) {
      case 0:
        return 'Falha no servidor.';
        break;
      case 500:
        return 'Falha no servidor.';
        break;
      case 400:
        return 'Falha na requisição.';
        break;
      case 401:
        return 'Acesso negado!';
        break;
      case 201:
        return 'Registro efetuado com sucesso!';
        break;
      case 409:
        return 'Email já registrado, por gentileza, tente novamente com outro email.';
        break;
      case 404:
        return 'Sem conexão satisfatória com a internet.';
      default:
        return error;
    }
  }

/*
  obterHeader() {
    return {
      Authorization: 'Bearer ' + this.token,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
  }
*/

}
