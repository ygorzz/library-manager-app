# 📚 Library Manager - Gerenciador de Biblioteca

Um aplicativo de linha de comando desenvolvido em Node.js para gerenciar sua biblioteca pessoal.

## ✨ Funcionalidades

- ✅ **Adicionar Livros**: Cadastre novos livros com título, autor, categoria e status de leitura
- ✅ **Listar Livros Cadastrados**: Visualize todos os livros armazenados
- ✅ **Marcar como Lido/Não Lido**: Acompanhe o progresso de leitura de cada livro
- ✅ **Remover Livros**: Delete livros da sua biblioteca pessoal
- ✅ **Menu Interativo**: Interface amigável no terminal com opções claras
- ✅ **Persistência em JSON**: Todos os dados são salvos em arquivo

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Readline** - Módulo integrado para entrada de dados no terminal
- **ES Modules** - Importação/exportação de módulos
- **Arquivo JSON** - Para persitência de dados

## 📋 Conceitos JavaScript Aplicados

Este projeto pratica os seguintes conceitos:

- Arrays e métodos (`splice`, `push`, `findIndex`)
- Objetos e manipulação de propriedades
- Arrow Functions
- Higher-Order Functions (HOF) e Callbacks
- Recursão
- Tratamento de Erros (Try/Catch)
- JSON (Parse e Stringify)
- Módulos (Import/Export)
- Destructuring
- Operações CRUD

## 🚀 Como Usar

### Pré-requisitos
- Node.js instalado na sua máquina

### Instalação
```bash
git clone <seu-repositorio>
cd library_manager
```

### Executar
```bash
node index.js
```

## 📖 Menu de Opções

Ao executar o programa, você terá as seguintes opções:

```
a) Adicionar novo livro
b) Listar livros
c) Marcar como lido/não lido
d) Remover livro
e) Sair
```

## 📁 Estrutura do Projeto

```
library_manager/
├── index.js        # Ponto de entrada da aplicação
├── app.js          # Gerenciamento da interface e fluxo do menu
├── utils.js        # Funções utilitárias (operações CRUD)
├── livros.json     # Arquivo de persistência de dados
└── README.md       # Este arquivo
```

## 🔍 Estrutura de um Livro

Cada livro é armazenado como um objeto JSON com as seguintes propriedades:

```json
{
  "titulo": "O Hobbit",
  "autor": "Tolkien",
  "categoria": "Aventura",
  "lido": true
}
```

## 📝 Detalhes da Implementação

### index.js
Arquivo de entrada que inicia a aplicação chamando `mostrarMenu()`.

### app.js
Gerencia a interface interativa com o usuário:
- `mostrarMenu()` - Exibe o menu principal
- `pedirInfosLivro()` - Inicia o fluxo de cadastro
- `pedirTitulo()`, `pedirAutor()`, `pedirCategoria()`, `pedirStatus()` - Funções recursivas para coleta de dados

### utils.js
Contém as operações de manipulação de dados:
- **Create**: `cadastrarLivro()` - Adiciona novo livro
- **Read**: `listarLivros()` - Carrega todos os livros
- **Update**: `marcarComoLido()`, `marcarComoNaoLido()`, `atualizarStatusLivro()` - Modifica status
- **Delete**: `removerLivro()` - Remove livro
- **Helpers**: `filtrarPosicaoLivro()`, `semResposta()`, `adicionarNoJson()`

### livros.json
Arquivo JSON que armazena todos os livros da biblioteca.
