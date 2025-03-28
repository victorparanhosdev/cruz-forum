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

- Configure as variáveis de ambiente no arquivo .env:

```
DATABASE_URL="postgresql://myuser:mypassword@localhost:5431/mydatabase"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
```

- Rode as migrações do banco de dados:

```
npx prisma migrate dev
```

- Inicie o servidor de desenvolvimento:

```
npm run dev
ou
yarn dev
```

- A aplicação estará disponível em: http://localhost:3000

## 🏗️ Estrutura do Projeto

```
cruz-forum/
├── prisma/             # Configurações do banco de dados
├── public/             # Arquivos públicos estáticos
└── src/
└── app/
├── (private)/  # Rotas privadas (requer autenticação)
│   ├── dashboard/      # Página do painel do usuário
│   ├── (inicio)/       # Página inicial após login
│   └── login/          # Página de login
│       ├── AuthButtons.tsx    # Componente de botões de autenticação
│       └── page.tsx           # Página de login
├── api/                # Rotas de API
│   ├── auth/           # Endpoints de autenticação
│   ├── comments/       # Endpoints de comentários
│   └── topics/         # Endpoints de tópicos
├── lib/                # Bibliotecas e utilitários
├── providers/          # Componentes de provedor de contexto
├── types/              # Definições de tipos TypeScript
├── middleware.ts       # Middleware da aplicação
└── arquivos de configuração/
├── .gitignore          # Configurações de arquivos ignorados pelo Git
├── prettier.json       # Configurações do Prettier
├── docker-compose.yml  # Configuração do Docker
├── eslint.config.mjs   # Configurações do ESLint
├── jest.config.ts      # Configurações do Jest
├── jest.setup.ts       # Setup de testes
├── next-env.d.ts       # Tipos de ambiente do Next.js
├── next.config.mjs     # Configurações do Next.js
├── package-lock.json   # Lock de dependências
├── package.json        # Dependências e scripts
├── postcss.config.mjs  # Configurações do PostCSS
├── README.md           # Documentação do projeto
├── tailwind.config.js  # Configurações do Tailwind CSS
└── tsconfig.json       # Configurações do TypeScript
```

👨‍💻 Autor
Desenvolvido por Victor Paranhos.
