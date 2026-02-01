# ✅ CHECKLIST DE TESTE - Marcenaria PRO v2026.3.0

## 🎯 TESTE TODAS AS FUNCIONALIDADES

### ✅ 1. BUSCA GLOBAL
- [ ] Pressione **Ctrl+K**
- [ ] Digite algo para buscar
- [ ] Veja os resultados aparecerem
- [ ] Clique em um resultado
- [ ] Confirme que abre o projeto correto

**Como testar no console:**
```javascript
BuscaGlobal.abrir();
```

---

### ✅ 2. DASHBOARD
- [ ] Abra o Dashboard
- [ ] Verifique se mostra total de clientes
- [ ] Verifique se mostra total de projetos
- [ ] Verifique se mostra valores corretos
- [ ] Veja o cliente destaque
- [ ] Confira projetos recentes

**Como testar no console:**
```javascript
const dados = Dashboard.calcular();
console.log('Dashboard:', dados);
// Ou inserir na página:
Dashboard.inserirNaPagina();
```

---

### ✅ 3. DUPLICAR PROJETO
- [ ] Abra um projeto existente
- [ ] Clique em "Duplicar"
- [ ] Confirme que aparece "(Cópia)" no nome
- [ ] Verifique que é um novo projeto
- [ ] Confirme que manteve todas as informações

**Como testar no console:**
```javascript
// Substitua pelos IDs reais
DuplicarProjeto.duplicar('clienteId', 'projetoId');
```

---

### ✅ 4. CONTROLE DE PAGAMENTOS
- [ ] Abra modal de pagamentos em um projeto
- [ ] Veja o status (Pendente/Parcial/Pago)
- [ ] Registre um novo pagamento
- [ ] Adicione uma descrição
- [ ] Veja o pagamento no histórico
- [ ] Confirme que o saldo foi atualizado

**Como testar no console:**
```javascript
ControlePagamentos.exibirModal('clienteId', 'projetoId');
```

---

### ✅ 5. TAGS E CATEGORIAS
- [ ] Ao criar/editar projeto, selecione uma categoria
- [ ] Adicione tags (separadas por vírgula)
- [ ] Salve o projeto
- [ ] Veja os badges de categoria e tags
- [ ] Filtre projetos por categoria

**Como testar no console:**
```javascript
const projeto = { id: '123', nome: 'Teste' };
TagsECategorias.adicionarAoProjeto(projeto, 'Cozinha', ['urgente', 'premium']);
console.log('Badges:', TagsECategorias.renderizarBadges(projeto));
```

---

### ✅ 6. HISTÓRICO (UNDO/REDO)
- [ ] Faça uma alteração (ex: criar projeto)
- [ ] Pressione **Ctrl+Z** para desfazer
- [ ] Confirme que voltou ao estado anterior
- [ ] Pressione **Ctrl+Y** para refazer
- [ ] Confirme que refez a ação

**Como testar no console:**
```javascript
// Salvar estado
Historico.salvarEstado('Teste de histórico');

// Fazer uma mudança em BancoClientes
window.BancoClientes.teste = 'valor teste';

// Salvar novo estado
Historico.salvarEstado('Após mudança');

// Desfazer
Historico.desfazer();
console.log('Teste existe?', window.BancoClientes.teste); // undefined

// Refazer
Historico.refazer();
console.log('Teste existe?', window.BancoClientes.teste); // 'valor teste'
```

---

### ✅ 7. SENHA DE ACESSO
- [ ] Configure uma senha
- [ ] Feche e reabra o navegador
- [ ] Digite a senha correta
- [ ] Entre no sistema
- [ ] Teste bloqueio manual
- [ ] Aguarde 10 min para auto-bloqueio (opcional)

**Como testar no console:**
```javascript
// Abrir configuração
SenhaAcesso.mostrarConfiguracao();

// Verificar se tem senha
console.log('Tem senha:', SenhaAcesso.temSenha());

// Bloquear manualmente
SenhaAcesso.bloquear();
```

---

### ✅ 8. DARK MODE
- [ ] Clique no botão 🌙 no header
- [ ] Veja o tema mudar para escuro
- [ ] Clique novamente (deve virar ☀️)
- [ ] Veja o tema voltar ao claro
- [ ] Feche e reabra - deve manter preferência

