import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../model/Usuario';
import {Perfil} from '../../model/Perfil';
import {UsuariosService} from '../../services/usuarios.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../../services/util.service';
import {LoadingController} from '@ionic/angular';
import {ValidadorMustMatch} from '../validacao/ValidadorMustMatch';
import {ValidadorCpf} from '../validacao/ValidadorCpf';
import {ValidadorCnpj} from '../validacao/ValidadorCnpj';
import {CentralValidacao} from '../validacao/CentralValidacao';

@Component({
    selector: 'app-nova-conta',
    templateUrl: './nova-conta.page.html',
    styleUrls: ['./nova-conta.page.scss'],
})
export class NovaContaPage implements OnInit {

    /*FIXME:
       Titulo nova conta desalinhado,
       os inputs não estão permitindo usar por completo o espaço disponível na tela
       */
    usuario: Usuario = new Usuario();
    telefonesEmpresa: string[] = [];
    numeroTel: number = this.telefonesEmpresa.length + 1;
    registerForm;
    matchingPasswordsGroup;
    validationMessages = CentralValidacao.validationMessages;
    /*validationMessages = {
        nome_fantasia: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O nome de fantasia da empresa deve conter no mínimo 5 caracteres'}
        ],
        razao_social: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'A razão social da empresa deve conter no mínimo 5 caracteres'}
        ],
        proprietario: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O nome do proprietário deve conter no mínimo 5 caracteres'}
        ],
        endereco: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O endereço deve conter no mínimo 5 caracteres'}
        ],
        nome: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O nome deve conter no mínimo 5 caracteres'}
        ],
        sobrenome: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O sobrenome deve conter no mínimo 5 caracteres'}
        ],
        cpf: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'isValid', message: 'Número de CPF inválido'}
        ],
        cnpj: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'isValid', message: 'Número de CNPJ inválido'}
        ],
        email: [
            {type: 'email', message: 'Email inválido'},
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'Email deve conter no mínimo 5 caracteres'}
        ],
        password: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'A senha deve conter no mínimo 5 caracteres'},
            {type: 'pattern', message: 'A senha deve conter letras maiúsculas, minúsculas e números'}
        ],
        confirm_password: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'areNotEqual', message: 'Senha diferente da confirmação'}
        ]
    };*/
    private loading;
    private subsReg;
    botaoEnvio = true;

    /*novaContaForm: any;
    messageEmail = 'Email inválido';
    messagePassword = 'A senha precisa ter de 6 a 20 caracteres';
    messageRequired = 'Preenchimento obrigatório';
    errorEmail = false;
    errorPassword = false;
    errorRequired = false;*/



