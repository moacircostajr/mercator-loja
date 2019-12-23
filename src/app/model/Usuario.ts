import { Empresa } from './Empresa';
import { Perfil } from './Perfil';

export class Usuario {
    id: number;
    nome: string;
    sobrenome: string;
    empresaRepresentacao: Empresa;
    email: string;
    senha: string;
    autenticacao: string;
    perfil: Perfil;
    codigo: string;
}
