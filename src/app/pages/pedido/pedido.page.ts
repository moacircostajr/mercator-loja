import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { NavController } from '@ionic/angular';
// import { ItemPedido } from 'src/app/model/ItemPedido';
import { Pedido } from 'src/app/model/Pedido';
import {PedidosService} from '../../services/pedidos.service';
import {ClientesService} from '../../services/clientes.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  pedido: Pedido = new Pedido();
  cliente: Cliente = new Cliente();

  constructor(
      private activatedRoute: ActivatedRoute,
      private pedidosService: PedidosService,
      private navController: NavController,
      private clientesService: ClientesService,
      private cookieService: CookieService,
      private router: Router
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
        (parametro) => {
          if (parametro.idPedido) {
            this.pedidosService.buscarPedido(parametro.idPedido).subscribe(
                (dadosPedido: Pedido) => {
                  this.pedido = dadosPedido;
                }
            );
          }
          if (parametro.idCliente) {
            // this.cliente = this.clientesService.buscarCliente(parametro.idCliente);
          }
        }
    );

  }

  ionViewWillEnter() {
    // tslint:disable-next-line:triple-equals
    if (this.cookieService.get('mercator_usr') == undefined) {
      this.router.navigate(['/login'], {replaceUrl: true});
    }
  }

  acessarCliente() {
    this.navController.navigateForward(['/cliente', this.cliente.codigo]);
  }

/*
  novoItem() {
    const novoItem = new ItemPedido();
    novoItem.discriminacao = 'NOVO_ITEM';
    novoItem.quantidade = 1;
    novoItem.unidade = 'UN';
    novoItem.valor = 0;
    this.pedido.itensPedido.push(novoItem);
    this.rolarPaginaPID('fim'); /!* FIXME: fazer scroll quando incluir um novo item *!/
  }
*/

/*
  rolarPaginaPID(destino) {
    const elemento = document.getElementById('fim');
    window.scroll({
      top: document.getElementById(destino).offsetTop,
      left: 0,
      behavior: 'smooth'
    });
    console.log(document.getElementById(destino).offsetTop);
  }
*/

/*
  alterarItem(item: ItemPedido, novoItem: ItemPedido) {
    const posItem: number = this.pedido.itensPedido.indexOf(item);
    this.pedido.itensPedido[posItem] = novoItem;
  }
*/

/*
  removerItem(item: ItemPedido) {
    const posItem: number = this.pedido.itensPedido.indexOf(item);
    this.pedido.itensPedido.splice(posItem, 1);
  }
*/

/*
  registrarPedido() {
    this.navController.back();
  }
*/
}
