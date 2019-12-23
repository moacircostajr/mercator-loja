import {Component, OnInit} from '@angular/core';
import { LoginService } from '../../services/login.service';
// import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';
import { Autenticacao } from '../../model/Autenticacao';
// import {CookieService} from 'ngx-cookie-service';
import {BancoLocalService} from '../../services/banco-local.service';
import { LoadingController } from '@ionic/angular';
import {FormBuilder, Validators} from '@angular/forms';
import {Configs} from '../../model/Configs';
import {CentralValidacao} from '../../pages/validacao/CentralValidacao';
// import imgHome from '../../assets/image/sao_paulo.jpg';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // email: string;
  // senha: string;
  // dadosValidos: boolean;
  subsLogin;
  loading;
  registerForm;
  validationMessages = CentralValidacao.validationMessages;

  // watch network for a disconnection
  /*
    disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      if (UtilService.atualizacaoManual === false) {
        UtilService.conectado = false;
      }
      // alert('network was disconnected :-(');
    });
  */
  // watch network for a connection
  /*
    connectSubscription = this.network.onConnect().subscribe(() => {
      if (UtilService.atualizacaoManual === false) {
        UtilService.conectado = true;
      }
  */
  // alert('network connected!');
  // We just got a connection but we need to wait briefly
  // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  /*
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      alert('we got a wifi connection, woohoo!');
    }
  }, 3000);
  */
  // });
  // stop disconnect watch
  // this.disconnectSubscription.unsubscribe();
  // stop connect watch
  // this.connectSubscription.unsubscribe();
  // loading;

  constructor(
      // private network: Network,
      private loginService: LoginService,
      private router: Router,
      // private cookieService: CookieService,
      private bancoLocal: BancoLocalService,
      private loadingController: LoadingController,
      private formBuilder: FormBuilder
      // private platform: Platform
      // private clienteService: ClientesService
  ) {
    /* setTimeout(() => {
      if ((this.network.type === 'wifi')||(this.network.type === 'cell')||(this.platform.is('desktop'))) {
        UtilService.conectado = true;
      }
    }, 3000); */

    /*
        if (this.platform.is('desktop')&&(UtilService.atualizacaoManual === false)) {
          UtilService.conectado = true;
        }
    */
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  // ionViewWillEnter() {  }


  get f() { return this.registerForm.controls; }

  async logar() {
    this.loading = await this.loadingController.create({
      message: 'Acessando...',
      animated: true
    });
    await this.loading.present();

    const autenticacao: Autenticacao = {
      email: this.f.email.value,
      senha: this.f.password.value
    };
    // console.log(this.f);
    // autenticacao.email = this.f.email.value;
    // FIXME: JSON-SERVER
    // this.subsLogin = this.loginService.fazerLogin(autenticacao).subscribe(
    /*(resultadoLogin) => {
      if (resultadoLogin) {
        console.log(resultadoLogin);
        this.loading.dismiss();
        this.bancoLocal.registrarCookie('mercator_usr', resultadoLogin);
        this.router.navigate(['/principal'], {replaceUrl: true});
      }
    },
    (erroLogin) => {
      this.loading.dismiss();
      alert(UtilService.centralMsgs(erroLogin.status));
    }
);*/

    //    os dados do vindos da API são salvos na memória temporária
    LoginService.usuario =  this.loginService.fazerLogin(autenticacao);
    this.loading.dismiss();
    this.router.navigate(['/principal'], {replaceUrl: true});
  }

  async ionViewDidLeave() {
    if (this.loading) { await this.loading.dismiss(); }
    if (this.subsLogin) { this.subsLogin.unsubscribe(); }
  }

}
