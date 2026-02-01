# 🚀 Guia Rápido - Marcenaria PRO v2026.2.0

## ⚡ Início Rápido

### 1. Abra o Sistema
Basta abrir o arquivo `index.html` no navegador. Todas as melhorias já estarão ativas!

### 2. Explore as Novas Funcionalidades

#### 🌙 Dark Mode
- Clique no botão **🌙** no canto superior direito do cabeçalho
- Alterna entre modo claro e escuro
- Sua preferência é salva automaticamente

#### ⌨️ Atalhos de Teclado
- **Ctrl+S** (ou Cmd+S no Mac): Salva os dados
- **Ctrl+E** (ou Cmd+E no Mac): Exporta os dados
- **ESC**: Fecha modais e diálogos

#### 🔔 Notificações
As notificações aparecem automaticamente no canto superior direito quando você:
- Salva dados
- Deleta projetos
- Exporta arquivos
- Encontra erros

#### ⚠️ Confirmações Seguras
Ao deletar um projeto, agora aparece uma confirmação elegante:
- **Sim, Deletar**: Confirma a exclusão
- **Cancelar**: Cancela a operação

## 💡 Exemplos Práticos

### Como Usar Loading

```javascript
// Ao iniciar uma operação demorada
LoadingSystem.show('Carregando...');

// Fazer a operação...

// Ao terminar
LoadingSystem.hide();
```

### Como Usar Toast (Notificações)

```javascript
// Sucesso
Toast.show('✅ Operação concluída!', 'success');

// Erro
Toast.show('❌ Algo deu errado', 'error');

// Aviso
Toast.show('⚠️ Atenção ao preencher', 'warning');

// Informação
Toast.show('ℹ️ Dados carregados', 'info');
```

### Como Usar Confirmação

```javascript
const confirmado = await ConfirmDialog.show({
    title: 'Confirmar Ação',
    message: 'Deseja realmente continuar?',
    confirmText: 'Sim',
    cancelText: 'Não',
    type: 'warning' // ou 'danger', 'info'
});

if (confirmado) {
    // Usuário clicou em Sim
    console.log('Confirmado!');
} else {
    // Usuário clicou em Não
    console.log('Cancelado');
}
```

### Como Validar um Formulário

```javascript
const dados = {
    nome: 'João Silva',
    email: 'joao@email.com',
    preco: 150
};

const regras = {
    nome: { required: true, label: 'Nome' },
    email: { required: true, type: 'email', label: 'Email' },
    preco: { required: true, type: 'number', min: 0, label: 'Preço' }
};

const resultado = validarFormulario(dados, regras);

if (!resultado.valid) {
    // Mostrar erros
    Toast.show(resultado.errors.join('<br>'), 'error');
} else {
    // Tudo OK, pode salvar
    console.log('Validação OK!');
}
```

### Como Sanitizar Dados

```javascript
// Remover HTML perigoso
const textoLimpo = Sanitizer.sanitizeHTML(inputUsuario);

// Limpar número
const numeroLimpo = Sanitizer.sanitizeNumber(inputNumero, {
    min: 0,
    max: 1000,
    decimals: 2
});

// Limpar texto (remove espaços extras)
const textoFormatado = Sanitizer.sanitizeText(inputTexto);
```

### Como Formatar Valores

```javascript
// Moeda
Formatter.currency(1500); // "R$ 1.500,00"

// Data
Formatter.date(new Date()); // "01/02/2026"

// Data e Hora
Formatter.datetime(new Date()); // "01/02/2026 14:30"

// Telefone
Formatter.phone('11999999999'); // "(11) 99999-9999"

// Número
Formatter.number(1234.56, 2); // "1.234,56"
```

## 🔧 Integrando no Código Existente

### Antes (sem melhorias):
```javascript
function deletarProjeto(clienteId, projetoId) {
    deletarProjetoCliente(clienteId, projetoId);
    alert('Projeto deletado!');
}
```

### Depois (com melhorias):
```javascript
async function deletarProjeto(clienteId, projetoId) {
    // 1. Confirmar
    const confirmado = await ConfirmDialog.show({
        title: '⚠️ Deletar Projeto',
        message: 'Não será possível desfazer. Continuar?',
        type: 'danger'
    });
    
    if (!confirmado) return;
    
    // 2. Mostrar loading
    LoadingSystem.show('Deletando...');
    
    try {
        // 3. Deletar
        await Utils.sleep(300); // Feedback visual
        deletarProjetoCliente(clienteId, projetoId);
        
        // 4. Sucesso
        Toast.show('✅ Projeto deletado!', 'success');
    } catch (error) {
        // 5. Erro
        console.error(error);
        Toast.show('❌ Erro ao deletar', 'error');
    } finally {
        // 6. Sempre esconder loading
        LoadingSystem.hide();
    }
}
```

## 📱 Testando no Console

Abra o Console do navegador (F12) e teste:

```javascript
// Testar Toast
Toast.show('Olá Mundo!', 'success');

// Testar Loading
LoadingSystem.show('Testando...');
setTimeout(() => LoadingSystem.hide(), 2000);

// Testar Confirmação
ConfirmDialog.show({
    title: 'Teste',
    message: 'Isso é um teste!'
}).then(result => console.log('Confirmado:', result));

// Testar Dark Mode
DarkMode.toggle();

// Testar Formatação
console.log(Formatter.currency(1234.56));
console.log(Formatter.date(new Date()));
console.log(Formatter.phone('11999999999'));

// Testar Validação
const result = Validator.positiveNumber(100, 'Preço');
console.log(result);

// Testar Sanitização
console.log(Sanitizer.sanitizeHTML('<script>alert("xss")</script>'));

// Copiar para clipboard
Utils.copyToClipboard('Texto copiado!');
```

## 🎨 Personalizando

### Mudar Duração do Toast
```javascript
Toast.show('Mensagem', 'info', 5000); // 5 segundos
```

### Loading com Texto Personalizado
```javascript
LoadingSystem.show('Calculando orçamento...');
```

### Confirmação Customizada
```javascript
await ConfirmDialog.show({
    title: '🎨 Título Personalizado',
    message: 'Mensagem detalhada aqui...',
    confirmText: 'OK, Entendi!',
    cancelText: 'Voltar',
    type: 'info' // warning, danger, info
});
```

## 🐛 Resolução de Problemas

### Toast não aparece
```javascript
// Verificar se está inicializado
if (!document.getElementById('toast-container')) {
    Toast.init();
}
```

### Loading não funciona
```javascript
// Verificar se está inicializado
if (!document.getElementById('loading-overlay')) {
    LoadingSystem.init();
}
```

### Dark Mode não muda
```javascript
// Forçar mudança
document.documentElement.setAttribute('data-theme', 'dark');
// ou
document.documentElement.removeAttribute('data-theme');
```

### Funções não encontradas
```javascript
// Verificar se utils.js foi carregado
console.log('LoadingSystem:', typeof LoadingSystem);
console.log('Toast:', typeof Toast);
console.log('ConfirmDialog:', typeof ConfirmDialog);
```

## 📊 Verificar Status do Sistema

```javascript
// No Console do navegador (F12)
console.log('=== STATUS DO SISTEMA ===');
console.log('LoadingSystem:', typeof LoadingSystem);
console.log('Toast:', typeof Toast);
console.log('ConfirmDialog:', typeof ConfirmDialog);
console.log('DarkMode:', typeof DarkMode);
console.log('Validator:', typeof Validator);
console.log('Sanitizer:', typeof Sanitizer);
console.log('Formatter:', typeof Formatter);
console.log('Utils:', typeof Utils);
console.log('Dark Mode ativo:', document.documentElement.hasAttribute('data-theme'));
```

## 🎯 Dicas de Performance

1. **Use debounce em buscas**:
```javascript
const buscar = Utils.debounce((termo) => {
    // código de busca
}, 500);
```

2. **Loading em operações assíncronas**:
```javascript
async function operacaoDemorada() {
    LoadingSystem.show();
    try {
        await minhaOperacao();
    } finally {
        LoadingSystem.hide(); // Sempre executado
    }
}
```

3. **Validação antes de processar**:
```javascript
// Valide ANTES de processar
const valido = validarFormulario(dados, regras);
if (!valido.valid) {
    Toast.show(valido.errors.join('<br>'), 'error');
    return; // Para aqui
}
// Continua processamento...
```

## ✅ Checklist de Integração

- [ ] Arquivos `utils.js` e `improvements.css` estão na mesma pasta do `index.html`
- [ ] Os arquivos estão incluídos no `index.html`
- [ ] Abriu o sistema no navegador
- [ ] Testou o Dark Mode (botão 🌙)
- [ ] Testou atalho Ctrl+S
- [ ] Viu notificação Toast aparecer
- [ ] Testou confirmação ao deletar
- [ ] Abriu Console (F12) e verificou que não há erros
- [ ] Leu o arquivo `MELHORIAS.md`

## 🆘 Precisa de Ajuda?

1. **Abra o Console** (F12 no navegador)
2. **Procure por erros** (texto vermelho)
3. **Execute**: `window.diagnosticarCarregamento()` para ver diagnóstico
4. **Verifique** se todos os arquivos estão na mesma pasta

## 🎓 Próximos Passos

1. ✅ Entenda como funciona cada melhoria
2. ✅ Teste no console do navegador
3. ✅ Integre aos poucos no seu código
4. ✅ Personalize conforme sua necessidade
5. ✅ Leia os exemplos em `exemplos-integracao.js`

---

**Divirta-se com as melhorias! 🚀**

Qualquer dúvida, abra o Console (F12) e teste as funções disponíveis.
