import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {UtilService} from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  acessoGerente = this.perfilGerente;
  public appPages = [
    {
      title: 'Clientes',
      url: '/clientes',
      icon: 'contacts',
      avaliable: true
    },
    {
      title: 'Vendas',
      url: '/pedidos',
      icon: 'cart',
      avaliable: true
    },
    {
      title: 'Relatórios',
      url: '/relatorios',
      icon: 'analytics',
      avaliable: `${this.acessoGerente}`
    },
    {
      title: 'Usuários',
      url: '/usuarios',
      icon: 'contact',
      avaliable: `${this.acessoGerente}`
    },
    {
      title: 'Produtos',
      url: '/produtos',
      icon: 'gift',
      avaliable: true
    }
  ];
  /*private registerForm;
  static validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'email', message: 'Invalid email.' },
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' }
    ],
    'password': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' }
    ]
  }
*/

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /*
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: ValidadorMustMatch('password', 'confirmPassword')
    });
  }
*/

  get usuarioLogado() {
    /*TODO: se usuario logado for gerente, os itens restritos serao marcados como false*/
    return UtilService.usuarioLogado;
  }

  get perfilGerente() {
    return UtilService.perfilGerente;
  }
}
