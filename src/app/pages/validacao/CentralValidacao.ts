export class CentralValidacao {

    static validationMessages = {
        nome_fantasia: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O nome de fantasia da empresa deve conter no mínimo 5 caracteres'}
        ],
        razao_social: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'A razão social da empresa deve conter no mínimo 5 caracteres'}
        ],
        proprietario: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O nome do proprietário deve conter no mínimo 5 caracteres'}
        ],
        endereco: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O endereço deve conter no mínimo 5 caracteres'}
        ],
        nome: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O nome deve conter no mínimo 5 caracteres'}
        ],
        sobrenome: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'O sobrenome deve conter no mínimo 5 caracteres'}
        ],
        cpf: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'isValid', message: 'Número de CPF inválido'}
        ],
        cnpj: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'isValid', message: 'Número de CNPJ inválido'}
        ],
        telefone: [
            {type: 'required', message: 'Obrigatório o preenchimento completo'},
            {type: 'isValid', message: 'Número de telefone inválido'}
        ],
        email: [
            {type: 'email', message: 'Email inválido'},
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'Email deve conter no mínimo 5 caracteres'}
        ],
        password: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'minlength', message: 'A senha deve conter no mínimo 5 caracteres'},
            {type: 'pattern', message: 'A senha deve conter letras maiúsculas, minúsculas e números'}
        ],
        confirm_password: [
            {type: 'required', message: 'Preenchimento obrigatório'},
            {type: 'areNotEqual', message: 'Senha diferente da confirmação'}
        ]
    };
}