**Como testar no console:**
```javascript
// Alternar
DarkMode.toggle();

// Forçar dark
DarkMode.enable();

// Forçar light
DarkMode.disable();
```

---

### ✅ 9. SISTEMA DE LOADING
- [ ] Ao salvar, veja o loading aparecer
- [ ] Ao exportar, veja o loading
- [ ] Ao deletar, veja o loading
- [ ] Confirme que esconde após operação

**Como testar no console:**
```javascript
// Mostrar loading por 3 segundos
LoadingSystem.show('Testando loading...');
setTimeout(() => LoadingSystem.hide(), 3000);
```

---

### ✅ 10. NOTIFICAÇÕES TOAST
- [ ] Veja toast de sucesso (verde)
- [ ] Veja toast de erro (vermelho)
- [ ] Veja toast de aviso (amarelo)
- [ ] Veja toast de info (azul)
- [ ] Confirme que desaparece após 3s

**Como testar no console:**
```javascript
Toast.show('✅ Sucesso!', 'success');
Toast.show('❌ Erro!', 'error');
Toast.show('⚠️ Aviso!', 'warning');
Toast.show('ℹ️ Info!', 'info');
```

---

### ✅ 11. CONFIRMAÇÕES
- [ ] Tente deletar um projeto
- [ ] Veja o modal de confirmação
- [ ] Teste "Cancelar" - não deve deletar
- [ ] Teste "Confirmar" - deve deletar

**Como testar no console:**
```javascript
ConfirmDialog.show({
    title: 'Teste',
    message: 'Isso é um teste de confirmação',
    type: 'warning'
}).then(confirmado => {
    console.log('Confirmado:', confirmado);
});
```

---

### ✅ 12. VALIDAÇÕES
- [ ] Tente salvar formulário vazio
- [ ] Veja mensagem de erro
- [ ] Preencha os campos
- [ ] Salve novamente
- [ ] Deve funcionar

**Como testar no console:**
```javascript
const validacao = validarFormulario(
    { nome: '', email: 'invalido' },
    {
        nome: { required: true, label: 'Nome' },
        email: { required: true, type: 'email', label: 'Email' }
    }
);
console.log('Validação:', validacao);
```

---

### ✅ 13. FORMATADORES
- [ ] Veja valores em Real (R$)
- [ ] Veja datas formatadas
- [ ] Veja telefones formatados

**Como testar no console:**
```javascript
console.log('Moeda:', Formatter.currency(1500));
console.log('Data:', Formatter.date(new Date()));
console.log('Telefone:', Formatter.phone('11999999999'));
console.log('Número:', Formatter.number(1234.56, 2));
```

---

### ✅ 14. ATALHOS DE TECLADO
- [ ] Teste **Ctrl+K** (Busca)
- [ ] Teste **Ctrl+S** (Salvar)
- [ ] Teste **Ctrl+E** (Exportar)
- [ ] Teste **Ctrl+Z** (Desfazer)
- [ ] Teste **Ctrl+Y** (Refazer)
- [ ] Teste **ESC** (Fechar modal)

---

## 🔍 TESTE COMPLETO DO SISTEMA

### Execute no console (F12):