    constructor(
        private usuarioService: UsuariosService,
        private router: Router,
        private formBuilder: FormBuilder,
        private loadingController: LoadingController
    ) {
        /*this.novaContaForm = formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
        });*/
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                email_empresa: ['', [Validators.required, Validators.email]],
                nome: ['', [Validators.required, Validators.minLength(5)]],
                sobrenome: ['', [Validators.required, Validators.minLength(5)]],
                cpf: ['', [Validators.required, ValidadorCpf.isValid]],
                cnpj: ['', [Validators.required, ValidadorCnpj.isValid]],
                endereco: ['', [Validators.required, Validators.minLength(5)]],
                razao_social: ['', [Validators.required, Validators.minLength(5)]],
                nome_fantasia: ['', [Validators.required, Validators.minLength(5)]],
                proprietario: ['', [Validators.required, Validators.minLength(5)]]
            }
        );
        this.matchingPasswordsGroup = new FormGroup({
                password: new FormControl('', Validators.compose([
                    Validators.minLength(5),
                    Validators.required,
                    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
                ])),
                confirm_password: new FormControl('', Validators.required)
            }, (formGroup: FormGroup) => {
                return ValidadorMustMatch.areEqual(formGroup);
            }
        );
    }

    get f() {
        return this.registerForm.controls;
    }

    get g() {
        if (this.matchingPasswordsGroup.status === 'VALID') {
            this.verificarLiberacaoEnvio();
        }
        return this.matchingPasswordsGroup;
    }

    private verificarLiberacaoEnvio() {
        const campos: any = this.f;
        console.log('verificando validação...');
        if (
            (this.usuario.empresaRepresentacao.sistema !== undefined) &&
            (this.telefonesEmpresa.length !== 0) &&
            (campos.cnpj.status === 'VALID') &&
            (campos.cpf.status === 'VALID') &&
            (campos.email.status === 'VALID') &&
            (campos.email_empresa.status === 'VALID') &&
            (campos.endereco.status === 'VALID') &&
            (campos.nome.status === 'VALID') &&
            (campos.nome_fantasia.status === 'VALID') &&
            (campos.proprietario.status === 'VALID') &&
            (campos.razao_social.status === 'VALID') &&
            (campos.sobrenome.status === 'VALID')
        ) {
            // caso todos os campos sejam válidos
            this.botaoEnvio = false;
        } else {
            // caso haja algum campo inválido
            this.botaoEnvio = true;
        }
    }

    async registrarConta() {
        this.loading = await this.loadingController.create({
            message: 'Registrando...',
            animated: true
        });
        await this.loading.present();
        // console.log(this.f);
        // console.log(this.g);
        this.usuario.empresaRepresentacao.telefone = JSON.stringify(this.telefonesEmpresa);
        this.usuario.perfil = Perfil.ROLE_GERENTE;
        this.usuario.empresaRepresentacao.nomeFantasia = this.f.nome_fantasia.value;
        this.usuario.empresaRepresentacao.razaoSocial = this.f.razao_social.value;
        this.usuario.empresaRepresentacao.proprietario = this.f.proprietario.value;
        this.usuario.empresaRepresentacao.cpf = this.f.cpf.value;
        this.usuario.empresaRepresentacao.cnpj = this.f.cnpj.value;
        this.usuario.empresaRepresentacao.endereco = this.f.endereco.value;
        this.usuario.empresaRepresentacao.email = this.f.email_empresa.value;
        this.usuario.nome = this.f.nome.value;
        this.usuario.sobrenome = this.f.sobrenome.value;
        this.usuario.email = this.f.email.value;
        this.usuario.senha = this.g.value.password;
        /*this.empresaService.registrarUsuario(this.usuario).subscribe(
            () => {
              this.usuarioService.registrarUsuario(this.usuario).subscribe(
                  () => {
                    this.router.navigate(['/login'], {replaceUrl: true});
                    },
                  (erroUsuario) => { alert(UtilService.centralMsgs(erroUsuario.status)); }
              );
            },
            (erroEmpresa) => { alert(UtilService.centralMsgs(erroEmpresa.status)); }
        );*/

        /*let {email, password} = this.novaContaForm.controls;
        if (!this.novaContaForm.valid) {
          if (!email.valid) {
            this.errorEmail = true;
            this.messageEmail = 'Ops! Email inválido';
          } else {
            this.messageEmail = '';
          }

          if (!password.valid) {
            this.errorPassword = true;
            this.messagePassword = 'A senha precisa ter de 6 a 20 caracteres';
          } else {
            this.messagePassword = '';
          }
        }*/
        this.subsReg = this.usuarioService.registrarUsuario(this.usuario).subscribe(
            (result: any) => {
                if (result) {
                    this.loading.dismiss();
                    alert(UtilService.centralMsgs(201));
                    this.router.navigate(['/login'], {replaceUrl: true});
                }
            },
            (erro) => {
                this.loading.dismiss();
                alert(UtilService.centralMsgs(erro.status));
            }
        );
    }


    novoTelefone(listaTelefones: string[]) {
        listaTelefones.push('Tel ' + this.numeroTel);
        this.numeroTel++;
    }

    atualizaTelefone(numeroAntigo: string, numeroNovo: string, listaTelefones: string[]) {
        const posicao = listaTelefones.indexOf(numeroAntigo);
        listaTelefones[posicao] = numeroNovo;
    }

    removeTelefone(numero: string, listaTelefones: string[]) {
        const posicao = listaTelefones.indexOf(numero);
        listaTelefones.splice(posicao, 1);
        this.numeroTel--;
    }

    async ionViewDidLeave() {
        if (this.loading) { await this.loading.dismiss(); }
        if (this.subsReg) { this.subsReg.unsubscribe(); }
    }
}
