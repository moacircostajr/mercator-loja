import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {UtilService} from '../../services/util.service';
import {Network} from '@ionic-native/network/ngx';
import {BancoLocalService} from '../../services/banco-local.service';
import { Chart } from 'chart.js';
import {Configs} from '../../model/Configs';
import {LoginService} from '../../services/login.service';
// import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-principal',
    templateUrl: './principal.page.html',
    styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

    @ViewChild('donnutCanvasVendasGlobal', null) donnutCanvasVendasGlobal;
    @ViewChild('donnutCanvasMixGlobal', null) donnutCanvasMixGlobal;
    @ViewChild('donnutCanvasMixIndividual', null) donnutCanvasMixIndividual;
    @ViewChild('mixedCanvas', null) mixedCanvas;
    @ViewChild('barCanvas', null) barCanvas;
    @ViewChild('lineCanvas', null) lineCanvas;
    @Output() avisoPaginaPrincipal = new EventEmitter<boolean>();

    controleAtualizacaoManual: boolean;
    donnutChartMixIndividual: any;
    donnutChartMixGlobal: any;
    donnutChartVendasGlobal: any;
    mixedChart: any;
    lineChart: any;
    barChart: any;
    opcoesMenu = [
        {sistema: 'SI_LOJA', nome: 'Loja', opcoes: [
                {funcao: 'Clientes', link: '/clientes'},
                {funcao: 'Produtos', link: '#'},
                {funcao: 'Vendas', link: '/pedidos'},
                {funcao: 'Caixa', link: '#'},
                {funcao: 'Relatórios', link: '#'}
            ]},
        {sistema: 'SI_CONFECCAO', nome: 'Confecção', opcoes: [
                {funcao: 'Clientes', link: '/clientes'},
                {funcao: 'Produtos', link: ''},
                {funcao: 'Vendas', link: ''},
                {funcao: 'Caixa', link: ''}
            ]
        },
        {sistema: 'SI_FACCAO', nome: 'Facção', opcoes: []},
        {sistema: 'SI_REPRESENTACAO', nome: 'Representação', opcoes: [
                {funcao: 'Clientes', link: '/clientes'},
                {funcao: 'Produtos', link: '#'},
                {funcao: 'Pedidos', link: '/pedidos'},
                {funcao: 'Caixa', link: '#'},
                {funcao: 'Relatórios', link: '#'}
            ]
        }
    ];
    menu: any = {};
    // metadeTela = 0;
    // alturaMenu = 0;
    // dadosUsuario: any = this.bancoLocal.obterCookie('mercator_usr');

    /*disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      if (UtilService.atualizacaoManual === false) {
        UtilService.conectado = false;
      }
    });*/
    constructor(
        private router: Router,
        private network: Network,
        private platform: Platform,
        private bancoLocal: BancoLocalService,
        // private indexedDb: Storage,

    ) {
        UtilService.usuarioLogado = true;
        if (LoginService.usuario !== undefined) {
            this.obterConfiguracaoAtualizacao();
            console.log('abrindo pagina principal...');
            // FIXME: JSON-SERVER
            // this.menu = this.opcoesMenu.find(obj => obj.sistema === this.dadosUsuario.data.empresaRepresentacao.sistema);
            this.menu = this.opcoesMenu.find(obj => obj.sistema === 'SI_LOJA');
        }
    }

    /*connectSubscription = this.network.onConnect().subscribe(() => {
      if (UtilService.atualizacaoManual === false) {
        UtilService.conectado = true;
      }
    });*/

    ngOnInit() {
        this.barChartMethod();
        this.lineChartMethod();
        this.donnutChartMixIndividualMethod();
        this.donnutChartMixGlobalMethod();
        this.donnutChartVendasGlobalMethod();
        this.mixedChartMethod();
    }

    ionViewWillEnter() {
    // FIXME: deve ser buscado algum token nos cookies.
    // Caso seja encontrado, ele deverá ser enviado para validação no servidor.
    // Caso não seja encontrado, o usuario nao podera acessar a pagina principal
    /*if (LoginService.usuario === undefined) {
      this.router.navigate(['/login'], {replaceUrl: true});
    }
    */

    /*
    if ((this.alturaMenu == 0)||(this.metadeTela == 0)) {
      this.alturaMenu = document.getElementById("menu-principal").offsetHeight;
      this.metadeTela = this.platform.height()/2;
      document.getElementById('menu-principal').style['padding-top'] = (this.metadeTela-this.alturaMenu*0.7) + 'px';
    }
    */
  }
  /*ionViewDidLoad() {
  }*/

    obterConfiguracaoAtualizacao() {
        const config: Configs = this.bancoLocal.obterConfiguracoes(false);
        this.controleAtualizacaoManual = config.atualizManual;
    }

    barChartMethod() {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
                datasets: [{
                    label: 'Volume unitário de pedidos',
                    data: [150, 50, 30, 15, 20, 34, 60, 85, 100, 130, 150, 200],
                    backgroundColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    lineChartMethod() {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
                datasets: [{
                    label: 'Total de negociações em R$',
                    data: [20, 50, 30, 15, 20, 34, 55, 60, 90, 120, 150, 300],
                    backgroundColor: [
                        'rgba(0, 8, 158, 1)',
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1,
                    borderDash: [1],
                    pointBackgroundColor: 'rgba(13, 24, 255, 1)'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    donnutChartMixIndividualMethod() {
        this.donnutChartMixIndividual = new Chart(this.donnutCanvasMixIndividual.nativeElement, {
            type: 'pie',
            data: {
                labels: [
                    'Ítem 1', 'Ítem 2', 'Ítem 3', 'Ítem 4', 'Ítem 5', 'Ítem 6',
                    'Ítem 7', 'Ítem 8', 'Ítem 9', 'Ítem 10', 'Ítem 11', 'Ítem 12'],
                datasets: [{
                        label: 'Categorias',
                        backgroundColor: [
                        'rgba(14, 194, 84, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(87, 0, 10, 1)',
                        'rgba(153, 102, 255,1)',
                        'rgba(13, 24, 255, 1)',
                        'rgba(54, 51, 51, 1)',
                        'rgba(0, 255, 251, 1)',
                        'rgba(4, 74, 16, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    data: [15, 50, 30, 15, 20, 34, 60, 85, 100, 130, 150, 400]
                }]
            },
            options: {
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
                // title: {
                //     display: true,
                //     text: 'Predicted world population (millions) in 2050'
                // }
            }
        });
    }

    donnutChartMixGlobalMethod() {
        this.donnutChartMixGlobal = new Chart(this.donnutCanvasMixGlobal.nativeElement, {
            type: 'doughnut',
            data: {
                labels: [
                    'Ítem 1', 'Ítem 2', 'Ítem 3', 'Ítem 4', 'Ítem 5', 'Ítem 6',
                    'Ítem 7', 'Ítem 8', 'Ítem 9', 'Ítem 10', 'Ítem 11', 'Ítem 12'],
                datasets: [{
                    label: 'Categorias',
                    backgroundColor: [
                        'rgba(14, 194, 84, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(87, 0, 10, 0.5)',
                        'rgba(153, 102, 255,0.5)',
                        'rgba(13, 24, 255, 0.5)',
                        'rgba(54, 51, 51, 0.5)',
                        'rgba(0, 255, 251, 0.5)',
                        'rgba(4, 74, 16, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    data: [15, 50, 30, 15, 20, 34, 60, 85, 100, 130, 150, 400]
                }]
            },
            options: {
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
                // title: {
                //     display: true,
                //     text: 'Predicted world population (millions) in 2050'
                // }
            }
        });
    }

    donnutChartVendasGlobalMethod() {
        this.donnutChartVendasGlobal = new Chart(this.donnutCanvasVendasGlobal.nativeElement, {
            type: 'pie',
            data: {
                labels: [
                    'Vendedor 1', 'Vendedor 2', 'Vendedor 3', 'Vendedor 4', 'Vendedor 5', 'Vendedor 6',
                    'Vendedor 7', 'Vendedor 8', 'Vendedor 9', 'Vendedor 10', 'Vendedor 11', 'Vendedor 12'],
                datasets: [{
                    // label: 'Participação',
                    backgroundColor: [
                        'rgba(14, 194, 84, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(87, 0, 10, 0.5)',
                        'rgba(153, 102, 255,0.5)',
                        'rgba(13, 24, 255, 0.5)',
                        'rgba(54, 51, 51, 0.5)',
                        'rgba(0, 255, 251, 0.5)',
                        'rgba(4, 74, 16, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    data: [15, 50, 30, 15, 20, 34, 60, 85, 100, 130, 150, 400]
                }]
            },
            options: {
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
                // title: {
                //     display: true,
                //     text: 'Predicted world population (millions) in 2050'
                // }
            }
        });
    }

    mixedChartMethod() {
        this.mixedChart = new Chart(this.mixedCanvas.nativeElement, {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'Quantidade de pedidos',
                    data: [15, 50, 30, 15, 20, 34, 60, 85, 100, 130, 150, 400],
                    backgroundColor: 'rgba(14, 194, 84, 1)',
                    order: 1
                }, {
                    label: 'Valores negociados (R$) ',
                    data: [120, 160, 130, 115, 310, 341, 553, 604, 900, 1200, 1500, 1700],
                    type: 'line',
                    borderColor: 'rgba(13, 24, 255, 1)',
                    order: 2
                }],
                labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
                // labels: ['1º tri', '2º tri', '3º tri', '4º tri']
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    sair() {
      //  TODO: antes de sair, averiguar pendencias em:
      //       mercator_clientes (indexed_db)
      UtilService.usuarioLogado = false;
      // this.connectSubscription.unsubscribe();
      // this.disconnectSubscription.unsubscribe();
      this.router.navigate(['/login'], {replaceUrl: true})
          .then(() => {
              LoginService.usuario = undefined;
          });
  }

    toggleControleAtualizacao() {
        this.controleAtualizacaoManual = !this.controleAtualizacaoManual;
        const config: any = this.bancoLocal.obterConfiguracoes(true);
        config.configuracoes.atualizManual = this.controleAtualizacaoManual;
        this.bancoLocal.atualizarConfiguracoes(config.configuracoes, config.posicao);
    }
}
