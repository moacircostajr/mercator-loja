import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'nova-conta', loadChildren: './pages/nova-conta/nova-conta.module#NovaContaPageModule' },
  { path: 'principal', loadChildren: './pages/principal/principal.module#PrincipalPageModule' },
  // { path: 'clientes/:id,:nome', loadChildren: './pages/clientes/clientes.module#ClientesPageModule' },
  // { path: 'clientes/:nome', loadChildren: './pages/clientes/clientes.module#ClientesPageModule' },
  { path: 'clientes', loadChildren: './pages/clientes/clientes.module#ClientesPageModule' },
  { path: 'cliente', loadChildren: './pages/cliente/cliente.module#ClientePageModule' },
  { path: 'cliente/:codigo', loadChildren: './pages/cliente/cliente.module#ClientePageModule' },
  { path: 'pedidos', loadChildren: './pages/pedidos/pedidos.module#PedidosPageModule' },
  { path: 'pedido', loadChildren: './pages/pedido/pedido.module#PedidoPageModule' },
  // { path: 'pedido/idPedido', loadChildren: './pages/pedido/pedido.module#PedidoPageModule' },
  // { path: 'pedido/cliente/:idCliente', loadChildren: './pages/pedido/pedido.module#PedidoPageModule' },
  { path: 'configuracoes', loadChildren: './pages/configuracoes/configuracoes.module#ConfiguracoesPageModule' },
  { path: 'produtos', loadChildren: './pages/produtos/produtos.module#ProdutosPageModule' },
  { path: 'usuarios', loadChildren: './pages/usuarios/usuarios.module#UsuariosPageModule' },
  { path: 'relatorios', loadChildren: './pages/relatorios/relatorios.module#RelatoriosPageModule' },
  { path: 'produto', loadChildren: './pages/produto/produto.module#ProdutoPageModule' },
  { path: 'relatorio', loadChildren: './pages/relatorio/relatorio.module#RelatorioPageModule' },
  { path: 'usuario', loadChildren: './pages/usuario/usuario.module#UsuarioPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
