import { Empresa } from './Empresa';
import {Usuario} from './Usuario';
import {TipoUnidade} from './TipoUnidade';
import {Categoria} from './Categoria';

export class Produto {
    id: number;
    codigo: any;
    empresaRepresentacao: Empresa;
    discriminacao: string;
    categoria: Categoria;
    precoVenda: number;
    unidade: TipoUnidade;
    observacoes: string;
    enviar: number;
    ultimaAtualizacao: Date;
}
