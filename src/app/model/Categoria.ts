import { Empresa } from './Empresa';
import {Usuario} from './Usuario';
import {TipoUnidade} from './TipoUnidade';

export class Categoria {
    id: number;
    codigo: any;
    empresaRepresentacao: Empresa;
    discriminacao: string;
}
