import { Injectable } from '@angular/core';
import {UtilService} from './util.service';
import {HttpClient} from '@angular/common/http';
import {Pedido} from '../model/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
      private httpClient: HttpClient
  ) { }

  buscarPedidos(dadosPedido: string) {
    let observable;
    // tslint:disable-next-line:triple-equals
    if (dadosPedido == '') {
      observable = this.httpClient.get(UtilService.SERV_URL + '/mercator_representacao.pedido'); /* JSON-SERVER */
    } else {
      observable = this.httpClient.get(UtilService.SERV_URL + `/mercator_representacao.pedido?q=${dadosPedido}`); /* JSON-SERVER */
    }
    return observable;
  }

  buscarPedido(idPedido: number) {
    return this.httpClient.get(UtilService.SERV_URL + `/mercator_representacao.pedido/${idPedido}`); /* JSON-SERVER */
  }

  removerPedido(pedido: Pedido) {
    return this.httpClient.delete(UtilService.SERV_URL + `/mercator_representacao.pedido/${pedido.id}`); /* JSON-SERVER */
  }
}
