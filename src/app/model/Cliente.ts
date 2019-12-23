import { Empresa } from './Empresa';
import {Usuario} from './Usuario';

export class Cliente {
    id: number;
    codigo: any;
    empresaRepresentacao: Empresa;
    nomeFantasia: string;
    cnpj: string;
    cpf: string;
    endereco: string;
    telefones: string;
    email: string;
    observacoes: string;
    referencias: string;
    enviar: number;
    ultimaAtualizacao: Date;
}
