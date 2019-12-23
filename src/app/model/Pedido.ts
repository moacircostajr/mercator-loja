import { Empresa } from './Empresa';
import { Cliente } from './Cliente';
import {Usuario} from './Usuario';
import {ItemPedido} from './ItemPedido';

export class Pedido {
    /* id bigint not null unique auto_increment,
    id_cliente bigint not null,
    momento timestamp not null,
    valor_total float,
    entregue boolean not null default false,
    PRIMARY KEY (id),
    FOREIGN KEY (id_cliente) references mercator_representacao.cliente(id) */
    id: number;
    empresaRepresentacao: Empresa;
    usuario: Usuario;
    cliente: Cliente;
    momento: Date;
    valorTotal: number;
    entregue: boolean;
    itensPedido: ItemPedido[];
    enviar: number;
    ultimaAtualizacao: Date;
}
