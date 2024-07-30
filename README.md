# Help Registration App

Este projeto é uma aplicação web desenvolvida em React para gerenciar o cadastro de colaboradores e atividades. Ele possui funcionalidades para adicionar, listar e detalhar colaboradores e suas respectivas atividades.

## Funcionalidades

### Parte 1: Cadastro de Colaboradores

- **Cadastro de Colaboradores**
  - Permite adicionar novos colaboradores com os seguintes campos:
    - Nome completo
    - Cargo
    - Data de admissão
    - Setor
    - Salário
  - Valida os dados inseridos (ex: garante que o salário seja um valor positivo).

- **Listagem de Colaboradores**
  - Exibe a lista de colaboradores cadastrados.
  - Permite filtrar colaboradores por setor.

- **Detalhes do Colaborador**
  - Ao clicar em um colaborador na lista, exibe os detalhes completos (todos os campos).

### Parte 2: Cadastro de Atividades

- **Cadastro de Atividades**
  - Permite adicionar novas atividades com uma descrição detalhada.
  - Associar cada atividade a um colaborador específico.

- **Listagem de Atividades**
  - Exibe a lista de atividades cadastradas.
  - Permite filtrar atividades por colaborador ou por status (pendente, em andamento, concluída).

- **Atualização de Status**
  - Permite marcar uma atividade como concluída.

### Bônus (opcional)
- Implementação de autenticação usando JWT (JSON Web Tokens) para proteger o acesso à aplicação.
- Adição de paginação na listagem de colaboradores e atividades.

  ## Como Rodar o Projeto

1. **Clone o repositório:**

   ```bash
     git clone https://github.com/seu_usuario/help-registration-app.git

2.  **Acesse o diretório do projeto:**
   ```bash
    cd help-registration-app
````

3.  **Instale as dependências:**
   ```bash
   npm install
````
4. **Inicie o servidor de desenvolvimento:**
 ```bash
  npm run dev
````

## Tecnologias Utilizadas

A aplicação foi desenvolvida com as seguintes tecnologias e suas respectivas versões:

```json
{
  "name": "help-registration-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "postinstall": "husky install"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.2.7",
    "@remix-run/router": "^1.18.0",
    "antd": "^5.19.3",
    "axios": "^1.7.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.1",
    "react-input-mask": "^2.0.4",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.25.1",
    "react-switch": "^7.0.0",
    "recharts": "^2.12.7",
    "styled-components": "^6.1.12"
  },
  "devDependencies": {
    "@commitlint/cli": "^19.3.0",
    "@commitlint/config-conventional": "^19.2.2",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/react-input-mask": "^3.0.5",
    "@typescript-eslint/eslint-plugin": "^7.15.0",
    "@typescript-eslint/parser": "^7.15.0",
    "@vitejs/plugin-react": "^4.3.1",
    "devmoji": "^2.3.0",
    "eslint": "^9.8.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "husky": "^9.1.3",
    "prettier": "^3.3.3",
    "typescript": "^5.2.2",
    "vite": "^5.3.4"
  }
}
```
## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Stay in touch

- Author - https://www.linkedin.com/in/jefferson-coelho/
- Website - https://github.com/BioJJ
- Twitter - https://twitter.com/bio_jefferson
