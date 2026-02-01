/**
 * EXEMPLOS DE INTEGRAÇÃO DAS MELHORIAS
 * Como usar as novas funcionalidades no seu código
 */

// ==================== EXEMPLO 1: DELETE COM CONFIRMAÇÃO ====================
// Adicione esta função ao seu index.html após carregar utils.js

// Função original melhorada
async function deletarProjetoSeguro(clienteId, projetoId) {
    // 1. Mostrar confirmação
    const confirmado = await ConfirmDialog.show({
        title: '⚠️ Deletar Projeto',
        message: 'Esta ação não pode ser desfeita. Tem certeza que deseja deletar este projeto?',
        confirmText: 'Sim, Deletar',
        cancelText: 'Cancelar',
        type: 'danger'
    });
    
    // 2. Se não confirmou, cancela
    if (!confirmado) {
        Toast.show('Operação cancelada', 'info');
        return;
    }
    
    // 3. Mostra loading
    LoadingSystem.show('Deletando projeto...');
    
    try {
        // 4. Aguarda um pouco para feedback visual
        await Utils.sleep(300);
        
        // 5. Executa a função original
        if (typeof window.deletarProjetoCliente === 'function') {
            window.deletarProjetoCliente(clienteId, projetoId);
        }
        
        // 6. Sucesso!
        Toast.show('✅ Projeto deletado com sucesso!', 'success');
    } catch (error) {
        // 7. Erro!
        console.error('Erro ao deletar:', error);
        Toast.show('❌ Erro ao deletar projeto', 'error');
    } finally {
        // 8. Sempre esconde o loading
        LoadingSystem.hide();
    }
}

// ==================== EXEMPLO 2: SALVAR COM VALIDAÇÃO ====================
async function salvarProjetoComValidacao() {
    // 1. Pegar dados do formulário
    const nomeCliente = document.getElementById('nomeCliente')?.value;
    const nomeProjeto = document.getElementById('nomeProjeto')?.value;
    
    // 2. Sanitizar inputs
    const dadosSanitizados = {
        nomeCliente: Sanitizer.sanitizeText(nomeCliente),
        nomeProjeto: Sanitizer.sanitizeText(nomeProjeto)
    };
    
    // 3. Validar
    const validacao = validarFormulario(dadosSanitizados, {
        nomeCliente: { 
            required: true, 
            label: 'Nome do Cliente' 
        },
        nomeProjeto: { 
            required: true, 
            label: 'Nome do Projeto' 
        }
    });
    
    // 4. Se inválido, mostrar erros
    if (!validacao.valid) {
        Toast.show(validacao.errors.join('<br>'), 'error');
        return;
    }
    
    // 5. Mostrar loading
    LoadingSystem.show('Salvando projeto...');
    
    try {
        // 6. Salvar (usar suas funções originais)
        // ... código de salvamento ...
        
        await Utils.sleep(500); // Simular salvamento
        
        // 7. Sucesso!
        Toast.show('✅ Projeto salvo com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao salvar:', error);
        Toast.show('❌ Erro ao salvar projeto', 'error');
    } finally {
        LoadingSystem.hide();
    }
}

// ==================== EXEMPLO 3: ADICIONAR PEÇA COM VALIDAÇÃO ====================
async function adicionarPecaComValidacao() {
    // 1. Coletar dados
    const altura = document.getElementById('alturaPeca')?.value;
    const largura = document.getElementById('larguraPeca')?.value;
    const quantidade = document.getElementById('qtdPeca')?.value;
    
    // 2. Sanitizar números
    const dados = {
        altura: Sanitizer.sanitizeNumber(altura, { min: 0, max: 5000 }),
        largura: Sanitizer.sanitizeNumber(largura, { min: 0, max: 5000 }),
        quantidade: Sanitizer.sanitizeNumber(quantidade, { min: 1, max: 1000 })
    };
    
    // 3. Validar
    const erros = [];
    
    if (dados.altura <= 0) {
        erros.push('Altura deve ser maior que zero');
    }
    
    if (dados.largura <= 0) {
        erros.push('Largura deve ser maior que zero');
    }
    
    if (dados.quantidade < 1) {
        erros.push('Quantidade deve ser pelo menos 1');
    }
    
    // 4. Mostrar erros se houver
    if (erros.length > 0) {
        Toast.show(erros.join('<br>'), 'warning');
        return;
    }
    
    // 5. Adicionar peça
    LoadingSystem.show('Adicionando peça...');
    
    try {
        // Usar função original do sistema
        // window.adicionarPecaAoProjeto(dados);
        
        await Utils.sleep(300);
        Toast.show('✅ Peça adicionada!', 'success');
    } catch (error) {
        console.error('Erro:', error);
        Toast.show('❌ Erro ao adicionar peça', 'error');
    } finally {
        LoadingSystem.hide();
    }
}

