import { Injectable } from '@angular/core';
import { Cliente } from '../model/Cliente';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UtilService } from './util.service';
import {BancoLocalService} from './banco-local.service';

@Injectable({
  providedIn: 'root'
})
// TODO: verificar todos os subscribes pendentes
export class ClientesService {

    // clientes: Cliente[] = [];

  constructor(
    private httpClient: HttpClient,
    private bancoLocalService: BancoLocalService
    // private utilService: UtilService
  ) {  }

  atualizarBancoClientes() {
    let subsRegAPI = null;
    let subsAtualAPI = null;
    // console.log('pendencias? ' + UtilService.pendenciasClientes);
    // console.log('conectado? ' + UtilService.conectado);
    // console.log('atualizacao manual? ' + UtilService.atualizacaoManual);
    //  INICIO DO IF
    //   if (UtilService.conectado && UtilService.pendenciasClientes) {
    console.log('atualizando banco de dados de clientes ...');
    this.bancoLocalService.listarClientes().then(
    (listaClientes: Cliente[]) => {
      listaClientes.forEach(element => {
        if (element.enviar === 1) {
          if (Number.isNaN(element.codigo)) {
            subsAtualAPI = this.atualizarAPI(element).subscribe(
              (retornoAtualiz: Cliente) => {
                // element = retornoAtualiz;
                console.log('cliente sincronizado (atualização): ' + retornoAtualiz);
                listaClientes[element.codigo - 1].enviar = 0;
                listaClientes[element.codigo - 1].ultimaAtualizacao = new Date();
              },
              erro => {
                console.log(UtilService.centralMsgs(erro.status));
              }
            );
          } else {
            subsRegAPI = this.registrarAPI(element).subscribe(
              (retornoRegist: Cliente) => {
                // element = retornoRegist;
                console.log('cliente sincronizado (novo registro): ' + retornoRegist);
                listaClientes[element.codigo - 1] = retornoRegist;
                listaClientes[element.codigo - 1].enviar = 0;
                listaClientes[element.codigo - 1].ultimaAtualizacao = new Date();
                // console.log('elemento registrado:');
                // console.log(element);
                // this.clientes = listaClientes;
              },
              erro => {
                console.log(UtilService.centralMsgs(erro.status));
              }
            );
          }
        }
      });
      // this.clientes = listaClientes;
      this.bancoLocalService.registrarListaClientes(listaClientes);
      // UtilService.pendenciasClientes = false;
    }
  )
  .catch(erro => {
    console.log(UtilService.centralMsgs(erro.status));
  })
  .finally(
    () => {
        if (subsRegAPI) { subsRegAPI.unsubscribe(); }
        if (subsAtualAPI) { subsAtualAPI.unsubscribe(); }
    }
  );
    // }
      // FIM DO IF
      // this.indexedDb.get('mercator_clientes').then(
      //     (lista) => this.clientes = lista
      // );
  }

  registrarAPI(cliente: Cliente) {
      console.log('registrando na API ...');
      // return this.httpClient.post(UtilService.SERV_URL + '/representacao/clientes/novo', cliente, {headers: new HttpHeaders(this.utilService.obterHeader())});
      return this.httpClient.post(UtilService.SERV_URL + '/cliente', cliente); /* JSON-SERVER */
  }

  atualizarAPI(cliente: Cliente) {
    console.log('atualizando na API ...');
    // return this.httpClient.put(UtilService.SERV_URL + '/representacao/clientes', clientdbe, {headers: new HttpHeaders(this.utilService.obterHeader())});
    return this.httpClient.put(UtilService.SERV_URL + '/cliente', cliente); /* JSON-SERVER */
  }

  listarAPI() {
    console.log('listando a partir da API ...');
    // return this.httpClient.get(UtilService.SERV_URL + '/representacao/clientes', {headers: new HttpHeaders(this.utilService.obterHeader())});
    return this.httpClient.get(UtilService.SERV_URL + '/cliente'); /* JSON-SERVER */
  }

  buscarAPI(dadosCliente: string) {
    console.log('buscando cliente a partir da API...');
    return this.httpClient.get(UtilService.SERV_URL + '/cliente?nomeFantasia=' + dadosCliente);
  }
}
