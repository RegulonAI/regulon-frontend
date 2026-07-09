# Regulon AI - Interface de Usuário

Esta é a aplicação cliente (Frontend) da plataforma Regulon AI, uma RegTech voltada para a automação de conformidade regulatória em instituições financeiras brasileiras. A interface consome os serviços da API para prover uma experiência visual intuitiva na gestão e auditoria de normas regulatórias.

## Funcionalidades da Interface

- **Dashboard de Compliance**: Painel centralizado que exibe métricas de conformidade em tempo real, status de auditorias e alertas de novas normas publicadas pelos órgãos reguladores (BCB, CVM, ANPD e COAF).
- **Módulo de Busca Semântica**: Interface de busca avançada que utiliza processamento de linguagem natural para localizar trechos e exigências regulatórias correlacionadas, facilitando a análise de impacto.
- **Visualizador de Rastreabilidade**: Tela dedicada para mapear e demonstrar visualmente a correlação entre as exigências regulatórias internas e os normativos externos vigentes.
- **Linha do Tempo de Normas**: Visualização cronológica interativa (Linha do Tempo de Chunks/Normas) que rastreia atualizações, alterações e revogações históricas de normativos de forma sequencial.

## Tecnologias Utilizadas

A interface foi desenvolvida utilizando as seguintes tecnologias:

- **Next.js** (Versão 16.2.4) como framework de desenvolvimento e renderização.
- **React** (Versão 19.2.4) para a biblioteca de componentes de interface.
- **TypeScript** (Versão 5) para tipagem estática e segurança do código.
- **Tailwind CSS** (Versão 4) para estilização de interface responsiva e moderna.
- **Radix UI** para primitivos de componentes acessíveis e customizáveis.
- **Framer Motion** para animações fluidas e transições de tela.
- **Recharts** para geração de gráficos estatísticos do painel de controle.

## Pré-requisitos e Instalação

Antes de iniciar, certifique-se de ter instalado em sua máquina local:

- Node.js (Versão 20 ou superior recomendada)
- Gerenciador de pacotes npm ou pnpm

Siga os passos abaixo para preparar o ambiente:

1. Clone o repositório do projeto:
   ```bash
   git clone https://github.com/regulonai/regulon-frontend.git
   cd regulon-frontend/regulon-ai
   ```

2. Instale as dependências utilizando o pnpm:
   ```bash
   pnpm install
   ```
   Ou alternativamente utilizando o npm:
   ```bash
   npm install
   ```

## Configuração do Ambiente

A aplicação necessita da URL de comunicação com o backend. Crie um arquivo de configuração de ambiente na raiz da pasta da aplicação:

1. Duplique o arquivo de exemplo ou crie um arquivo chamado `.env.local` na pasta `regulon-ai/`.
2. Configure a seguinte variável com o endereço da API:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

## Como Executar a Aplicação

Abaixo estão os comandos disponíveis para execução do projeto:

- Executar em modo de desenvolvimento:
  ```bash
  pnpm dev
  ```
  Ou:
  ```bash
  npm run dev
  ```
  A aplicação estará disponível em `http://localhost:3000`.

- Gerar build de produção:
  ```bash
  pnpm build
  ```
  Ou:
  ```bash
  npm run build
  ```

- Iniciar o servidor com a build de produção:
  ```bash
  pnpm start
  ```
  Ou:
  ```bash
  npm run start
  ```

## Qualidade de Código e Testes

Para garantir a qualidade e padronização do código-fonte:

- Executar a validação do linter (ESLint):
  ```bash
  pnpm lint
  ```
  Ou:
  ```bash
  npm run lint
  ```
