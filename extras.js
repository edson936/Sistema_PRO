/**
 * MARCENARIA PRO - Funcionalidades Extras Premium
 * Versão: 2026.4.0
 * PWA, Gráficos, Calculadora, Exportações Avançadas, etc.
 */

// ==================== CALCULADORA INTEGRADA ====================
const Calculadora = {
    modal: null,
    display: '',
    memoria: 0,
    
    init() {
        this.criarModal();
        this.adicionarAtalho();
    },
    
    criarModal() {
        const modal = document.createElement('div');
        modal.id = 'calculadora-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 350px;">
                <div class="modal-header">
                    <h2>🔢 Calculadora</h2>
                    <button class="modal-close" onclick="Calculadora.fechar()">×</button>
                </div>
                
                <div class="calculadora-display" id="calc-display">0</div>
                
                <div class="calculadora-grid">
                    <button onclick="Calculadora.limpar()" class="calc-btn calc-clear">C</button>
                    <button onclick="Calculadora.backspace()" class="calc-btn">⌫</button>
                    <button onclick="Calculadora.operacao('/')" class="calc-btn calc-op">÷</button>
                    <button onclick="Calculadora.operacao('*')" class="calc-btn calc-op">×</button>
                    
                    <button onclick="Calculadora.numero('7')" class="calc-btn">7</button>
                    <button onclick="Calculadora.numero('8')" class="calc-btn">8</button>
                    <button onclick="Calculadora.numero('9')" class="calc-btn">9</button>
                    <button onclick="Calculadora.operacao('-')" class="calc-btn calc-op">−</button>
                    
                    <button onclick="Calculadora.numero('4')" class="calc-btn">4</button>
                    <button onclick="Calculadora.numero('5')" class="calc-btn">5</button>
                    <button onclick="Calculadora.numero('6')" class="calc-btn">6</button>
                    <button onclick="Calculadora.operacao('+')" class="calc-btn calc-op">+</button>
                    
                    <button onclick="Calculadora.numero('1')" class="calc-btn">1</button>
                    <button onclick="Calculadora.numero('2')" class="calc-btn">2</button>
                    <button onclick="Calculadora.numero('3')" class="calc-btn">3</button>
                    <button onclick="Calculadora.igual()" class="calc-btn calc-igual" style="grid-row: span 2;">=</button>
                    
                    <button onclick="Calculadora.numero('0')" class="calc-btn" style="grid-column: span 2;">0</button>
                    <button onclick="Calculadora.numero('.')" class="calc-btn">.</button>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button onclick="Calculadora.copiarResultado()" class="btn btn-sm btn-primary">📋 Copiar</button>
                    <button onclick="Calculadora.colarEmInput()" class="btn btn-sm btn-success">📌 Colar em Input</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.modal = modal;
    },
    
    adicionarAtalho() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'q') {
                e.preventDefault();
                this.abrir();
            }
        });
    },
    
    abrir() {
        this.modal.classList.add('active');
        this.limpar();
    },
    
    fechar() {
        this.modal.classList.remove('active');
    },
    
    numero(num) {
        if (this.display === '0' || this.display === 'Erro') {
            this.display = num;
        } else {
            this.display += num;
        }
        this.atualizarDisplay();
    },
    
    operacao(op) {
        if (this.display && !this.display.endsWith(' ')) {
            this.display += ' ' + op + ' ';
            this.atualizarDisplay();
        }
    },
    
    igual() {
        try {
            // Substitui operadores visuais pelos reais
            const expressao = this.display
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/\s/g, ''); // Remove espaços
            
            // Avalia a expressão de forma segura (sem eval)
            const resultado = this.avaliarExpressao(expressao);
            
            if (isNaN(resultado) || !isFinite(resultado)) {
                this.display = 'Erro';
            } else {
                this.display = resultado.toString();
            }
            this.atualizarDisplay();
        } catch (e) {
            this.display = 'Erro';
            this.atualizarDisplay();
        }
    },
    
    // Avaliador seguro de expressões matemáticas (sem eval)
    avaliarExpressao(expr) {
        // Remove espaços
        expr = expr.replace(/\s/g, '');
        
        // Parser de expressões matemáticas simples
        const parseExpressao = (str) => {
            // Divide por + e -
            let soma = 0;
            let partes = str.split(/(\+|\-)/);
            let operador = '+';
            
            for (let i = 0; i < partes.length; i++) {
                if (partes[i] === '+' || partes[i] === '-') {
                    operador = partes[i];
                } else if (partes[i]) {
                    const valor = parseTermo(partes[i]);
                    if (operador === '+') {
                        soma += valor;
                    } else {
                        soma -= valor;
                    }
                }
            }
            return soma;
        };
        
        const parseTermo = (str) => {
            // Divide por * e /
            let produto = 1;
            let partes = str.split(/(\*|\/)/);
            let operador = '*';
            
            for (let i = 0; i < partes.length; i++) {
                if (partes[i] === '*' || partes[i] === '/') {
                    operador = partes[i];
                } else if (partes[i]) {
                    const valor = parseFloat(partes[i]);
                    if (isNaN(valor)) {
                        throw new Error('Número inválido');
                    }
                    if (operador === '*') {
                        produto *= valor;
                    } else {
                        if (valor === 0) {
                            throw new Error('Divisão por zero');
                        }
                        produto /= valor;
                    }
                }
            }
            return produto;
        };
        
        return parseExpressao(expr);
    },
    
    limpar() {
        this.display = '0';
        this.atualizarDisplay();
    },
    
    backspace() {
        if (this.display.length > 1) {
            this.display = this.display.slice(0, -1);
        } else {
            this.display = '0';
        }
        this.atualizarDisplay();
    },
    
    atualizarDisplay() {
        document.getElementById('calc-display').textContent = this.display;
    },
    
    copiarResultado() {
        const valor = this.display.replace(/[^0-9.]/g, '');
        Utils.copyToClipboard(valor);
        Toast.show('📋 Copiado!', 'success');
    },
    
    colarEmInput() {
        const valor = this.display.replace(/[^0-9.]/g, '');
        const inputFocado = document.activeElement;
        if (inputFocado && (inputFocado.tagName === 'INPUT' || inputFocado.tagName === 'TEXTAREA')) {
            inputFocado.value = valor;
            Toast.show('✅ Valor colado!', 'success');
        } else {
            Toast.show('⚠️ Foque em um campo primeiro', 'warning');
        }
        this.fechar();
    }
};