// ==================== EXEMPLO 4: EXPORTAR COM FEEDBACK ====================
async function exportarComFeedback(tipo) {
    LoadingSystem.show(`Exportando ${tipo}...`);
    
    try {
        await Utils.sleep(500);
        
        // Executar exportação original
        switch(tipo) {
            case 'PDF':
                if (typeof window.exportarPDFPlanoCorte === 'function') {
                    window.exportarPDFPlanoCorte();
                }
                break;
            case 'Excel':
                if (typeof window.exportarExcelPlanoCorte === 'function') {
                    window.exportarExcelPlanoCorte();
                }
                break;
            case 'JSON':
                if (typeof window.exportarBancoClientesJSON === 'function') {
                    window.exportarBancoClientesJSON();
                }
                break;
        }
        
        Toast.show(`✅ ${tipo} exportado com sucesso!`, 'success');
    } catch (error) {
        console.error('Erro na exportação:', error);
        Toast.show('❌ Erro ao exportar', 'error');
    } finally {
        LoadingSystem.hide();
    }
}

// ==================== EXEMPLO 5: BUSCA COM DEBOUNCE ====================
// Otimiza busca para não executar a cada letra digitada
const buscarProjetosDebounced = Utils.debounce(function(termo) {
    if (!termo || termo.length < 2) return;
    
    console.log('Buscando por:', termo);
    
    // Executar busca
    const projetos = Object.values(window.BancoClientes || {})
        .flatMap(c => c.projetos || [])
        .filter(p => 
            p.nome?.toLowerCase().includes(termo.toLowerCase()) ||
            p.nomeCliente?.toLowerCase().includes(termo.toLowerCase())
        );
    
    console.log('Encontrados:', projetos.length);
    Toast.show(`${projetos.length} projeto(s) encontrado(s)`, 'info');
    
    // Renderizar resultados...
}, 500); // Aguarda 500ms após parar de digitar

// Usar em um input:
// <input type="text" oninput="buscarProjetosDebounced(this.value)">

// ==================== EXEMPLO 6: COPIAR ORÇAMENTO ====================
async function copiarOrcamentoParaClipboard() {
    const orcamento = document.getElementById('orcamento-total')?.innerText;
    
    if (!orcamento) {
        Toast.show('Nenhum orçamento para copiar', 'warning');
        return;
    }
    
    const sucesso = await Utils.copyToClipboard(orcamento);
    
    if (sucesso) {
        Toast.show('✅ Orçamento copiado!', 'success');
    }
}

// ==================== EXEMPLO 7: FORMULÁRIO COMPLETO ====================
async function salvarClienteCompleto() {
    // 1. Coletar dados
    const formData = {
        nome: document.getElementById('nomeCliente')?.value,
        email: document.getElementById('emailCliente')?.value,
        telefone: document.getElementById('telefoneCliente')?.value
    };
    
    // 2. Sanitizar
    formData.nome = Sanitizer.sanitizeText(formData.nome);
    formData.email = Sanitizer.sanitizeText(formData.email);
    formData.telefone = Sanitizer.sanitizeText(formData.telefone);
    
    // 3. Validar
    const validacao = validarFormulario(formData, {
        nome: { 
            required: true, 
            label: 'Nome do Cliente' 
        },
        email: { 
            required: true, 
            type: 'email', 
            label: 'Email' 
        },
        telefone: { 
            required: true, 
            label: 'Telefone' 
        }
    });
    
    if (!validacao.valid) {
        Toast.show(validacao.errors.join('<br>'), 'error');
        return;
    }
    
    // 4. Validar telefone brasileiro
    const telValidacao = Validator.phone(formData.telefone);
    if (!telValidacao.valid) {
        Toast.show(telValidacao.message, 'warning');
        return;
    }
    
    // 5. Confirmar
    const confirmado = await ConfirmDialog.show({
        title: 'Salvar Cliente',
        message: `Deseja salvar o cliente ${formData.nome}?`,
        type: 'info'
    });
    
    if (!confirmado) return;
    
    // 6. Salvar
    LoadingSystem.show('Salvando cliente...');
    
    try {
        // Adicionar ao banco
        const clienteId = Utils.generateId();
        window.BancoClientes[clienteId] = {
            id: clienteId,
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            projetos: [],
            dataCadastro: new Date().toISOString()
        };
        
        // Salvar
        if (typeof window.salvarBancoClientes === 'function') {
            window.salvarBancoClientes();
        }
        
        await Utils.sleep(500);
        Toast.show('✅ Cliente salvo com sucesso!', 'success');
        
        // Limpar formulário
        document.getElementById('nomeCliente').value = '';
        document.getElementById('emailCliente').value = '';
        document.getElementById('telefoneCliente').value = '';
        
    } catch (error) {
        console.error('Erro ao salvar cliente:', error);
        Toast.show('❌ Erro ao salvar cliente', 'error');
    } finally {
        LoadingSystem.hide();
    }
}

