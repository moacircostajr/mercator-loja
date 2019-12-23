import { Component, OnInit } from '@angular/core';
// import {UtilService} from "../../services/util.service";
// import {Configs} from "../../model/Configs";
// import {ClientesService} from "../../services/clientes.service";

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {

  // configuracoes: Configs;
  // atualiz;

  constructor(
    // private clientesService: ClientesService
  ) {

  }

  ngOnInit() {
  }

/*
  ionViewWillEnter() {
    this.indexedDb.get('mercator_config').then(
        (configur: Configs) => {
          this.configuracoes = configur;
          this.atualiz = configur.atualizManual;
        }
    )
        .catch(() => {
          this.configuracoes = new Configs();
          this.indexedDb.set('mercator_config', this.configuracoes);
        });
  }
*/

/*
  registrarConfiguracoes() {
    this.configuracoes.atualizManual = this.atualiz;
   console.log('registrando escolha: '+this.configuracoes.atualizManual);
    this.indexedDb.set('mercator_config', this.configuracoes);
    UtilService.atualizacaoManual = this.atualiz;
  }
*/

/*
    atualizarSistema() {
        UtilService.pendenciasClientes = true;
        this.clientesService.atualizarBancoClientes();
    }
*/
}