// ==================== GRÁFICOS E RELATÓRIOS ====================
const Graficos = {
    gerarGraficoProjetosPorMes() {
        const projetos = Object.values(window.BancoClientes || {})
            .flatMap(c => c.projetos || []);
        
        const porMes = {};
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        
        projetos.forEach(p => {
            const data = new Date(p.data);
            const mes = meses[data.getMonth()];
            porMes[mes] = (porMes[mes] || 0) + 1;
        });
        
        return porMes;
    },
    
    gerarGraficoValoresPorCategoria() {
        const projetos = Object.values(window.BancoClientes || {})
            .flatMap(c => c.projetos || []);
        
        const porCategoria = {};
        
        projetos.forEach(p => {
            const categoria = p.metadata?.categoria || 'Sem Categoria';
            const valor = this.extrairValor(p.orcamento);
            porCategoria[categoria] = (porCategoria[categoria] || 0) + valor;
        });
        
        return porCategoria;
    },
    
    extrairValor(orcamento) {
        const match = orcamento?.match(/[\d.,]+/);
        return match ? parseFloat(match[0].replace(/\./g, '').replace(',', '.')) : 0;
    },
    
    renderizarGraficoBarras(dados, titulo) {
        const max = Math.max(...Object.values(dados));
        
        return `
            <div class="card">
                <h3>${titulo}</h3>
                <div class="grafico-barras">
                    ${Object.entries(dados).map(([label, valor]) => {
                        const altura = (valor / max * 100);
                        return `
                            <div class="barra-container">
                                <div class="barra" style="height: ${altura}%; background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);">
                                    <span class="barra-valor">${valor}</span>
                                </div>
                                <div class="barra-label">${label}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },
    
    exibirRelatorioCompleto() {
        const projetosPorMes = this.gerarGraficoProjetosPorMes();
        const valoresPorCategoria = this.gerarGraficoValoresPorCategoria();
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2>📊 Relatório Completo</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                
                ${this.renderizarGraficoBarras(projetosPorMes, '📅 Projetos por Mês')}
                ${this.renderizarGraficoBarras(
                    Object.fromEntries(
                        Object.entries(valoresPorCategoria).map(([k, v]) => [k, Formatter.currency(v)])
                    ), 
                    '💰 Faturamento por Categoria'
                )}
                
                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="Graficos.exportarRelatorioPDF()" class="btn btn-primary">
                        📄 Exportar PDF
                    </button>
                    <button onclick="window.print()" class="btn btn-secondary">
                        🖨️ Imprimir
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    exportarRelatorioPDF() {
        Toast.show('📄 Funcionalidade de PDF em desenvolvimento', 'info');
        // Implementar com jsPDF se necessário
    }
};

// ==================== MODO APRESENTAÇÃO ====================
const ModoApresentacao = {
    ativar(projeto) {
        const overlay = document.createElement('div');
        overlay.id = 'apresentacao-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            z-index: 99999;
            overflow: auto;
            padding: 40px;
            color: white;
        `;
        
        overlay.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                    <h1 style="font-size: 3rem; margin: 0; color: white;">📋 ${projeto.nome}</h1>
                    <button onclick="document.getElementById('apresentacao-overlay').remove()" 
                            style="background: white; color: #1f2937; border: none; padding: 15px 30px; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 1.1rem;">
                        ✕ Fechar
                    </button>
                </div>
                
                <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 20px; backdrop-filter: blur(10px); margin-bottom: 30px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                        <div>
                            <div style="font-size: 0.9rem; opacity: 0.7; text-transform: uppercase; margin-bottom: 10px;">Cliente</div>
                            <div style="font-size: 1.5rem; font-weight: 700;">${projeto.nomeCliente}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; opacity: 0.7; text-transform: uppercase; margin-bottom: 10px;">Data</div>
                            <div style="font-size: 1.5rem; font-weight: 700;">${Formatter.date(projeto.data)}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; opacity: 0.7; text-transform: uppercase; margin-bottom: 10px;">Valor Total</div>
                            <div style="font-size: 2rem; font-weight: 900; color: #10b981;">${projeto.orcamento}</div>
                        </div>
                    </div>
                </div>
                
                ${projeto.listaPecas && projeto.listaPecas.length > 0 ? `
                    <div style="background: rgba(255,255,255,0.05); padding: 30px; border-radius: 20px; margin-bottom: 30px;">
                        <h2 style="margin-bottom: 20px; font-size: 2rem;">📦 Peças (${projeto.listaPecas.length})</h2>
                        <div style="display: grid; gap: 15px;">
                            ${projeto.listaPecas.slice(0, 10).map(peca => `
                                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-size: 1.3rem; font-weight: 700; margin-bottom: 5px;">${peca.nome}</div>
                                        <div style="opacity: 0.7;">${peca.qtd}x | ${peca.espessura} | ${peca.corMaterial}</div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 0.9rem; opacity: 0.7;">Dimensões</div>
                                        <div style="font-size: 1.2rem; font-weight: 700;">${Math.round(peca.alturaFinal)}x${Math.round(peca.larguraFinal)}mm</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div style="text-align: center; padding: 40px;">
                    <p style="font-size: 1.2rem; opacity: 0.7;">Obrigado pela preferência!</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }
};

// ==================== COMPARAR ORÇAMENTOS ====================
const CompararOrcamentos = {
    comparar(projeto1Id, projeto2Id) {
        // Buscar projetos
        let proj1, proj2;
        Object.values(window.BancoClientes || {}).forEach(cliente => {
            cliente.projetos?.forEach(p => {
                if (p.id === projeto1Id) proj1 = p;
                if (p.id === projeto2Id) proj2 = p;
            });
        });
        
        if (!proj1 || !proj2) {
            Toast.show('❌ Projetos não encontrados', 'error');
            return;
        }
        
        const valor1 = this.extrairValor(proj1.orcamento);
        const valor2 = this.extrairValor(proj2.orcamento);
        const diferenca = Math.abs(valor1 - valor2);
        const percentual = ((diferenca / Math.min(valor1, valor2)) * 100).toFixed(1);
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2>⚖️ Comparação de Orçamentos</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <div class="card" style="text-align: center; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
                        <h3 style="margin-bottom: 15px;">${proj1.nome}</h3>
                        <div style="font-size: 0.9rem; color: #6b7280; margin-bottom: 10px;">${proj1.nomeCliente}</div>
                        <div style="font-size: 2rem; font-weight: 900; color: #0ea5e9;">${proj1.orcamento}</div>
                        <div style="margin-top: 15px; font-size: 0.9rem; color: #6b7280;">
                            ${proj1.listaPecas?.length || 0} peças
                        </div>
                    </div>
                    
                    <div class="card" style="text-align: center; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
                        <h3 style="margin-bottom: 15px;">${proj2.nome}</h3>
                        <div style="font-size: 0.9rem; color: #6b7280; margin-bottom: 10px;">${proj2.nomeCliente}</div>
                        <div style="font-size: 2rem; font-weight: 900; color: #f59e0b;">${proj2.orcamento}</div>
                        <div style="margin-top: 15px; font-size: 0.9rem; color: #6b7280;">
                            ${proj2.listaPecas?.length || 0} peças
                        </div>
                    </div>
                </div>
                
                <div class="card" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); text-align: center;">
                    <h3 style="margin-bottom: 20px;">📊 Diferença</h3>
                    <div style="font-size: 2.5rem; font-weight: 900; color: #10b981; margin-bottom: 10px;">
                        ${Formatter.currency(diferenca)}
                    </div>
                    <div style="font-size: 1.2rem; color: #059669;">
                        ${percentual}% ${valor1 > valor2 ? 'mais caro' : 'mais barato'}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    extrairValor(orcamento) {
        const match = orcamento?.match(/[\d.,]+/);
        return match ? parseFloat(match[0].replace(/\./g, '').replace(',', '.')) : 0;
    },
    
    selecionarParaComparar() {
        const projetos = Object.values(window.BancoClientes || {})
            .flatMap(c => c.projetos || [])
            .sort((a, b) => new Date(b.data) - new Date(a.data));
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>⚖️ Selecione 2 Projetos para Comparar</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="font-weight: 700; display: block; margin-bottom: 10px;">Projeto 1</label>
                    <select id="comparar-proj1" style="width: 100%; padding: 12px;">
                        <option value="">Selecione...</option>
                        ${projetos.map(p => `
                            <option value="${p.id}">${p.nome} - ${p.nomeCliente} (${p.orcamento})</option>
                        `).join('')}
                    </select>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="font-weight: 700; display: block; margin-bottom: 10px;">Projeto 2</label>
                    <select id="comparar-proj2" style="width: 100%; padding: 12px;">
                        <option value="">Selecione...</option>
                        ${projetos.map(p => `
                            <option value="${p.id}">${p.nome} - ${p.nomeCliente} (${p.orcamento})</option>
                        `).join('')}
                    </select>
                </div>
                
                <button onclick="CompararOrcamentos.executarComparacao()" class="btn btn-primary" style="width: 100%;">
                    ⚖️ Comparar
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    executarComparacao() {
        const proj1 = document.getElementById('comparar-proj1').value;
        const proj2 = document.getElementById('comparar-proj2').value;
        
        if (!proj1 || !proj2) {
            Toast.show('⚠️ Selecione 2 projetos', 'warning');
            return;
        }
        
        if (proj1 === proj2) {
            Toast.show('⚠️ Selecione projetos diferentes', 'warning');
            return;
        }
        
        document.querySelector('.modal-overlay').remove();
        this.comparar(proj1, proj2);
    }
};

// ==================== EXPORTAR PARA WHATSAPP ====================
const ExportarWhatsApp = {
    gerarMensagem(projeto) {
        let msg = `*📋 ORÇAMENTO - ${projeto.nome.toUpperCase()}*\n\n`;
        msg += `*Cliente:* ${projeto.nomeCliente}\n`;
        msg += `*Data:* ${Formatter.date(projeto.data)}\n\n`;
        
        if (projeto.listaPecas && projeto.listaPecas.length > 0) {
            msg += `*📦 PEÇAS (${projeto.listaPecas.length})*\n`;
            projeto.listaPecas.slice(0, 5).forEach((peca, i) => {
                msg += `${i + 1}. ${peca.nome} - ${peca.qtd}x\n`;
                msg += `   ${Math.round(peca.alturaFinal)}x${Math.round(peca.larguraFinal)}mm\n`;
            });
            if (projeto.listaPecas.length > 5) {
                msg += `   ... e mais ${projeto.listaPecas.length - 5} peças\n`;
            }
            msg += `\n`;
        }
        
        msg += `*💰 VALOR TOTAL: ${projeto.orcamento}*\n\n`;
        msg += `_Obrigado pela preferência!_`;
        
        return msg;
    },
    
    enviar(clienteId, projetoId, telefone = '') {
        const cliente = window.BancoClientes?.[clienteId];
        if (!cliente) return;
        
        const projeto = cliente.projetos?.find(p => p.id === projetoId);
        if (!projeto) return;
        
        const mensagem = this.gerarMensagem(projeto);
        const mensagemEncoded = encodeURIComponent(mensagem);
        
        if (telefone) {
            // Com número específico
            const tel = telefone.replace(/\D/g, '');
            window.open(`https://wa.me/55${tel}?text=${mensagemEncoded}`, '_blank');
        } else {
            // Sem número (abre WhatsApp Web)
            window.open(`https://wa.me/?text=${mensagemEncoded}`, '_blank');
        }
        
        Toast.show('📱 WhatsApp aberto!', 'success');
    },
    
    mostrarModal(clienteId, projetoId) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>📱 Enviar por WhatsApp</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                
                <div class="form-group">
                    <label>Telefone (opcional)</label>
                    <input type="tel" id="whats-telefone" placeholder="11999999999" style="width: 100%; padding: 12px;">
                    <small style="color: #6b7280; display: block; margin-top: 5px;">
                        Deixe em branco para escolher no WhatsApp
                    </small>
                </div>
                
                <button onclick="ExportarWhatsApp.enviarComTelefone('${clienteId}', '${projetoId}')" 
                        class="btn btn-success" style="width: 100%;">
                    📱 Enviar
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    enviarComTelefone(clienteId, projetoId) {
        const telefone = document.getElementById('whats-telefone').value;
        document.querySelector('.modal-overlay').remove();
        this.enviar(clienteId, projetoId, telefone);
    }
};

// ==================== NOTAS E COMENTÁRIOS ====================
const NotasProjeto = {
    adicionar(clienteId, projetoId, nota) {
        const cliente = window.BancoClientes?.[clienteId];
        if (!cliente) return;
        
        const projeto = cliente.projetos?.find(p => p.id === projetoId);
        if (!projeto) return;
        
        if (!projeto.notas) projeto.notas = [];
        
        projeto.notas.push({
            id: Utils.generateId(),
            texto: nota,
            data: new Date().toISOString(),
            autor: 'Usuário'
        });
        
        if (typeof window.salvarBancoClientes === 'function') {
            window.salvarBancoClientes();
        }
        
        Toast.show('✅ Nota adicionada!', 'success');
        return projeto.notas;
    },
    
    listar(clienteId, projetoId) {
        const cliente = window.BancoClientes?.[clienteId];
        if (!cliente) return [];
        
        const projeto = cliente.projetos?.find(p => p.id === projetoId);
        return projeto?.notas || [];
    },
    
    mostrarModal(clienteId, projetoId) {
        const notas = this.listar(clienteId, projetoId);
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📝 Notas do Projeto</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <textarea id="nova-nota" placeholder="Digite uma nota..." 
                              style="width: 100%; padding: 12px; min-height: 100px; border: 2px solid #e5e7eb; border-radius: 10px;"></textarea>
                    <button onclick="NotasProjeto.adicionarNota('${clienteId}', '${projetoId}')" 
                            class="btn btn-primary" style="margin-top: 10px;">
                        ➕ Adicionar Nota
                    </button>
                </div>
                
                <h3 style="margin-bottom: 15px;">Histórico de Notas</h3>
                <div style="max-height: 400px; overflow-y: auto;">
                    ${notas.length > 0 ? notas.reverse().map(nota => `
                        <div style="background: #f9fafb; padding: 15px; border-radius: 10px; margin-bottom: 10px; border-left: 4px solid #6366f1;">
                            <div style="font-size: 0.85rem; color: #6b7280; margin-bottom: 5px;">
                                ${Formatter.datetime(nota.data)} - ${nota.autor}
                            </div>
                            <div style="color: #1f2937;">${nota.texto}</div>
                        </div>
                    `).join('') : '<p style="text-align: center; color: #6b7280; padding: 40px;">Nenhuma nota ainda</p>'}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    adicionarNota(clienteId, projetoId) {
        const texto = document.getElementById('nova-nota').value.trim();
        
        if (!texto) {
            Toast.show('⚠️ Digite uma nota', 'warning');
            return;
        }
        
        this.adicionar(clienteId, projetoId, texto);
        
        // Reabrir modal para atualizar
        document.querySelector('.modal-overlay').remove();
        setTimeout(() => this.mostrarModal(clienteId, projetoId), 100);
    }
};

// ==================== LEMBRETES E ALERTAS ====================
const Lembretes = {
    verificarPendencias() {
        const hoje = new Date();
        const seteDiasAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        const projetos = Object.values(window.BancoClientes || {})
            .flatMap(c => c.projetos || []);
        
        const alertas = [];
        
        // Projetos sem atualização há 7 dias
        projetos.forEach(p => {
            const dataProj = new Date(p.data);
            if (dataProj < seteDiasAtras) {
                alertas.push({
                    tipo: 'antigo',
                    titulo: `Projeto antigo: ${p.nome}`,
                    descricao: `Sem atualização desde ${Formatter.date(p.data)}`,
                    icone: '⏰'
                });
            }
        });
        
        // Pagamentos pendentes
        projetos.forEach(p => {
            if (p.pagamento && p.pagamento.status === 'pendente') {
                alertas.push({
                    tipo: 'pagamento',
                    titulo: `Pagamento pendente: ${p.nome}`,
                    descricao: `Valor: ${p.orcamento}`,
                    icone: '💰'
                });
            }
        });
        
        return alertas;
    },
    
    mostrarAlertas() {
        const alertas = this.verificarPendencias();
        
        if (alertas.length === 0) {
            Toast.show('✅ Nenhuma pendência!', 'success');
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🔔 Lembretes e Alertas (${alertas.length})</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                
                ${alertas.map(alerta => `
                    <div class="card" style="margin-bottom: 15px; border-left: 4px solid ${alerta.tipo === 'pagamento' ? '#ef4444' : '#f59e0b'};">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <span style="font-size: 2rem;">${alerta.icone}</span>
                            <div style="flex: 1;">
                                <div style="font-weight: 700; margin-bottom: 5px;">${alerta.titulo}</div>
                                <div style="color: #6b7280; font-size: 0.9rem;">${alerta.descricao}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.body.appendChild(modal);
    }
};

// ==================== BACKUP E RESTAURAÇÃO COMPLETO ====================
const BackupCompleto = {
    exportar() {
        const dados = {
            versao: '2026.4.0',
            timestamp: new Date().toISOString(),
            clientes: window.BancoClientes,
            catalogo: window.AppData,
            configuracoes: {
                darkMode: document.documentElement.hasAttribute('data-theme'),
                senha: localStorage.getItem('marcenaria_pro_senha'),
                historico: Historico.acoes
            }
        };
        
        const json = JSON.stringify(dados, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `backup_completo_${new Date().getTime()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        Toast.show('✅ Backup completo exportado!', 'success');
    },
    
    importar() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            LoadingSystem.show('Importando backup...');
            
            try {
                const texto = await file.text();
                const dados = JSON.parse(texto);
                
                // Confirmar restauração
                const confirmado = await ConfirmDialog.show({
                    title: '⚠️ Restaurar Backup',
                    message: 'Isso substituirá TODOS os dados atuais. Deseja continuar?',
                    type: 'danger'
                });
                
                if (!confirmado) {
                    LoadingSystem.hide();
                    return;
                }
                
                // Restaurar dados
                window.BancoClientes = dados.clientes || {};
                window.AppData = dados.catalogo || {};
                
                // Salvar
                if (typeof window.salvarBancoClientes === 'function') {
                    window.salvarBancoClientes();
                }
                if (typeof window.salvarAppData === 'function') {
                    window.salvarAppData();
                }
                
                LoadingSystem.hide();
                Toast.show('✅ Backup restaurado com sucesso!', 'success');
                
                // Recarregar página após 2s
                setTimeout(() => location.reload(), 2000);
                
            } catch (error) {
                LoadingSystem.hide();
                console.error('Erro ao importar:', error);
                Toast.show('❌ Erro ao importar backup', 'error');
            }
        };
        
        input.click();
    }
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Features Extras carregadas - v2026.4.0');
    
    setTimeout(() => {
        Calculadora.init();
        
        // Verificar lembretes ao iniciar
        const alertas = Lembretes.verificarPendencias();
        if (alertas.length > 0) {
            setTimeout(() => {
                Toast.show(`🔔 Você tem ${alertas.length} lembrete(s)`, 'warning', 5000);
            }, 3000);
        }
        
        console.log('✅ Calculadora (Ctrl+Q)');
        console.log('✅ Gráficos e Relatórios');
        console.log('✅ Modo Apresentação');
        console.log('✅ Comparar Orçamentos');
        console.log('✅ Exportar WhatsApp');
        console.log('✅ Notas e Comentários');
        console.log('✅ Lembretes e Alertas');
        console.log('✅ Backup Completo');
    }, 1500);
});

// Exportar para uso global
window.Calculadora = Calculadora;
window.Graficos = Graficos;
window.ModoApresentacao = ModoApresentacao;
window.CompararOrcamentos = CompararOrcamentos;
window.ExportarWhatsApp = ExportarWhatsApp;
window.NotasProjeto = NotasProjeto;
window.Lembretes = Lembretes;
window.BackupCompleto = BackupCompleto;
