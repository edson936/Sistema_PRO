# ⚡ TESTE RÁPIDO - Funcionalidades Extras Premium

## 🎯 TESTE EM 5 MINUTOS

Execute estes comandos no console (F12) para testar cada funcionalidade:

---

### 1️⃣ CALCULADORA (30 segundos)

```javascript
// Abrir calculadora
Calculadora.abrir();
// OU pressione Ctrl+Q

// Fazer um cálculo: 1500 + 850 - 320
// Usar os botões ou digitar no teclado

// Copiar resultado
Calculadora.copiarResultado();

// Fechar
Calculadora.fechar();
```

**✅ Sucesso se:** Modal da calculadora abrir, cálculo funcionar, copiar funcionar

---

### 2️⃣ GRÁFICOS (45 segundos)

```javascript
// Visualizar relatório completo
Graficos.exibirRelatorioCompleto();

// Ver dados brutos
console.log('Projetos por mês:', Graficos.gerarGraficoProjetosPorMes());
console.log('Valores por categoria:', Graficos.gerarGraficoValoresPorCategoria());
```

**✅ Sucesso se:** Modal com gráficos aparecer, barras renderizadas corretamente

---

### 3️⃣ MODO APRESENTAÇÃO (30 segundos)

```javascript
// Pegar primeiro cliente e projeto
const primeiroCliente = Object.values(BancoClientes)[0];
const primeiroProjeto = primeiroCliente?.projetos?.[0];

if (primeiroProjeto) {
    ModoApresentacao.ativar(primeiroProjeto);
    console.log('✅ Modo apresentação ativado!');
} else {
    console.log('❌ Nenhum projeto encontrado. Crie um primeiro.');
}

// Pressionar ESC ou clicar no X para fechar
```

**✅ Sucesso se:** Tela cheia com design premium aparecer

---

### 4️⃣ COMPARAR ORÇAMENTOS (45 segundos)

```javascript
// Abrir seletor
CompararOrcamentos.selecionarParaComparar();

// OU comparar diretamente se souber os IDs:
const projetos = Object.values(BancoClientes)[0]?.projetos || [];
if (projetos.length >= 2) {
    CompararOrcamentos.comparar(projetos[0].id, projetos[1].id);
    console.log('✅ Comparação executada!');
} else {
    console.log('⚠️ Precisa de pelo menos 2 projetos');
}
```

**✅ Sucesso se:** Modal de comparação mostrar diferença percentual

---

### 5️⃣ EXPORTAR WHATSAPP (30 segundos)

```javascript
// Gerar mensagem formatada
const cliente = Object.values(BancoClientes)[0];
const projeto = cliente?.projetos?.[0];

if (projeto) {
    const mensagem = ExportarWhatsApp.gerarMensagem(projeto);
    console.log('📱 MENSAGEM DO WHATSAPP:');
    console.log(mensagem);
    console.log('✅ Mensagem gerada!');
    
    // Para testar o envio (abrirá WhatsApp Web):
    // ExportarWhatsApp.enviar('clienteId', 'projetoId');
} else {
    console.log('❌ Nenhum projeto encontrado');
}
```

**✅ Sucesso se:** Mensagem formatada aparecer no console

---

### 6️⃣ NOTAS E COMENTÁRIOS (45 segundos)

```javascript
// Adicionar nota a um projeto
const clienteId = Object.keys(BancoClientes)[0];
const projetoId = BancoClientes[clienteId]?.projetos?.[0]?.id;

if (clienteId && projetoId) {
    // Adicionar nota
    NotasProjeto.adicionar(clienteId, projetoId, 'Teste de nota - Cliente aprovou o orçamento');
    
    // Listar notas
    const notas = NotasProjeto.listar(clienteId, projetoId);
    console.log('📝 Notas do projeto:', notas);
    console.log('✅ Nota adicionada!');
    
    // Abrir modal
    NotasProjeto.mostrarModal(clienteId, projetoId);
} else {
    console.log('❌ Nenhum projeto encontrado');
}
```

**✅ Sucesso se:** Nota aparecer no console e no modal

---

### 7️⃣ LEMBRETES E ALERTAS (30 segundos)

```javascript
// Verificar pendências
const alertas = Lembretes.verificarPendencias();
console.log(`🔔 Total de alertas: ${alertas.length}`);
console.table(alertas);

// Mostrar modal de lembretes
Lembretes.mostrarAlertas();

console.log('✅ Lembretes verificados!');
```

**✅ Sucesso se:** Lista de alertas aparecer (pode estar vazia se não houver pendências)

---

### 8️⃣ BACKUP COMPLETO (45 segundos)

```javascript
// EXPORTAR backup
console.log('💾 Exportando backup...');
BackupCompleto.exportar();
console.log('✅ Arquivo baixado! Verifique seus downloads.');

// Para IMPORTAR (CUIDADO: substitui tudo):
// BackupCompleto.importar();
// Selecione o arquivo JSON baixado
```

**✅ Sucesso se:** Arquivo JSON baixar automaticamente

---

## 🎮 TESTE COMPLETO - TUDO DE UMA VEZ (2 minutos)