// ==================== EXEMPLO 8: ATUALIZAR BOTÕES EXISTENTES ====================
// Execute este código para atualizar os botões existentes com as novas funcionalidades

function atualizarBotoesComMelhorias() {
    // Encontrar todos os botões de deletar
    const btnsDeletar = document.querySelectorAll('[onclick*="deletarProjeto"]');
    btnsDeletar.forEach(btn => {
        const onclickOriginal = btn.getAttribute('onclick');
        // Extrair parâmetros
        const match = onclickOriginal.match(/deletarProjetoCliente\(['"](.+?)['"],\s*['"](.+?)['"]\)/);
        if (match) {
            const [, clienteId, projetoId] = match;
            btn.setAttribute('onclick', `deletarProjetoSeguro('${clienteId}', '${projetoId}')`);
        }
    });
    
    console.log('✅ Botões atualizados com confirmações');
}

// ==================== EXEMPLO 9: MONITORAR MUDANÇAS NÃO SALVAS ====================
let mudancasNaoSalvas = false;

function marcarComoModificado() {
    mudancasNaoSalvas = true;
    document.title = '● ' + document.title.replace('● ', ''); // Adicionar ponto
}

function marcarComoSalvo() {
    mudancasNaoSalvas = false;
    document.title = document.title.replace('● ', ''); // Remover ponto
}

// Adicionar aos inputs
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('change', marcarComoModificado);
    });
});

// Avisar ao sair se houver mudanças
window.addEventListener('beforeunload', (e) => {
    if (mudancasNaoSalvas) {
        e.preventDefault();
        e.returnValue = 'Você tem alterações não salvas. Deseja realmente sair?';
    }
});

// ==================== EXEMPLO 10: INTEGRAÇÃO COMPLETA ====================
// Execute este código após o DOM carregar para integrar tudo

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Integrando melhorias...');
    
    // 1. Atualizar botões com confirmações
    setTimeout(atualizarBotoesComMelhorias, 1000);
    
    // 2. Adicionar busca com debounce
    const inputBusca = document.querySelector('[type="search"]');
    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => {
            buscarProjetosDebounced(e.target.value);
        });
    }
    
    // 3. Monitorar mudanças
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('change', marcarComoModificado);
    });
    
    // 4. Substituir função de salvar
    if (typeof window.salvarBancoClientes === 'function') {
        window.salvarBancoClientesOriginal = window.salvarBancoClientes;
        window.salvarBancoClientes = function() {
            window.salvarBancoClientesOriginal();
            marcarComoSalvo();
            Toast.show('✅ Dados salvos!', 'success');
        };
    }
    
    console.log('✅ Melhorias integradas com sucesso!');
});

// ==================== DISPONIBILIZAR GLOBALMENTE ====================
window.deletarProjetoSeguro = deletarProjetoSeguro;
window.salvarProjetoComValidacao = salvarProjetoComValidacao;
window.adicionarPecaComValidacao = adicionarPecaComValidacao;
window.exportarComFeedback = exportarComFeedback;
window.buscarProjetosDebounced = buscarProjetosDebounced;
window.copiarOrcamentoParaClipboard = copiarOrcamentoParaClipboard;
window.salvarClienteCompleto = salvarClienteCompleto;
window.atualizarBotoesComMelhorias = atualizarBotoesComMelhorias;

console.log('✅ Exemplos de integração carregados');
console.log('💡 Use: atualizarBotoesComMelhorias() para atualizar os botões');
