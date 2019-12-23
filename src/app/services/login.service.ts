import { Injectable } from '@angular/core';
import {Usuario} from '../model/Usuario';
// import {HttpClient} from '@angular/common/http';
// import {UtilService} from './util.service';
import { Autenticacao } from '../model/Autenticacao';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  static usuario: Usuario;

  constructor(
      // private httpClient: HttpClient
  ) { }
  // FIXME: JSON-SERVER
  fazerLogin(autenticacao: Autenticacao) {
    console.log('realizando login ...');
    // TODO: incluir configuracoes na API do objeto usuario
    const dadosLogin: Usuario = {
      empresaRepresentacao: {
          sistema: 3,
          telefone: '["88-9-9755-6328","85-9-8186-1554"]',
          nomeFantasia: 'Vértice Soluções',
          razaoSocial: 'José Moacir da Costa Júnior MEI',
          proprietario: 'Moacir Costa e Claudio Costa',
          cpf: '967.084.333-20',
          cnpj: '69.836.014/0001-46',
          endereco: 'Rua Benício Marques Ribeiro, 53, Centro, Itarema-CE',
          email: 'verticesolucoes@gmail.com'
        },
        sobrenome: 'Costa',
        perfil: 1,
        nome: 'Moacir',
        email: 'moacircostajr@gmail.com',
        senha: '123asdZXC',
        id: 1,
        autenticacao: '',
        codigo: ''
      };
    // return this.httpClient.post<any[]>(UtilService.SERV_URL + '/auth', autenticacao);
    // return this.httpClient.get<any[]>(UtilService.SERV_URL + `/usuario?email=${autenticacao.email}`);
    return dadosLogin;
  }
}