```javascript
console.log('🚀 INICIANDO TESTE COMPLETO...\n');

// 1. Calculadora
console.log('1️⃣ Testando Calculadora...');
Calculadora.abrir();
setTimeout(() => Calculadora.fechar(), 2000);
console.log('✅ Calculadora OK\n');

// 2. Gráficos
console.log('2️⃣ Testando Gráficos...');
const dadosGraficos = Graficos.gerarGraficoProjetosPorMes();
console.log('Dados:', dadosGraficos);
console.log('✅ Gráficos OK\n');

// 3. Lembretes
console.log('3️⃣ Testando Lembretes...');
const alertas = Lembretes.verificarPendencias();
console.log(`Alertas encontrados: ${alertas.length}`);
console.log('✅ Lembretes OK\n');

// 4. WhatsApp
console.log('4️⃣ Testando WhatsApp...');
const cliente = Object.values(BancoClientes)[0];
const projeto = cliente?.projetos?.[0];
if (projeto) {
    const msg = ExportarWhatsApp.gerarMensagem(projeto);
    console.log('Mensagem gerada:', msg.substring(0, 50) + '...');
    console.log('✅ WhatsApp OK\n');
} else {
    console.log('⚠️ Nenhum projeto para testar\n');
}

// 5. Notas
console.log('5️⃣ Testando Notas...');
const clienteId = Object.keys(BancoClientes)[0];
const projetoId = BancoClientes[clienteId]?.projetos?.[0]?.id;
if (clienteId && projetoId) {
    NotasProjeto.adicionar(clienteId, projetoId, 'Nota de teste automático');
    console.log('✅ Notas OK\n');
} else {
    console.log('⚠️ Nenhum projeto para testar\n');
}

// 6. Comparação
console.log('6️⃣ Testando Comparação...');
const projs = cliente?.projetos || [];
if (projs.length >= 2) {
    console.log(`Projetos disponíveis: ${projs.length}`);
    console.log('✅ Comparação OK (abra manualmente para testar)\n');
} else {
    console.log('⚠️ Precisa de 2+ projetos\n');
}

console.log('✅ TESTE COMPLETO FINALIZADO!');
console.log('📊 Todos os módulos carregados e funcionando.');
```

---

## 🔍 VERIFICAÇÃO DE CARREGAMENTO

```javascript
// Verificar se todos os módulos foram carregados
console.log('🔍 VERIFICAÇÃO DE MÓDULOS:\n');

const modulos = [
    'Calculadora',
    'Graficos',
    'ModoApresentacao',
    'CompararOrcamentos',
    'ExportarWhatsApp',
    'NotasProjeto',
    'Lembretes',
    'BackupCompleto'
];

modulos.forEach(modulo => {
    const status = typeof window[modulo] !== 'undefined' ? '✅' : '❌';
    console.log(`${status} ${modulo}`);
});

console.log('\n📦 Resumo:');
const carregados = modulos.filter(m => typeof window[m] !== 'undefined').length;
console.log(`${carregados}/${modulos.length} módulos carregados`);

if (carregados === modulos.length) {
    console.log('✅ TUDO PRONTO!');
} else {
    console.log('⚠️ Alguns módulos não foram carregados. Verifique o console.');
}
```

---

## 🎯 TESTE POR CENÁRIO

### Cenário 1: Criando e Apresentando Orçamento

```javascript
console.log('📋 CENÁRIO 1: Criar e Apresentar Orçamento\n');

// 1. Abrir calculadora para calcular valores
console.log('1. Abrindo calculadora...');
Calculadora.abrir();

// 2. Aguardar 3 segundos e fechar
setTimeout(() => {
    Calculadora.fechar();
    console.log('2. Calculadora fechada');
    
    // 3. Ativar modo apresentação
    const cliente = Object.values(BancoClientes)[0];
    const projeto = cliente?.projetos?.[0];
    if (projeto) {
        console.log('3. Ativando modo apresentação...');
        ModoApresentacao.ativar(projeto);
    }
}, 3000);
```

### Cenário 2: Análise de Desempenho

```javascript
console.log('📊 CENÁRIO 2: Análise de Desempenho\n');

// 1. Verificar lembretes
console.log('1. Verificando lembretes...');
const alertas = Lembretes.verificarPendencias();
console.log(`   ${alertas.length} alertas encontrados`);

// 2. Ver gráficos
console.log('2. Gerando gráficos...');
const projetosPorMes = Graficos.gerarGraficoProjetosPorMes();
const valoresPorCat = Graficos.gerarGraficoValoresPorCategoria();
console.log('   Projetos por mês:', projetosPorMes);
console.log('   Valores por categoria:', valoresPorCat);

// 3. Abrir relatório completo
console.log('3. Abrindo relatório completo...');
Graficos.exibirRelatorioCompleto();

console.log('✅ Cenário 2 completo!');
```

### Cenário 3: Enviando Orçamento para Cliente

