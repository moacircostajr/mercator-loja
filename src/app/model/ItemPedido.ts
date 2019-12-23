import { Pedido } from './Pedido';

export class ItemPedido {
    /* id bigint not null unique auto_increment,
    id_pedido bigint not null,
    discriminacao varchar (256) not null,
    quantidade float not null ,
    unidade varchar(10) not null,
    valor float not null,
    PRIMARY KEY (id),
    FOREIGN KEY (id_pedido) references mercator_representacao.pedido(id) */

    id: number;
    pedido: Pedido
    discriminacao: string;
    quantidade: number;
    unidade: string;
    valor: number;
    enviar: number;
    ultimaAtualizacao: Date;
}
