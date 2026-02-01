# 🚀 FUNCIONALIDADES EXTRAS PREMIUM - Marcenaria PRO
**Versão 2026.4.0** | Funcionalidades Avançadas Complementares

---

## 📋 ÍNDICE
1. [Calculadora Integrada](#calculadora)
2. [Gráficos e Relatórios](#graficos)
3. [Modo Apresentação](#apresentacao)
4. [Comparar Orçamentos](#comparar)
5. [Exportar WhatsApp](#whatsapp)
6. [Notas e Comentários](#notas)
7. [Lembretes e Alertas](#lembretes)
8. [Backup Completo](#backup)

---

## 🔢 1. CALCULADORA INTEGRADA {#calculadora}

### Descrição
Calculadora moderna com operações básicas integrada ao sistema.

### Atalho
- **Ctrl + Q** - Abrir calculadora

### Funcionalidades
- ✅ Operações básicas (+, -, ×, ÷)
- ✅ Display com histórico
- ✅ Copiar resultado
- ✅ Colar direto em campos de entrada
- ✅ Interface moderna com animações

### Como Usar no Console
```javascript
// Abrir calculadora
Calculadora.abrir();

// Fechar calculadora
Calculadora.fechar();

// Copiar resultado atual
Calculadora.copiarResultado();

// Colar em input focado
Calculadora.colarEmInput();
```

### Exemplo Prático
```javascript
// 1. Pressione Ctrl+Q
// 2. Digite: 1500 + 850 + 320
// 3. Clique em =
// 4. Clique em "Colar em Input"
// 5. O valor será inserido no campo ativo
```

---

## 📊 2. GRÁFICOS E RELATÓRIOS {#graficos}

### Descrição
Visualização de dados com gráficos de barras e relatórios completos.

### Funcionalidades
- 📅 Gráfico de projetos por mês
- 💰 Gráfico de faturamento por categoria
- 📈 Estatísticas detalhadas
- 🖨️ Impressão de relatórios
- 📄 Exportação para PDF

### Como Usar no Console
```javascript
// Mostrar relatório completo com gráficos
Graficos.exibirRelatorioCompleto();

// Gerar dados de projetos por mês
const projetosPorMes = Graficos.gerarGraficoProjetosPorMes();
console.log(projetosPorMes);

// Gerar dados de valores por categoria
const valoresPorCategoria = Graficos.gerarGraficoValoresPorCategoria();
console.log(valoresPorCategoria);

// Exportar relatório em PDF
Graficos.exportarRelatorioPDF();
```

### Exemplo de Dados Retornados
```javascript
// Projetos por mês
{
  "Jan": 5,
  "Fev": 8,
  "Mar": 12,
  // ...
}

// Valores por categoria
{
  "Cozinha": "R$ 45.000,00",
  "Quarto": "R$ 28.500,00",
  "Sala": "R$ 32.000,00"
}
```

---

## 🎬 3. MODO APRESENTAÇÃO {#apresentacao}

### Descrição
Exibe o projeto em tela cheia com design profissional para apresentar ao cliente.

### Funcionalidades
- 🖥️ Tela cheia com design premium
- 📋 Informações destacadas (cliente, data, valor)
- 📦 Lista de peças formatada
- 🎨 Gradientes e efeitos visuais
- ✕ Botão de fechar estilizado

### Como Usar no Console
```javascript
// Ativar modo apresentação
// Você precisa do objeto do projeto
const cliente = BancoClientes['cliente123'];
const projeto = cliente.projetos[0];
ModoApresentacao.ativar(projeto);
```

### Integração com Botão
```html
<button onclick="ModoApresentacao.ativar(projeto)">
    🎬 Apresentar ao Cliente
</button>
```

---

## ⚖️ 4. COMPARAR ORÇAMENTOS {#comparar}

### Descrição
Compare dois projetos/orçamentos lado a lado para análise de diferenças.

### Funcionalidades
- ⚖️ Comparação visual lado a lado
- 💰 Diferença em valor e percentual
- 📊 Comparação de número de peças
- 🎨 Cards coloridos para cada projeto

### Como Usar no Console
```javascript
// Abrir seletor de projetos
CompararOrcamentos.selecionarParaComparar();

// Comparar diretamente (se souber os IDs)
CompararOrcamentos.comparar('projeto1_id', 'projeto2_id');
```

### Exemplo Prático
```javascript
// 1. Execute:
CompararOrcamentos.selecionarParaComparar();

// 2. Selecione 2 projetos na interface
// 3. Clique em "Comparar"
// 4. Veja a diferença de valores e detalhes
```

---

## 📱 5. EXPORTAR PARA WHATSAPP {#whatsapp}

### Descrição
Envia orçamento formatado direto para o WhatsApp do cliente.

### Funcionalidades
- 📱 Abertura automática do WhatsApp
- ✉️ Mensagem pré-formatada
- 📋 Inclui nome, peças e valor
- 📞 Pode especificar número ou escolher contato

### Como Usar no Console
```javascript
// Mostrar modal com campo de telefone
ExportarWhatsApp.mostrarModal('clienteId', 'projetoId');

// Enviar direto (sem número = abre WhatsApp Web)
ExportarWhatsApp.enviar('clienteId', 'projetoId');

// Enviar para número específico
ExportarWhatsApp.enviar('clienteId', 'projetoId', '11999998888');

// Gerar apenas a mensagem (sem enviar)
const projeto = BancoClientes['cliente123'].projetos[0];
const mensagem = ExportarWhatsApp.gerarMensagem(projeto);
console.log(mensagem);
```

### Formato da Mensagem
```
*📋 ORÇAMENTO - COZINHA PLANEJADA*

*Cliente:* João Silva
*Data:* 15/01/2026

*📦 PEÇAS (10)*
1. Base 80cm - 2x
   800x600mm
2. Armário Aéreo - 4x
   1200x400mm
   ... e mais 4 peças

*💰 VALOR TOTAL: R$ 12.500,00*

_Obrigado pela preferência!_
```

---

## 📝 6. NOTAS E COMENTÁRIOS {#notas}

### Descrição
Adicione notas e comentários aos projetos para registro interno.

### Funcionalidades
- 📝 Notas ilimitadas por projeto
- 🕐 Data/hora automática
- 👤 Identificação do autor
- 📚 Histórico completo
- 🔍 Fácil visualização

### Como Usar no Console
```javascript
// Mostrar modal de notas
NotasProjeto.mostrarModal('clienteId', 'projetoId');

// Adicionar nota programaticamente
NotasProjeto.adicionar('clienteId', 'projetoId', 'Cliente solicitou alteração na cor');

// Listar todas as notas
const notas = NotasProjeto.listar('clienteId', 'projetoId');
console.log(notas);
```

### Estrutura da Nota
```javascript
{
  id: "nota_1738012345678",
  texto: "Cliente pediu alteração na gaveta",
  data: "2026-01-27T14:30:00.000Z",
  autor: "Usuário"
}
```

### Exemplo de Fluxo
```javascript
// 1. Abrir notas de um projeto
NotasProjeto.mostrarModal('cliente_abc', 'projeto_123');

// 2. Digitar no textarea: "Cliente confirmou a cor branco neve"
// 3. Clicar em "Adicionar Nota"
// 4. Nota aparece no histórico com data/hora
```

---

## 🔔 7. LEMBRETES E ALERTAS {#lembretes}

### Descrição
Sistema automático de lembretes para projetos antigos e pagamentos pendentes.

### Funcionalidades
- ⏰ Alerta de projetos sem atualização há 7+ dias
- 💰 Alerta de pagamentos pendentes
- 🔔 Notificação ao abrir o sistema
- 📋 Lista completa de pendências

### Como Usar no Console
```javascript
// Mostrar todos os lembretes
Lembretes.mostrarAlertas();

// Verificar pendências (retorna array)
const alertas = Lembretes.verificarPendencias();
console.log(alertas);
console.log(`Total de pendências: ${alertas.length}`);
```

### Tipos de Alertas
```javascript
// 1. Projeto antigo (7+ dias sem atualização)
{
  tipo: 'antigo',
  titulo: 'Projeto antigo: Cozinha Moderna',
  descricao: 'Sem atualização desde 10/01/2026',
  icone: '⏰'
}

// 2. Pagamento pendente
{
  tipo: 'pagamento',
  titulo: 'Pagamento pendente: Armário Quarto',
  descricao: 'Valor: R$ 8.500,00',
  icone: '💰'
}
```

### Verificação Automática
O sistema verifica automaticamente ao iniciar e mostra badge se houver pendências.

---

## 💾 8. BACKUP COMPLETO {#backup}

### Descrição
Exporta e importa TODOS os dados do sistema (clientes, projetos, catálogo, configurações).

### Funcionalidades
- 💾 Exportação completa em JSON
- 📥 Importação com confirmação
- 🔐 Inclui configurações (dark mode, senha, etc.)
- 📅 Timestamp automático
- ⚠️ Confirmação antes de restaurar

### Como Usar no Console
```javascript
// EXPORTAR backup completo
BackupCompleto.exportar();
// Baixa arquivo: backup_completo_1738012345678.json

// IMPORTAR backup completo
BackupCompleto.importar();
// Abre seletor de arquivo
```

### Estrutura do Backup
```javascript
{
  "versao": "2026.4.0",
  "timestamp": "2026-01-27T14:30:00.000Z",
  "clientes": {
    // Todo BancoClientes
  },
  "catalogo": {
    // Todo AppData
  },
  "configuracoes": {
    "darkMode": true,
    "senha": "hash_da_senha",
    "historico": []
  }
}
```

### ⚠️ IMPORTANTE
- O backup SUBSTITUI todos os dados atuais
- Sempre confirme antes de importar
- Faça backups regulares (semanalmente recomendado)
- O arquivo é em formato JSON (pode abrir e editar)

---

## 🎯 GUIA RÁPIDO DE USO

### Fluxo Típico de Trabalho

```javascript
// 1️⃣ INÍCIO DO DIA
Lembretes.mostrarAlertas(); // Ver o que precisa atenção

// 2️⃣ CRIANDO ORÇAMENTO
// Pressionar Ctrl+Q para calcular valores
Calculadora.abrir();
// Colar valores calculados nos campos

// 3️⃣ APRESENTANDO AO CLIENTE
const projeto = BancoClientes['cliente123'].projetos[0];
ModoApresentacao.ativar(projeto); // Tela cheia profissional

// 4️⃣ ENVIANDO ORÇAMENTO
ExportarWhatsApp.mostrarModal('cliente123', 'projeto1');

// 5️⃣ REGISTRANDO ACOMPANHAMENTO
NotasProjeto.mostrarModal('cliente123', 'projeto1');
// Adicionar: "Cliente aprovou, aguardando sinal"

// 6️⃣ FIM DO DIA - ANÁLISE
Graficos.exibirRelatorioCompleto(); // Ver performance do mês

// 7️⃣ BACKUP SEMANAL (Sexta-feira)
BackupCompleto.exportar(); // Salvar tudo
```

---

## 🔗 INTEGRAÇÃO COM O SISTEMA

### Adicionando Botões à Interface

```html
<!-- No painel de controle de cada projeto -->
<div class="projeto-acoes">
    <!-- Calculadora -->
    <button onclick="Calculadora.abrir()" title="Ctrl+Q">
        🔢 Calculadora
    </button>
    
    <!-- Apresentação -->
    <button onclick="ModoApresentacao.ativar(projeto)">
        🎬 Apresentar
    </button>
    
    <!-- WhatsApp -->
    <button onclick="ExportarWhatsApp.mostrarModal(clienteId, projetoId)">
        📱 WhatsApp
    </button>
    
    <!-- Notas -->
    <button onclick="NotasProjeto.mostrarModal(clienteId, projetoId)">
        📝 Notas
    </button>
</div>

<!-- No menu principal -->
<div class="menu-principal">
    <button onclick="Graficos.exibirRelatorioCompleto()">
        📊 Relatórios
    </button>
    
    <button onclick="CompararOrcamentos.selecionarParaComparar()">
        ⚖️ Comparar
    </button>
    
    <button onclick="Lembretes.mostrarAlertas()">
        🔔 Lembretes
    </button>
    
    <button onclick="BackupCompleto.exportar()">
        💾 Backup
    </button>
</div>
```

---

## 🎨 PERSONALIZAÇÃO

### Customizar Cores da Calculadora
```css
.calc-btn.calc-op {
    background: linear-gradient(135deg, #seu-tom-1, #seu-tom-2);
}
```

### Customizar Gráficos
```javascript
// Editar cores das barras em extras.js
.barra {
    background: linear-gradient(180deg, #sua-cor-1, #sua-cor-2);
}
```

---

## 📱 ATALHOS DE TECLADO

| Atalho | Funcionalidade |
|--------|----------------|
| **Ctrl+Q** | Abrir Calculadora |
| **ESC** | Fechar modais |

---

## ❓ FAQ - PERGUNTAS FREQUENTES

### Como adicionar mais categorias aos gráficos?
As categorias vêm do sistema principal (TagsECategorias). Adicione novas categorias lá.

### A calculadora suporta funções científicas?
A versão atual tem operações básicas. Pode ser expandida para incluir mais funções.

### Posso personalizar a mensagem do WhatsApp?
Sim! Edite a função `gerarMensagem()` em `ExportarWhatsApp` no arquivo extras.js.

### Como agendar backup automático?
Por enquanto é manual. Crie um lembrete semanal ou implemente com um cron job.

### Quantas notas posso adicionar por projeto?
Ilimitadas! Todas são salvas no localStorage.

---

## 🐛 RESOLUÇÃO DE PROBLEMAS

### Calculadora não abre com Ctrl+Q
```javascript
// Verificar se foi inicializada
console.log(typeof Calculadora); // deve ser 'object'

// Reinicializar
Calculadora.init();
```

### Gráficos não aparecem
```javascript
// Verificar se há projetos
console.log(Object.keys(BancoClientes).length);

// Gerar dados manualmente
const dados = Graficos.gerarGraficoProjetosPorMes();
console.log(dados);
```

### WhatsApp não abre
- Verifique se o popup não foi bloqueado
- Tente em uma aba anônima
- Verifique a formatação do telefone (só números)

### Backup não restaura
```javascript
// Verificar estrutura do arquivo JSON
// Deve ter: versao, timestamp, clientes, catalogo, configuracoes
```

---

## 📊 ESTATÍSTICAS DE USO

```javascript
// Ver quantas notas foram criadas
let totalNotas = 0;
Object.values(BancoClientes).forEach(cliente => {
    cliente.projetos?.forEach(p => {
        totalNotas += (p.notas?.length || 0);
    });
});
console.log(`Total de notas: ${totalNotas}`);

// Ver alertas ativos
const alertas = Lembretes.verificarPendencias();
console.log(`Alertas ativos: ${alertas.length}`);
```

---

## 🎓 EXEMPLOS AVANÇADOS

### Automatizar Envio de WhatsApp para Múltiplos Clientes
```javascript
// Enviar orçamento para vários clientes
const clientesParaEnviar = ['cliente1', 'cliente2', 'cliente3'];

clientesParaEnviar.forEach(clienteId => {
    const cliente = BancoClientes[clienteId];
    const ultimoProjeto = cliente.projetos[cliente.projetos.length - 1];
    
    // Gerar mensagem
    const mensagem = ExportarWhatsApp.gerarMensagem(ultimoProjeto);
    console.log(`Cliente: ${cliente.nome}`);
    console.log(mensagem);
    console.log('---');
});
```

### Relatório Personalizado
```javascript
// Criar relatório customizado
const projetosPorCategoria = {};
Object.values(BancoClientes).forEach(cliente => {
    cliente.projetos?.forEach(p => {
        const cat = p.metadata?.categoria || 'Sem Categoria';
        if (!projetosPorCategoria[cat]) {
            projetosPorCategoria[cat] = [];
        }
        projetosPorCategoria[cat].push({
            nome: p.nome,
            cliente: p.nomeCliente,
            valor: p.orcamento
        });
    });
});

console.table(projetosPorCategoria);
```

---

## 🚀 PRÓXIMAS MELHORIAS SUGERIDAS

- [ ] Calculadora científica
- [ ] Mais tipos de gráficos (pizza, linha)
- [ ] Integração com Google Calendar
- [ ] QR Code do orçamento
- [ ] Assinatura digital
- [ ] Multi-idioma
- [ ] Modo offline (PWA)
- [ ] Sincronização em nuvem

---

## 📞 SUPORTE

Para dúvidas ou sugestões sobre as funcionalidades extras, consulte:
- GUIA-COMPLETO.md (funcionalidades principais)
- TESTE-CHECKLIST.md (como testar tudo)
- Console do navegador (F12) para logs e testes

**Versão:** 2026.4.0  
**Última Atualização:** 27/01/2026
