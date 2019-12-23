import { Component, OnInit } from '@angular/core';
import {PedidosService} from '../../services/pedidos.service';
import {Pedido} from '../../model/Pedido';
import {UtilService} from '../../services/util.service';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  pedidos: Pedido[] = [];
  constructor(
      private pedidoService: PedidosService,
      private navController: NavController,
      private cookieService: CookieService,
      private router: Router
  ) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
      // tslint:disable-next-line:triple-equals
      if (this.cookieService.get('mercator_usr') === undefined) {
        this.router.navigate(['/login'], {replaceUrl: true});
      } else {
        this.buscarPedidos('');
      }
  }


  buscarPedidos(dadosPedido: string) {
      this.pedidoService.buscarPedidos(dadosPedido).subscribe(
          (pedidos: Pedido[]) => {
            if (pedidos.length !== 0) {
              this.pedidos = pedidos;
            }
          },
          (erroPedidos) => { alert(UtilService.centralMsgs(erroPedidos.status)); }
      );
  }

    acessarPedido(pedido: Pedido) {
        this.navController.navigateForward(['/pedido', pedido.id]);
    }



    removerPedido(pedido: Pedido) {
      this.pedidoService.removerPedido(pedido).subscribe(
          () => {},
          (erroRemocao) => { alert(UtilService.centralMsgs(erroRemocao.status)); }
      );
    }

}
