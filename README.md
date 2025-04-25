## 📝 Descrição do Projeto

Este é um projeto pessoal que desenvolvi com a ideia de criar um fórum interativo. Nele, os usuários podem criar novos tópicos, salvar aqueles que acharem interessantes, curtir e participar das discussões com comentários.

## 📱 Layout da Aplicação

<table>
  <tr align="left" valign="top">
    <td width="50%">
      <p><strong>Tela de Login</strong></p>
      <img alt="Tela de Login" src="/public/login.jpg" width="100%">
    </td>
    <td width="50%">
      <p><strong>Tela Principal</strong></p>
      <img alt="Tela Principal" src="/public/telaprincipal.png" width="100%">
    </td>
  </tr>
</table>

## 🚀 Funcionalidades

- Criação de novos tópicos

- Salvamento de tópicos favoritos

- Exclusão de topicos e comentarios

- Curtidas em tópicos e comentários

- Comentários em discussões

- Interface responsiva e dinâmica

## 🛠️ Tecnologias Utilizadas

- Next.js 15: Framework para construção do front-end

- TypeScript: Tipagem estática para maior segurança

- TailwindCSS: Estilização ágil e responsiva

- Prisma ORM: Gerenciamento de banco de dados

- PostgreSQL: Banco de dados relacional

- API do Next.js: Backend integrado à aplicação

## 🔧 Instalação e Configuração

Pré-requisitos

- Node.js (versão LTS recomendada)

- npm ou yarn

- Banco de dados PostgreSQL configurado

#### Passos para instalação

Clone o repositório:

```
git clone https://github.com/victorparanhosdev/cruz-forum.git
cd cruz-forum
```

Instale as dependências:

```
npm install
ou
yarn
```

#### Passos para instalação com Docker

Você pode subir todo o ambiente (PostgreSQL e Prisma) utilizando o Docker:

```
docker-compose up
```

Ou, para rodar em segundo plano:

```
docker-compose up -d
```

- Configure as variáveis de ambiente no arquivo .env:

```
DATABASE_URL="postgresql://myuser:mypassword@localhost:5431/mydatabase"

NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_FROM=

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

GITHUB_ID=
GITHUB_SECRET=
```

- Rode as migrações do banco de dados:

```
npx prisma migrate dev
```

- Popular o banco de dados:

```
npx prisma db seed
```

- Inicie o servidor de desenvolvimento:

```
npm run dev
ou
yarn dev
```

- A aplicação estará disponível em: http://localhost:3000

### 👨‍💻 Autor

Desenvolvido por Victor Paranhos.
