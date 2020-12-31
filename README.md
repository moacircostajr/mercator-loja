# mercator-loja

Projeto desenvolvido em Typescript com o framework Ionic 5 (baseado no Angular 8), consistindo numa interface gráfica da ferramenta de gerenciamento de equipe de vendas. Consome a API mercator-api-mysql.

## Inicializando

Estas instruções lhe permitirão obter uma cópia do projeto e executá-lo na sua máquina local para desenvolvimento e testes. Veja as notas de compilação para saber como compilar o projeto.

### Pré-requisitos

O framework Ionic deve ser instalado globalmente através do comando `npm install -g @ionic/cli`

Por se tratar de um cliente, este projeto consome os serviços de uma API. No entanto, para testar e desenvolver esse projeto é possível que a API seja emulada pelo JSON SERVER, um programa que pode ser instalado na sua máquina através no comando `npm install json-server -g`. O comando NPM, por sua vez, pode ser instalado através do comando `sudo apt install nodejs` (no GNU/LINUX distribuição Ubuntu, Debian ou derivados).

Após a instalação das ferramentas mencionadas, devem ser utilizados os arquivos para emular o banco de dados, seguindo os modelos contidos na pasta `/data` e a [ajuda](https://github.com/typicode/json-server/blob/master/README.md) do Json-Server.


### Instalação

Após o download deste projeto, dentro de sua pasta principal deve ser executado o comando `npm install`, para que seja feito o download e a instalação das dependências do projeto.

Após a instalação das dependências, basta executar os passos informados nas notas a seguir.

## Servidor de desenvolvimento

Execute `ionic serve` para iniciar o servidor de desenvolvimento. Acesse o endereço web `http://localhost:8100/`. A aplicação será atualizada automaticamente caso seja alterado o código fonte.

## Ferramentas de desenvolvimento

Execute `ionic generate component component-name` para criar um novo componente. Você também pode usar `ng generate directive|page|service`.

## Compilação

Execute `ionic build` para compilar o projeto (web). O projeto compilado poderá ser encontrado no diretório www/. Use --prod para uma compilação de produção.

## Ajuda

Para obter mais informações sobre o Ionic CLI, use `ionic --help` ou acesse [Ionic CLI README](https://github.com/ionic-team/ionic-cli/blob/develop/README.md).

## Autores

* **Moacir Costa** - *Desenvolvedor inicial*

Veja também a lista de [colaboradores](https://github.com/moacircostajr/cjm-gestor-client/graphs/contributors) que participam deste projeto.

## Licença

Este projeto está licenciado sob os termos da GNU General Public License v3.0 - veja [LICENSE.md](https://github.com/moacircostajr/cjm-gestor-client/blob/master/LICENSE) para conhecer os detalhes.

## Agradecimentos

* A Jesus Cristo, que me deu coragem e força pra chegar até aqui
* Ao meu irmão Claudio Costa, que me ensinou os caminhos que eu deveria trilhar para chegar neste nível de conhecimento em programação

## Status do projeto

* Este projeto utiliza o plugin Cordova, que em breve deixará de ser aceito no iOS. Veja os detalhes [aqui](https://github.com/ionic-team/capacitor/issues/1912). Portanto, esta tecnologia em breve terá seu uso restringido, razão pela qual decidi encerrar seu desenvolvimento.