```javascript
console.clear();
console.log('╔═══════════════════════════════════════╗');
console.log('║  TESTE COMPLETO - MARCENARIA PRO     ║');
console.log('╚═══════════════════════════════════════╝');
console.log('');

// 1. Verificar carregamento
console.group('📦 1. COMPONENTES CARREGADOS');
console.log('✅ LoadingSystem:', typeof LoadingSystem);
console.log('✅ Toast:', typeof Toast);
console.log('✅ ConfirmDialog:', typeof ConfirmDialog);
console.log('✅ DarkMode:', typeof DarkMode);
console.log('✅ Validator:', typeof Validator);
console.log('✅ Sanitizer:', typeof Sanitizer);
console.log('✅ Formatter:', typeof Formatter);
console.log('✅ Utils:', typeof Utils);
console.log('✅ BuscaGlobal:', typeof BuscaGlobal);
console.log('✅ Dashboard:', typeof Dashboard);
console.log('✅ DuplicarProjeto:', typeof DuplicarProjeto);
console.log('✅ ControlePagamentos:', typeof ControlePagamentos);
console.log('✅ TagsECategorias:', typeof TagsECategorias);
console.log('✅ Historico:', typeof Historico);
console.log('✅ SenhaAcesso:', typeof SenhaAcesso);
console.groupEnd();

// 2. Testar Formatadores
console.group('💅 2. FORMATADORES');
console.log('Moeda:', Formatter.currency(1500));
console.log('Data:', Formatter.date(new Date()));
console.log('Telefone:', Formatter.phone('11999999999'));
console.log('Número:', Formatter.number(1234.56, 2));
console.groupEnd();

// 3. Testar Dashboard
console.group('📊 3. DASHBOARD');
const dashData = Dashboard.calcular();
console.log('Total Clientes:', dashData.totalClientes);
console.log('Total Projetos:', dashData.totalProjetos);
console.log('Valor Total:', Formatter.currency(dashData.valorTotal));
console.log('Ticket Médio:', Formatter.currency(dashData.valorMedio));
console.groupEnd();

// 4. Testar Senha
console.group('🔐 4. SENHA');
console.log('Tem senha configurada:', SenhaAcesso.temSenha());
console.log('Está bloqueado:', SenhaAcesso.estaBloqueado());
console.groupEnd();

// 5. Testar Histórico
console.group('↩️ 5. HISTÓRICO');
console.log('Total de ações:', Historico.acoes.length);
console.log('Posição atual:', Historico.posicao);
console.groupEnd();

// 6. Dark Mode
console.group('🌙 6. DARK MODE');
console.log('Dark Mode ativo:', document.documentElement.hasAttribute('data-theme'));
console.groupEnd();

console.log('');
console.log('╔═══════════════════════════════════════╗');
console.log('║  ✅ TESTE CONCLUÍDO!                  ║');
console.log('╚═══════════════════════════════════════╝');
console.log('');
console.log('💡 Dicas:');
console.log('  - Pressione Ctrl+K para busca');
console.log('  - Pressione Ctrl+Z para desfazer');
console.log('  - Configure senha: SenhaAcesso.mostrarConfiguracao()');
console.log('  - Ver dashboard: Dashboard.exibir()');
```

---

## 📋 CHECKLIST FINAL

Marque conforme testa:

### Funcionalidades Básicas
- [ ] Sistema abre sem erros
- [ ] Console não mostra erros (F12)
- [ ] Todos os arquivos carregados
- [ ] Interface aparece corretamente

### Utilitários
- [ ] Loading funciona
- [ ] Toast funciona
- [ ] Confirmações funcionam
- [ ] Validações funcionam
- [ ] Formatadores funcionam

### Features Avançadas
- [ ] Busca Global funciona
- [ ] Dashboard mostra dados corretos
- [ ] Duplicar projeto funciona
- [ ] Pagamentos funcionam
- [ ] Tags/Categorias funcionam
- [ ] Histórico funciona (Ctrl+Z/Y)
- [ ] Senha funciona
- [ ] Dark Mode funciona

### Atalhos
- [ ] Ctrl+K abre busca
- [ ] Ctrl+S salva
- [ ] Ctrl+Z desfaz
- [ ] Ctrl+Y refaz
- [ ] ESC fecha modais

### Mobile/Responsivo
- [ ] Funciona no celular
- [ ] Botões clicáveis
- [ ] Modais responsivos
- [ ] Toast aparece corretamente

---

## 🐛 PROBLEMAS COMUNS

### "Função não encontrada"
```javascript
// Verificar se arquivo foi carregado
console.log('features.js:', typeof BuscaGlobal);
// Se undefined, recarregue a página
```

### "Modal não abre"
```javascript
// Forçar abertura
BuscaGlobal.init();
BuscaGlobal.abrir();
```

### "Dark Mode não muda"
```javascript
// Forçar mudança
document.documentElement.setAttribute('data-theme', 'dark');
// ou
DarkMode.toggle();
```

### "Dados não salvam"
```javascript
// Salvar manualmente
salvarBancoClientes();
salvarAppData();
```

---

## ✅ TUDO FUNCIONANDO?

Se todos os testes passaram: **PARABÉNS! 🎉**

Seu sistema está completo com:
- ✅ 14+ funcionalidades novas
- ✅ 7+ atalhos de teclado
- ✅ Interface moderna
- ✅ Dark mode
- ✅ Proteção por senha
- ✅ Sistema de busca
- ✅ Dashboard profissional
- ✅ E muito mais!

---

**Divirta-se usando o sistema! 🚀**

*Qualquer problema, abra o console (F12) e execute os comandos de teste acima.*
