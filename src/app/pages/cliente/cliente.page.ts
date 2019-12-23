import {Component, OnInit} from '@angular/core';
import {Cliente} from 'src/app/model/Cliente';
import {ClientesService} from 'src/app/services/clientes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {BancoLocalService} from '../../services/banco-local.service';
import {UtilService} from '../../services/util.service';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ValidadorCpf} from '../validacao/ValidadorCpf';
import {CentralValidacao} from '../validacao/CentralValidacao';
import {ValidadorCnpj} from '../validacao/ValidadorCnpj';
import {LoginService} from '../../services/login.service';
import {ValidadorTelefone} from '../validacao/ValidadorTelefone';

@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.page.html',
    styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

    cliente: Cliente = new Cliente ();
    registerForm: FormGroup;
    validationMessages: any = CentralValidacao.validationMessages;
    telefones: string[] = [];
    numeroTel: number;

    // codigo: any;
    // nome: string;
    // cpf: string;
    // cnpj: string;
    // endereco: string;
    // email: string;
    // observacoes: string;
    // referencias: string;

    // cliente: Cliente;

/*
    validation_messages = {
        'nome_fantasia': [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O nome de fantasia da empresa deve conter no mínimo 5 caracteres'}
        ],
        'cpf': [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'isValid', message: 'Número de CPF inválido'}
        ],
        'cnpj': [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O nome deve conter no mínimo 5 caracteres'}
        ],
        'endereco': [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O endereço deve conter no mínimo 5 caracteres'}
        ],
        'email': [
            {type: 'email', message: 'Email inválido'},
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'Email deve conter no mínimo 5 caracteres'}
        ]
    }
*/

    constructor(
        private clientesService: ClientesService,
        // private activatedRoute: ActivatedRoute,
        private navCtrl: NavController,
        private bancoLocal: BancoLocalService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
    }


    ngOnInit() {
        // this.activatedRoute.params.subscribe(
        //     (parametro) => {
        //         if (parametro.codigo) {
                    // console.log('parametro: '+parametro);
                    /* let clienteBuscado: Cliente = new Cliente();
                    this.clientesService.listar().then(
                      (clientes: Cliente[]) => {
                        if (Number.isNaN(parametro.id)) {
                          console.log(parametro.id);
                          clienteBuscado = clientes.find(obj => obj.codigo === parametro.id);
                          // clienteBuscado = clientes.find(obj => obj.codigo === parametro.codigo);
                        } else {
                          clienteBuscado = clientes[parametro.id-1];
                        }

                        this.codigo = clienteBuscado.codigo;
                        this.nome = clienteBuscado.nome;
                        this.cpf = clienteBuscado.cpf;
                        this.cnpj = clienteBuscado.cnpj;
                        this.endereco = clienteBuscado.endereco;
                        this.email = clienteBuscado.email;
                        this.observacoes = clienteBuscado.observacoes;
                        this.referencias = clienteBuscado.referencias;
                        if (clienteBuscado.telefones) {
                          this.telefones = JSON.parse(clienteBuscado.telefones);
                        }
                        // this.ultimaAtualizacao = dadosCliente.ultimaAtualizacao;
                      }
                      ) */

                  /*  this.clientesService.listar().then(
                        (dados: Cliente[]) => {
                            if (Number.isNaN(parametro.codigo)) {
                                console.log(parametro.codigo);
                                this.cliente = dados.find(obj => obj.codigo === parametro.codigo);
                                // clienteBuscado = clientes.find(obj => obj.codigo === parametro.codigo);
                            } else {
                                this.cliente = dados[parametro.codigo - 1];
                            }

                            this.codigo = this.cliente.codigo;
                            this.nome = this.cliente.nome;
                            this.cpf = this.cliente.cpf;
                            this.cnpj = this.cliente.cnpj;
                            this.endereco = this.cliente.endereco;
                            this.email = this.cliente.email;
                            this.observacoes = this.cliente.observacoes;
                            this.referencias = this.cliente.referencias;
                            if (this.cliente.telefones) {
                                this.telefones = JSON.parse(this.cliente.telefones);
                            }
                        }
                    ).catch(e => console.error(e));
                }
            }
        );
*/
        this.registerForm = this.formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                endereco: ['', [Validators.required, Validators.minLength(5)]],
                nome_fantasia: ['', [Validators.required, Validators.minLength(5)]],
                cpf: ['', [Validators.required, ValidadorCpf.isValid]],
                cnpj: ['', [Validators.required, ValidadorCnpj.isValid]],
                telefone: ['', [Validators.required, ValidadorTelefone.isValid]]
            }
        );
        // this.telefones.push('Tel 1');
        // this.numeroTel = this.telefones.length + 1;
        this.telefones.push('');

    }


    ionViewWillEnter() {
        // tslint:disable-next-line:triple-equals
        const dadosUsuario = LoginService.usuario;
        if (dadosUsuario === undefined) {
            this.router.navigate(['/login'], {replaceUrl: true});
        }
    }

    get f() {
        return this.registerForm.controls;
    }

   /* trackByFn(index: number, objeto): number {
        return objeto.id;
    }*/

    novoTelefone(indice: number) {
        if (indice === this.telefones.length - 1 && this.f.telefone.status === 'VALID') {
            this.numeroTel = this.telefones.length + 1;
            this.telefones.push('');
        }
    }

    atualizaTelefone(numeroAntigo: string, numeroNovo: string) {
        const posicao = this.telefones.indexOf(numeroAntigo);
        this.telefones[posicao] = numeroNovo;
    }

    removeTelefone(numero: string) {
        const posicao = this.telefones.indexOf(numero);
        this.telefones.splice(posicao, 1);
    }


    registrarCliente() {
        // cria um novo cliente em branco para ser preenchido com as informações atualizadas
        const clienteAtualizado: Cliente = new Cliente();
        clienteAtualizado.nomeFantasia = this.f.nome_fantasia.value;
        clienteAtualizado.cpf = this.f.cpf.value;
        clienteAtualizado.cnpj = this.f.cnpj.value;
        clienteAtualizado.endereco = this.f.endereco.value;
        clienteAtualizado.email = this.f.email.value;
        clienteAtualizado.referencias = this.cliente.referencias;
        clienteAtualizado.observacoes = this.cliente.observacoes;
        clienteAtualizado.telefones = JSON.stringify(this.telefones);
        clienteAtualizado.ultimaAtualizacao = new Date();
        clienteAtualizado.codigo = this.gerarCodigoLocal(); // deve ser criado um codigo local temporário para ser usado enquanto não temos um código da API
        clienteAtualizado.enviar = 1;

        // this.clientesService.registrar(clienteAtualizado);

        // registra o cliente no banco local
        // se o usuario tiver configurado pra atualizar automaticamente, solicitar registro na API
        if (!this.bancoLocal.obterConfiguracoes(false).atualizManual) {
            console.log('registrando cliente no modo de atualizacao automatica...');
            this.clientesService.registrarAPI(clienteAtualizado).subscribe(
                (resultado: any) => {
                    //    o registro na API foi efetuado com sucesso.
                    //    o retorno bem sucedido deve constar no banco local ("codigo fornecido pela API" e "enviar = 0")
                    console.log(resultado);
                    /*clienteAtualizado.codigo = resultado.codigoDaAPI;*/ /*FIXME: API sem funcionar*/
                    // cliente sincronizado: enviar = 0
                    // cliente por sincronizar: enviar = 1
                    clienteAtualizado.enviar = 0;
                    this.navCtrl.back();
                    this.bancoLocal.registrarCliente(clienteAtualizado);
                },
                (erro: any) => {
                    // deu erro. o usuario sera informado e o envio à API ficará pendente.
                    // TODO: todas as pendencias devem ser buscadas e sanadas
                    UtilService.centralMsgs(erro.status);
                }
            );
        } else {
            console.log('registrando cliente no modo de atualizacao manual...');
            this.bancoLocal.registrarCliente(clienteAtualizado);
            this.navCtrl.back();
        }




/*        /!*
        * this.usuario.empresaRepresentacao.nomeFantasia = this.f.nome_fantasia.value;
    this.usuario.empresaRepresentacao.endereco = this.f.endereco.value;
    this.usuario.email = this.f.email.value;
        * *!/
        const cliente: Cliente = new Cliente();
        cliente.codigo = this.codigo;
        // cliente.nome = this.nome;
        cliente.nome = this.f.nome_fantasia.value;
        cliente.cnpj = this.cnpj;
        cliente.cpf = this.f.cpf.value;
        // cliente.endereco = this.endereco;
        cliente.endereco = this.f.endereco.value;
        // cliente.email = this.email;
        cliente.email = this.f.email.value;
        cliente.observacoes = this.observacoes;
        cliente.referencias = this.referencias;
        cliente.telefones = JSON.stringify(this.telefones);
        cliente.enviar = 1;
        // cliente.ultimaAtualizacao = new Date();
        if (cliente.codigo == null) {
            this.clientesService.listar()
                .then(
                    (listaCli: Cliente[]) => {
                        if (listaCli) {
                            cliente.codigo = listaCli.length + 1;
                        } else {
                            cliente.codigo = 1;
                        }
                        this.clientesService.registrar(cliente);
                        this.navCtrl.back();
                    }
                )
                .catch(e => console.error(e));

            /!* this.clientesService.registrarAPI(cliente).subscribe(
              (resultado) => {
                console.log(resultado);
                this.navCtrl.back();
              },
              (erro) => {console.log(erro);}
              ); *!/
        } else {
            this.clientesService.atualizar(cliente);
            this.navCtrl.back();
        }*/
        /*    this.clientesService.registrarClienteDao(rCliente);*/
    }

    private gerarCodigoLocal() {
        let codigo = 1;
        this.bancoLocal.listarClientes()
            .then(
                (listaCli: Cliente[]) => {
                    if (listaCli) {
                        codigo = listaCli.length + 1;
                    }
                }
            )
            .catch(e => UtilService.centralMsgs(e.status));
        return codigo;
    }
}
