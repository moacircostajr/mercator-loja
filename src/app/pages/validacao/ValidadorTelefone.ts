import {AbstractControl, ValidationErrors} from '@angular/forms';

export class ValidadorTelefone {

    static isValid(control: AbstractControl): ValidationErrors | null {
        let telefone = control.value;
        // retira todos os caracteres menos os numeros
        telefone = telefone.replace(/\D/g, '');

        // verifica se tem a qtde de numero correto
        if (!(telefone.length >= 10 && telefone.length <= 11)) { return {isValid: false}; }

        // Se tiver 11 caracteres, verificar se começa com 9 o celular
        // tslint:disable-next-line:radix
        if (telefone.length === 11 && parseInt(telefone.substring(2, 3)) !== 9) { return {isValid: false}; }

        // verifica se não é nenhum numero digitado errado (propositalmente)
        for (let n = 0; n < 10; n++) {
            // um for de 0 a 9.
            // estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
            // caractere a ser repetido
            if (telefone === new Array(11).join(n.toString()) || telefone === new Array(12).join(n.toString())) { return {isValid: false}; }
        }
        // DDDs validos
        const codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
            21, 22, 24, 27, 28, 31, 32, 33, 34,
            35, 37, 38, 41, 42, 43, 44, 45, 46,
            47, 48, 49, 51, 53, 54, 55, 61, 62,
            64, 63, 65, 66, 67, 68, 69, 71, 73,
            74, 75, 77, 79, 81, 82, 83, 84, 85,
            86, 87, 88, 89, 91, 92, 93, 94, 95,
            96, 97, 98, 99];
        // verifica se o DDD é valido (sim, da pra verificar rsrsrs)
        // tslint:disable-next-line:radix
        if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) === -1) { return {isValid: false}; }

        //  E por ultimo verificar se o numero é realmente válido. Até 2016 um celular pode
        // ter 8 caracteres, após isso somente numeros de telefone e radios (ex. Nextel)
        // vão poder ter numeros de 8 digitos (fora o DDD), então esta função ficará inativa
        // até o fim de 2016, e se a ANATEL realmente cumprir o combinado, os numeros serão
        // validados corretamente após esse período.
        // NÃO ADICIONEI A VALIDAÇÂO DE QUAIS ESTADOS TEM NONO DIGITO, PQ DEPOIS DE 2016 ISSO NÃO FARÁ DIFERENÇA
        // Não se preocupe, o código irá ativar e desativar esta opção automaticamente.
        // Caso queira, em 2017, é só tirar o if.
        if (new Date().getFullYear() < 2017) { return null; }
        // tslint:disable-next-line:radix
        if (telefone.length === 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) === -1) { return {isValid: false}; }

        // se passar por todas as validações acima, então está tudo certo
        return null;
    }

}
// chamada simples
// telefone_validation("(11)99000-3777"); // retorna true
// telefone_validation("11-99000-3777"); // retorna true
// telefone_validation("11990003777"); // retorna true
// telefone_validation("1111111111"); // retorna false
// telefone_validation("1111111111"); // retorna false
// telefone_validation("(01)3444-4444"); // retorna false
// telefone_validation("(01)43444-4444"); // retorna false
