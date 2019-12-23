import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Configs} from '../model/Configs';
import {LoginService} from './login.service';
import {Cliente} from '../model/Cliente';
import {UtilService} from './util.service';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BancoLocalService {

  // FIXME: token deve ser preenchido
  private novasConfiguracoes: Configs = {
    usuario: null,
    // token: LoginService.usuario.autenticacao,
    token: null,
    atualizManual: true,
    tema: 'padrao'
  };

  constructor(
      private cookieService: CookieService,
      private indexedDb: Storage,
      private httpClient: HttpClient
  ) {
    // ao inicializar este servico, caso nao seja encontrado nenhum array de configuracoes, cria-se um novo array com as configuracoes do usuario logado
    console.log('inicializanco controle de banco de dados local...');
    this.prepararRegistroCookies();
    this.prepararRegistroClientes();
    this.prepararRegistroProdutos();
  }

  prepararRegistroCookies() {
    if (!this.obterCookie('mercator_config')) {
      this.registrarCookie('mercator_config', []);
    }
  }

  prepararRegistroClientes() {
    // busca banco local de clientes na inicializacao do sistema
    this.indexedDb.get('mercator_clientes')
      .then((clientes: Cliente[]) => {
        // banco local de clientes nao foi encontrado
        if (!clientes) {
          console.log('banco local de clientes não encontrado, construindo novo banco com dados da API...');
          // FIXME: fazer unsubscribes
          this.httpClient.get(UtilService.SERV_URL + '/cliente').subscribe(
              (bClientes: Cliente[]) => {
                if (bClientes) {
                  console.log(bClientes);
                  this.indexedDb.set('mercator_clientes', bClientes);
                  console.log('criado novo banco com dados da API...');
                } else {
                  // o banco de clientes esta vazio
                  this.indexedDb.set('mercator_clientes', []);
                  console.log('criado novo banco vazio por não haver nenhum registro na API...');
                }
              },
              // erro ao buscar dados da API
              (erro) => alert(UtilService.centralMsgs(erro.status))
          );
        }
      })
      //    erro ao buscar banco local de clientes
      .catch((erro) => console.log(erro));
      //    em qualquer caso, encerrar subscribe
  }

  registrarCliente(cliente: Cliente) {
    console.log('registrando cliente no banco local...');
    // busca o banco local de clientes
    this.indexedDb.get('mercator_clientes').then(
        (clientes: Cliente[]) => {
          // if (clientes) {
          // banco encontrado, cliente inserido no array de clientes
          clientes.push(cliente);
          // array registrado no banco
          this.indexedDb.set('mercator_clientes', clientes);
          /*} else {
              // banco nao encontrado, deve ser criado um array num novo banco
              const novoBancoClientes: Cliente[] = [];
              // cliente inserido no array
              novoBancoClientes.push(cliente);
              // array registrado no banco
              this.indexedDb.set('mercator_clientes', novoBancoClientes);
          }*/
        }
    );
    // UtilService.pendenciasClientes = true;
  }

  // a busca do objeto a ser atualizado é realizada com base no codigo do cliente
  atualizarCliente(cliente: Cliente) {
    console.log('atualizando cliente ...');
    let clienteBuscado: Cliente;
    // busca o banco local de clientes
    this.indexedDb.get('mercator_clientes').then(
        (clientes: Cliente[]) => {
          // busca o objeto cliente pelo codigo
          clienteBuscado = clientes.find((obj) => obj.codigo === cliente.codigo);
          // busca a posição do objeto cliente encontrado dentro do array
          const posicao = clientes.indexOf(clienteBuscado);
          // altera o objeto no array
          clientes[posicao] = cliente;
          // registra o array no banco local
          this.indexedDb.set('mercator_clientes', clientes);
        }
    );
    // UtilService.pendenciasClientes = true;
    // return this.httpClient.put(UtilService.SERV_URL + '/mercator_representacao.cliente/' + cliente.codigo, cliente);
  }

  registrarListaClientes(listaClientes: Cliente[]) {
    this.indexedDb.set('mercator_clientes', listaClientes);
  }

  listarClientes() {
    console.log('listando localmente ...');
    return this.indexedDb.get('mercator_clientes');
  }


  registrarCookie(nomeCookie: string, dados: any) {
    dados = JSON.stringify(dados);
    this.cookieService.set(nomeCookie, dados, 7);
    console.log('cookie registrado...');
  }

  obterCookie(nomeCookie: string): any {
    let dados = this.cookieService.get(nomeCookie);
    try {
      dados = JSON.parse(dados);
    } catch (erro) {
      dados = undefined;
    }
    console.log('cookie buscado...');
    return dados;
  }

  removerCookie(nomeCookie: string) {
    this.cookieService.delete(nomeCookie);
  }

  obterConfiguracoes(obterPosicao: boolean): any {
    const listaConfiguracoes: any[] = this.obterCookie('mercator_config');
    const info: Configs =  listaConfiguracoes.find(obj => obj.usuario === LoginService.usuario.email);
    // foi encontrado objeto de configuracoes do usuario no array?
    if (info) {
      if (obterPosicao) {
        const indPosicao: number = listaConfiguracoes.indexOf(info);
        return {configuracoes: info, posicao: indPosicao};
      } else {
        return info;
      }
    } else {
      // nao foram encontradas as configuracoes do usuario logado no array.
      // um novo objeto com as configurações do novo usuario é inserido no array
      this.novasConfiguracoes.usuario = LoginService.usuario.email;
      listaConfiguracoes.push(this.novasConfiguracoes);
      this.registrarCookie('mercator_config', listaConfiguracoes);
      if (obterPosicao) {
        return {configuracoes: this.novasConfiguracoes, posicao: listaConfiguracoes.length - 1};
      } else {
        return this.novasConfiguracoes;
      }
    }
  }

  atualizarConfiguracoes(configuracoes: Configs, posicao: number) {
    const listaConfiguracoes: any[] = this.obterCookie('mercator_config');
    listaConfiguracoes[posicao] = configuracoes;
    this.registrarCookie('mercator_config', listaConfiguracoes);
  }

  prepararRegistroProdutos() {  }

}
