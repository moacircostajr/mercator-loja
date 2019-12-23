import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

 /* TODO: puxar lista de categorias da API, realizar o CRUD NA LISTA DE CATEGORIAS através de um modal,
 *  TODO: permitir a seleção de uma categoria e tornar dela um atributo de um produto a ser objeto de outro CRUD */
}