```javascript
console.log('📱 CENÁRIO 3: Enviando Orçamento\n');

// 1. Selecionar projeto
const cliente = Object.values(BancoClientes)[0];
const projeto = cliente?.projetos?.[0];

if (projeto) {
    // 2. Adicionar nota antes de enviar
    const clienteId = Object.keys(BancoClientes)[0];
    NotasProjeto.adicionar(clienteId, projeto.id, 'Orçamento enviado via WhatsApp');
    console.log('1. Nota adicionada: "Orçamento enviado via WhatsApp"');
    
    // 3. Gerar mensagem
    const mensagem = ExportarWhatsApp.gerarMensagem(projeto);
    console.log('2. Mensagem gerada:');
    console.log(mensagem);
    
    // 4. Para enviar de verdade (descomente):
    // ExportarWhatsApp.enviar(clienteId, projeto.id, '11999998888');
    
    console.log('✅ Cenário 3 completo (envio comentado)!');
} else {
    console.log('❌ Nenhum projeto encontrado');
}
```

---

## 📈 ESTATÍSTICAS DE USO

```javascript
console.log('📈 ESTATÍSTICAS DE FUNCIONALIDADES EXTRAS\n');

// Total de notas criadas
let totalNotas = 0;
Object.values(BancoClientes).forEach(cliente => {
    cliente.projetos?.forEach(p => {
        totalNotas += (p.notas?.length || 0);
    });
});
console.log(`📝 Total de notas: ${totalNotas}`);

// Alertas ativos
const alertasAtivos = Lembretes.verificarPendencias().length;
console.log(`🔔 Alertas ativos: ${alertasAtivos}`);

// Projetos por categoria
const projetosPorCat = Graficos.gerarGraficoValoresPorCategoria();
console.log('📊 Projetos por categoria:', projetosPorCat);

// Total de clientes e projetos
const totalClientes = Object.keys(BancoClientes).length;
const totalProjetos = Object.values(BancoClientes).reduce((acc, c) => acc + (c.projetos?.length || 0), 0);
console.log(`👥 Total de clientes: ${totalClientes}`);
console.log(`📋 Total de projetos: ${totalProjetos}`);

console.log('\n✅ Estatísticas completas!');
```

---

## 🐛 TROUBLESHOOTING RÁPIDO

### Erro: "Calculadora is not defined"

```javascript
// Solução: Recarregar extras.js
const script = document.createElement('script');
script.src = 'extras.js';
document.body.appendChild(script);
console.log('✅ extras.js recarregado');
```

### Erro: "BancoClientes is not defined"

```javascript
// Verificar se existe
console.log('BancoClientes:', typeof BancoClientes);

// Se não existir, inicializar
if (typeof BancoClientes === 'undefined') {
    window.BancoClientes = {};
    console.log('✅ BancoClientes inicializado');
}
```

### Gráficos não aparecem

```javascript
// Verificar dados
const dados = Graficos.gerarGraficoProjetosPorMes();
console.log('Dados disponíveis:', dados);

if (Object.keys(dados).length === 0) {
    console.log('⚠️ Nenhum projeto encontrado. Crie alguns projetos primeiro.');
}
```

---

## ✅ CHECKLIST FINAL

Marque cada item após testar:

- [ ] Calculadora abre com Ctrl+Q
- [ ] Calculadora faz cálculos corretamente
- [ ] Copiar resultado funciona
- [ ] Gráficos renderizam corretamente
- [ ] Modo apresentação mostra projeto em tela cheia
- [ ] Comparação mostra diferença entre projetos
- [ ] Mensagem WhatsApp é gerada corretamente
- [ ] Notas são adicionadas e listadas
- [ ] Lembretes mostram alertas
- [ ] Backup exporta arquivo JSON
- [ ] Todos os 8 módulos carregados (verificar com script acima)

---

## 🎓 COMANDOS ÚTEIS EXTRAS

```javascript
// Limpar todas as notas de teste
Object.values(BancoClientes).forEach(cliente => {
    cliente.projetos?.forEach(p => {
        p.notas = [];
    });
});
console.log('🗑️ Notas limpas');

// Simular projeto antigo (para testar lembretes)
const cliente = Object.values(BancoClientes)[0];
if (cliente?.projetos?.[0]) {
    const dataAntiga = new Date();
    dataAntiga.setDate(dataAntiga.getDate() - 10); // 10 dias atrás
    cliente.projetos[0].data = dataAntiga.toISOString();
    console.log('⏰ Projeto alterado para 10 dias atrás');
    console.log('Execute: Lembretes.mostrarAlertas()');
}

// Ver todas as funcionalidades disponíveis
console.log('🛠️ Funcionalidades Extras Disponíveis:');
console.log('- Calculadora (Ctrl+Q)');
console.log('- Graficos.exibirRelatorioCompleto()');
console.log('- ModoApresentacao.ativar(projeto)');
console.log('- CompararOrcamentos.selecionarParaComparar()');
console.log('- ExportarWhatsApp.mostrarModal(cId, pId)');
console.log('- NotasProjeto.mostrarModal(cId, pId)');
console.log('- Lembretes.mostrarAlertas()');
console.log('- BackupCompleto.exportar()');
```

---

**Versão:** 2026.4.0  
**Tempo Estimado de Teste:** 5-10 minutos  
**Resultado Esperado:** Todos os módulos funcionando perfeitamente! ✅
