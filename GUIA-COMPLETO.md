# 🚀 MARCENARIA PRO - GUIA COMPLETO v2026.3.0

## 🎉 TODAS AS FUNCIONALIDADES IMPLEMENTADAS!

---

## 📋 ÍNDICE
1. [Busca Global](#busca-global)
2. [Dashboard](#dashboard)
3. [Duplicar Projeto](#duplicar-projeto)
4. [Controle de Pagamentos](#controle-de-pagamentos)
5. [Tags e Categorias](#tags-e-categorias)
6. [Histórico (Undo/Redo)](#historico)
7. [Senha de Acesso](#senha-de-acesso)
8. [Dark Mode](#dark-mode)
9. [Sistema de Loading](#loading)
10. [Notificações Toast](#toast)
11. [Confirmações](#confirmacoes)
12. [Atalhos de Teclado](#atalhos)

---

## 🔍 BUSCA GLOBAL

### Como Usar:
- **Atalho**: Pressione **Ctrl+K** (ou Cmd+K no Mac)
- Ou adicione um botão com: `onclick="BuscaGlobal.abrir()"`

### Funcionalidades:
✅ Busca em todos os clientes
✅ Busca em todos os projetos  
✅ Busca por nome, valor, data
✅ Resultados em tempo real
✅ Clique no resultado para abrir

### Exemplo de Uso:
```javascript
// Abrir busca programaticamente
BuscaGlobal.abrir();

// Adicionar ao menu
<button onclick="BuscaGlobal.abrir()">🔍 Buscar</button>
```

---

## 📊 DASHBOARD

### Como Usar:
```javascript
// Exibir dashboard
Dashboard.exibir(); // Retorna HTML

// Inserir na página
Dashboard.inserirNaPagina();

// Navegar para dashboard
navigateTo('dashboard'); // Se você já tem sistema de navegação
```

### O que Mostra:
📈 Total de Clientes
📁 Total de Projetos
💰 Valor Total Faturado
📊 Ticket Médio
🏆 Cliente Destaque
💎 Maior Orçamento
📅 Projetos Recentes

### Dados Calculados:
```javascript
const dados = Dashboard.calcular();
console.log(dados);
// {
//   totalClientes: 10,
//   totalProjetos: 45,
//   valorTotal: 125000,
//   valorMedio: 2777.78,
//   ...
// }
```

---

## 📋 DUPLICAR PROJETO

### Como Usar:
```javascript
// Duplicar um projeto
DuplicarProjeto.duplicar('clienteId', 'projetoId');

// Adicionar botão nos projetos
<button onclick="DuplicarProjeto.duplicar('${clienteId}', '${projetoId}')">
    📋 Duplicar
</button>
```

### O que Faz:
✅ Cria cópia exata do projeto
✅ Adiciona "(Cópia)" no nome
✅ Atualiza data para hoje
✅ Gera novo ID único
✅ Mantém todas as peças e ferragens

---

## 💰 CONTROLE DE PAGAMENTOS

### Como Usar:
```javascript
// Abrir modal de pagamentos
ControlePagamentos.exibirModal('clienteId', 'projetoId');

// Registrar pagamento
ControlePagamentos.registrarPagamento('clienteId', 'projetoId', 1500, 'Sinal');

// Adicionar botão
<button onclick="ControlePagamentos.exibirModal('${clienteId}', '${projetoId}')">
    💰 Pagamentos
</button>
```

### Funcionalidades:
✅ Status: Pendente, Parcial, Pago
✅ Registrar múltiplos pagamentos
✅ Histórico de pagamentos
✅ Calcular saldo restante
✅ Descrição para cada pagamento

### Status de Pagamento:
- **Pendente** (🔴): Nenhum pagamento feito
- **Parcial** (🟡): Pagamento parcial
- **Pago** (🟢): Totalmente pago

---

## 🏷️ TAGS E CATEGORIAS

### Categorias Disponíveis:
- 🍳 Cozinha
- 🛏️ Quarto
- 🚿 Banheiro
- 🛋️ Sala
- 💼 Escritório
- 🏢 Comercial
- 📦 Outro

### Como Usar no Projeto:
```javascript
// Adicionar categoria e tags ao projeto
TagsECategorias.adicionarAoProjeto(projeto, 'Cozinha', ['urgente', 'premium']);

// Renderizar seletor no formulário
const seletorHTML = TagsECategorias.renderizarSeletor(projetoAtual);

// Renderizar badges (para exibição)
const badgesHTML = TagsECategorias.renderizarBadges(projeto);
```

### HTML para Formulário:
```html
<div class="form-group">
    <label>📂 Categoria</label>
    <select id="projeto-categoria">
        <option value="">Selecione</option>
        <option value="Cozinha">Cozinha</option>
        <option value="Quarto">Quarto</option>
        <!-- ... outras categorias ... -->
    </select>
</div>

<div class="form-group">
    <label>🏷️ Tags (separadas por vírgula)</label>
    <input type="text" id="projeto-tags" placeholder="urgente, premium">
</div>
```

---

## ↩️ HISTÓRICO (UNDO/REDO)

### Atalhos:
- **Ctrl+Z** (ou Cmd+Z): Desfazer
- **Ctrl+Y** (ou Cmd+Y): Refazer
- **Ctrl+Shift+Z**: Refazer (alternativo)

### Como Funciona:
O sistema salva automaticamente cada ação importante:
- Criar projeto
- Editar projeto
- Deletar projeto
- Adicionar peça
- etc.

### Uso Programático:
```javascript
// Salvar estado antes de uma ação
Historico.salvarEstado('Antes de deletar projeto');

// Fazer a ação
deletarProjeto();

// Usuário pode desfazer com Ctrl+Z

// Desfazer programaticamente
Historico.desfazer();

// Refazer programaticamente
Historico.refazer();
```

### Integrar com suas funções:
```javascript
// Exemplo: Adicionar ao deletar
function deletarProjetoComHistorico(id) {
    Historico.salvarEstado('Deletar projeto ' + id);
    deletarProjeto(id);
}
```

---

## 🔐 SENHA DE ACESSO

### Primeira Vez:
1. Sistema pedirá para criar senha
2. Digite sua senha desejada
3. Senha será salva

### Como Usar:
```javascript
// Mostrar configuração de senha
SenhaAcesso.mostrarConfiguracao();

// Bloquear manualmente
SenhaAcesso.bloquear();

// Verificar se tem senha
if (SenhaAcesso.temSenha()) {
    console.log('Sistema protegido!');
}
```

### Funcionalidades:
✅ Senha na primeira abertura
✅ Auto-bloqueio após 10 min de inatividade
✅ Botão para bloquear manualmente
✅ Configurar/remover senha
✅ Dados protegidos

### Adicionar ao Menu:
```html
<button onclick="SenhaAcesso.mostrarConfiguracao()">
    🔐 Configurar Senha
</button>

<button onclick="SenhaAcesso.bloquear()">
    🔒 Bloquear Sistema
</button>
```

---

## ⌨️ ATALHOS DE TECLADO COMPLETOS

| Atalho | Ação |
|--------|------|
| **Ctrl+K** | Busca Global |
| **Ctrl+S** | Salvar Dados |
| **Ctrl+E** | Exportar Dados |
| **Ctrl+Z** | Desfazer |
| **Ctrl+Y** | Refazer |
| **ESC** | Fechar Modais |
| **Ctrl+Shift+Z** | Refazer (alt) |

---

## 💡 EXEMPLO COMPLETO DE INTEGRAÇÃO

### 1. Adicionar ao Menu de Navegação:

```html
<nav class="card">
    <h2>Menu</h2>
    <div class="botoes-acao">
        <button onclick="BuscaGlobal.abrir()">🔍 Buscar</button>
        <button onclick="navigateTo('dashboard')">📊 Dashboard</button>
        <button onclick="SenhaAcesso.mostrarConfiguracao()">🔐 Senha</button>
        <button onclick="DarkMode.toggle()">🌙 Tema</button>
    </div>
</nav>
```

### 2. Adicionar Botões nos Projetos:

```javascript
// No HTML de cada projeto
function renderizarProjeto(projeto, clienteId) {
    return `
        <div class="projeto-item" data-projeto-id="${projeto.id}" data-cliente-id="${clienteId}">
            <h3>${projeto.nome}</h3>
            <p>${projeto.nomeCliente}</p>
            
            <!-- Tags e Categoria -->
            <div class="projeto-badges">
                ${TagsECategorias.renderizarBadges(projeto)}
            </div>
            
            <div class="botoes-acao">
                <button onclick="carregarProjeto('${clienteId}', '${projeto.id}')">
                    📂 Abrir
                </button>
                <button onclick="DuplicarProjeto.duplicar('${clienteId}', '${projeto.id}')">
                    📋 Duplicar
                </button>
                <button onclick="ControlePagamentos.exibirModal('${clienteId}', '${projeto.id}')">
                    💰 Pagamentos
                </button>
                <button onclick="deletarProjetoSeguro('${clienteId}', '${projeto.id}')">
                    🗑️ Deletar
                </button>
            </div>
        </div>
    `;
}
```

### 3. Adicionar Categoria/Tags ao Salvar Projeto:

```javascript
function salvarProjetoCompleto() {
    // ... código existente ...
    
    // Adicionar categoria e tags
    const categoria = document.getElementById('projeto-categoria').value;
    const tagsInput = document.getElementById('projeto-tags').value;
    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);
    
    TagsECategorias.adicionarAoProjeto(projeto, categoria, tags);
    
    // Salvar histórico
    Historico.salvarEstado('Salvar projeto ' + projeto.nome);
    
    // ... continuar salvamento ...
}
```

### 4. Integrar Pagamentos ao Orçamento:

```javascript
function calcularOrcamentoTotal(projeto) {
    const valorTotal = calcularValorBase(projeto);
    
    // Adicionar ao controle de pagamentos
    const pagamento = ControlePagamentos.adicionarAoProjeto(clienteId, projeto.id);
    pagamento.valorTotal = valorTotal;
    
    return valorTotal;
}
```

---

## 🎨 CUSTOMIZAÇÃO

### Adicionar Mais Categorias:

```javascript
// No arquivo features.js, encontre TagsECategorias e adicione:
TagsECategorias.categorias.push('Lavanderia', 'Área Externa');
TagsECategorias.cores['Lavanderia'] = '#14b8a6';
TagsECategorias.cores['Área Externa'] = '#22c55e';
```

### Mudar Tempo de Auto-bloqueio:

```javascript
// No arquivo features.js, encontre SenhaAcesso.init()
// Altere: 10 * 60 * 1000 (10 minutos)
// Para: 5 * 60 * 1000 (5 minutos)
timeout = setTimeout(() => {
    if (this.temSenha()) {
        this.bloquear();
    }
}, 5 * 60 * 1000); // 5 minutos
```

### Aumentar Histórico:

```javascript
// No arquivo features.js, encontre:
Historico.maxAcoes = 20; // Aumentar para 50
```

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### Busca não funciona:
```javascript
// Verificar se está inicializado
console.log('BuscaGlobal:', typeof BuscaGlobal);

// Forçar inicialização
BuscaGlobal.init();
```

### Dashboard não aparece:
```javascript
// Inserir manualmente
Dashboard.inserirNaPagina();

// Ou adicionar ao HTML
document.querySelector('main').innerHTML += Dashboard.exibir();
```

### Histórico não salva:
```javascript
// Salvar manualmente antes de ações importantes
Historico.salvarEstado('Descrição da ação');
```

### Senha esquecida:
```javascript
// No console do navegador (F12):
localStorage.removeItem('marcenaria_pro_senha');
localStorage.removeItem('marcenaria_pro_bloqueado');
// Depois recarregue a página
```

---

## 📱 TESTAR TUDO

### No Console do Navegador (F12):

```javascript
// 1. Testar Busca
BuscaGlobal.abrir();

// 2. Ver Dashboard
console.log(Dashboard.calcular());

// 3. Testar Histórico
Historico.salvarEstado('Teste');
console.log('Histórico:', Historico.acoes);

// 4. Verificar Senha
console.log('Tem senha:', SenhaAcesso.temSenha());

// 5. Testar Tags
const projeto = { id: '123', nome: 'Teste' };
TagsECategorias.adicionarAoProjeto(projeto, 'Cozinha', ['urgente']);
console.log('Projeto:', projeto);

// 6. Status geral
console.log('=== STATUS ===');
console.log('BuscaGlobal:', typeof BuscaGlobal);
console.log('Dashboard:', typeof Dashboard);
console.log('Historico:', typeof Historico);
console.log('ControlePagamentos:', typeof ControlePagamentos);
console.log('TagsECategorias:', typeof TagsECategorias);
console.log('SenhaAcesso:', typeof SenhaAcesso);
```

---

## 🎯 RESUMO RÁPIDO

### O que foi adicionado:
✅ **Busca Global** (Ctrl+K)
✅ **Dashboard** com estatísticas
✅ **Duplicar Projeto** com 1 clique
✅ **Controle de Pagamentos** completo
✅ **Tags e Categorias** para organizar
✅ **Histórico** Undo/Redo (Ctrl+Z/Y)
✅ **Senha de Acesso** com auto-bloqueio
✅ **Dark Mode** (já estava, mas melhorado)
✅ **Loading** em todas as operações
✅ **Toast** para notificações
✅ **Confirmações** antes de deletar
✅ **Validações** de formulários
✅ **Formatadores** de valores

### Novos Atalhos:
- **Ctrl+K**: Busca Global
- **Ctrl+Z**: Desfazer
- **Ctrl+Y**: Refazer
- **Ctrl+S**: Salvar
- **Ctrl+E**: Exportar
- **ESC**: Fechar

### Arquivos Criados:
1. `utils.js` - Utilitários básicos
2. `features.js` - Todas as novas funcionalidades
3. `improvements.css` - Estilos das melhorias
4. `features.css` - Estilos das features
5. `exemplos-integracao.js` - Exemplos de uso

---

## 🚀 PRONTO PARA USAR!

Abra o **index.html** e todas as funcionalidades já estarão disponíveis!

**Teste primeiro:**
1. Pressione **Ctrl+K** para busca
2. Configure uma senha (ícone 🔐)
3. Alterne o Dark Mode (🌙)
4. Experimente Ctrl+Z para desfazer

**Dúvidas?** Abra o console (F12) e teste os comandos acima!

---

**Versão:** 2026.3.0  
**Data:** 01/02/2026  
**Status:** ✅ TUDO IMPLEMENTADO!
