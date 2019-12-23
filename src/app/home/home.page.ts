import {Component, OnInit} from '@angular/core';
import { LoginService } from '../services/login.service';
// import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';
import { Autenticacao } from '../model/Autenticacao';
// import {CookieService} from 'ngx-cookie-service';
import {BancoLocalService} from '../services/banco-local.service';
import { LoadingController } from '@ionic/angular';
import {FormBuilder, Validators} from '@angular/forms';
import {Configs} from '../model/Configs';
import {CentralValidacao} from '../pages/validacao/CentralValidacao';
// import imgHome from '../../assets/image/sao_paulo.jpg';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
      // private network: Network,
      // private loginService: LoginService,
      // private router: Router,
      // private cookieService: CookieService,
      // private bancoLocal: BancoLocalService,
      // private loadingController: LoadingController,
      // private formBuilder: FormBuilder
      // private platform: Platform
      // private clienteService: ClientesService
  ) {
    console.log('inicializando projeto mercator...');
  }

  ngOnInit() {  }


}
