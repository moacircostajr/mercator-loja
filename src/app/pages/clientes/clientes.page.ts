import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Cliente } from 'src/app/model/Cliente';
import { Router } from '@angular/router';
import {UtilService} from '../../services/util.service';
import { ClientesService } from 'src/app/services/clientes.service';
import {BancoLocalService} from '../../services/banco-local.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {


  // subsLisAPI;
  listaClientes: Cliente[];


  constructor(
    private bancoLocal: BancoLocalService,
    private loadingController: LoadingController,
    // private navController: NavController,
    private router: Router,
    public clientesService: ClientesService
    ) {

    }
  ngOnInit() {
  }

  async ionViewWillEnter() {
    const dadosUsuario: any = LoginService.usuario;
    if (dadosUsuario === undefined) {
      this.router.navigate(['/login'], {replaceUrl: true});
    }

    const loading = await this.loadingController.create({
      message: 'Atualizando informações...',
      animated: true
    });

    await loading.present();

    if (this.bancoLocal.obterConfiguracoes(false).atualizManual) {
      console.log('obtendo lista de clientes em modo manual (lista local)...');
      this.bancoLocal.listarClientes().then(
          (listaLocal: Cliente[]) => { this.listaClientes = listaLocal; }
      ).catch(
          (erro) => { UtilService.centralMsgs(erro.status); }
      );
    } else {
      console.log('obtendo lista de clientes em modo automático (lista da API)...');
      this.clientesService.listarAPI().subscribe(
          (lista: Cliente[]) => { this.listaClientes = lista; },
          (erro) => {UtilService.centralMsgs(erro.status); }
      );
    }

    await loading.dismiss();
  }
/*



      if (!UtilService.atualizacaoManual) {
          /!* TODO: encadear essas funções *!/
          this.clientesService.atualizarBancoClientes();
          // this.listarLocal();
      } else {
        this.listarLocal();
      }


      await loading.dismiss();
  }
*/

/*

  listaLocal() {
    this.clientesService.listar()
      .then(
        (listaCLientes: Cliente[]) => listaCLientes.length !== null ? this.clientesLocal = listaCLientes : null)
      .catch(
        erro => console.log(erro));
  }
*/




  /*listarLocal(){
    this.clientesService.listar()
    .then(
      (listaCLientes: Cliente[]) => listaCLientes.length > 0 ? this.clientesService.clientes = listaCLientes : null)
    .catch(
      erro => {
        console.log(erro);
      }
    );
  }*/

  /*


  listarAPI(){
    // UtilService.pendenciasClientes ? this.clientesService.atualizarBancoClientes() : null;
    this.subsLisAPI = this.clientesService.listarAPI().subscribe(
      (listaClientes: Cliente[]) => listaClientes.length > 0 ? this.clientesService.clientes = listaClientes : null,
      () => this.listarLocal());
  }
*/


  buscarCliente(dadosCliente: string) {
    if (dadosCliente === '') {
      // nenhum dado fornecido, todos os clientes devem ser listados
      if (!this.bancoLocal.obterConfiguracoes(false).atualizManual) {
        this.clientesService.listarAPI().subscribe(
            (lista: Cliente[]) => lista ? this.listaClientes = lista : this.listaClientes = [],
            () => {
              this.bancoLocal.listarClientes().then(
                  (lista: Cliente[]) => lista ? this.listaClientes = lista : this.listaClientes = []
              ).catch(erro => alert(UtilService.centralMsgs(erro.status)));
            }
        );
      } else {
        this.bancoLocal.listarClientes().then(
            (lista: Cliente[]) => {},
        ).catch(erro => alert(UtilService.centralMsgs(erro.status)));
      }
    } else {
      // foram fornecidos os padrões de busca, o cliente deve ser localizado
      if (!this.bancoLocal.obterConfiguracoes(false).atualizManual) {
        this.clientesService.buscarAPI(dadosCliente).subscribe(
            (lista: Cliente[]) => { this.listaClientes = lista; },
            () => { this.metodoBuscaClienteLocal(dadosCliente); }
        );
      } else {
        this.metodoBuscaClienteLocal(dadosCliente);
      }
    }
  }

  private metodoBuscaClienteLocal(dadosCliente: string) {
    this.bancoLocal.listarClientes().then(
        (dados: Cliente[]) => this.listaClientes = dados.filter(
            (item) => {
              return item.nomeFantasia.toLowerCase().indexOf(dadosCliente.toLowerCase()) > -1;
            }
        )
    ).catch(e => console.error(e));
  }
    /*else {
        this.clientesService.listar().then(
            (dados: Cliente[]) => this.clientesService.clientes = dados.filter(
                (item) => {
                    return item.nome.toLowerCase().indexOf(dadosCliente.toLowerCase()) > -1;
                }
            )
        ).catch(e => console.error(e));
    }
  }
*/


  /*
  listarClientes() {

    this.clientesService.listar().then(
        (listaCli) => this.clientes = listaCli
    ).catch(e => console.error(e));
  }
*/

/*
  acessarCliente(sCliente: Cliente) {
    console.log('acessando ...');
    this.navController.navigateForward(['/cliente', sCliente.codigo]);
  }
*/

/*
  realizarPedido(cliente: Cliente) {
    this.navController.navigateForward(['/pedido/cliente', cliente.codigo]);
  }
*/

/*
    ionViewDidLeave() {
        this.subsLisAPI ? this.subsLisAPI.unsubscribe() : null;
    }
*/
  sincronizar() {
    this.clientesService.atualizarBancoClientes();
  }
}
