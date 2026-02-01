/**
 * MARCENARIA PRO - Funcionalidades Avançadas
 * Versão: 2026.3.0
 * Busca Global, Dashboard, Duplicar, Pagamentos, Tags, etc.
 */

// ==================== BUSCA GLOBAL ====================
const BuscaGlobal = {
    modal: null,
    resultados: [],
    
    init() {
        this.criarModal();
        this.adicionarAtalho();
    },
    
    criarModal() {
        const modal = document.createElement('div');
        modal.id = 'busca-global-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2>🔍 Busca Global</h2>
                    <button class="modal-close" onclick="BuscaGlobal.fechar()">×</button>
                </div>
                <input type="text" id="busca-global-input" placeholder="Digite para buscar clientes, projetos, valores..." 
                       style="width: 100%; padding: 15px; font-size: 1.1rem; margin-bottom: 20px; border: 2px solid #e5e7eb; border-radius: 10px;">
                <div id="busca-global-resultados" style="max-height: 400px; overflow-y: auto;"></div>
            </div>
        `;
        document.body.appendChild(modal);
        this.modal = modal;
        
        // Buscar ao digitar
        const input = modal.querySelector('#busca-global-input');
        input.addEventListener('input', Utils.debounce((e) => {
            this.buscar(e.target.value);
        }, 300));
    },
    
    adicionarAtalho() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.abrir();
            }
        });
    },
    
    abrir() {
        this.modal.classList.add('active');
        setTimeout(() => {
            document.getElementById('busca-global-input').focus();
        }, 100);
    },
    
    fechar() {
        this.modal.classList.remove('active');
        document.getElementById('busca-global-input').value = '';
        document.getElementById('busca-global-resultados').innerHTML = '';
    },
    
    buscar(termo) {
        if (!termo || termo.length < 2) {
            document.getElementById('busca-global-resultados').innerHTML = 
                '<p style="text-align: center; color: #6b7280; padding: 40px;">Digite pelo menos 2 caracteres para buscar</p>';
            return;
        }
        
        const termoLower = termo.toLowerCase();
        const resultados = [];
        
        // Buscar em clientes e projetos
        Object.values(window.BancoClientes || {}).forEach(cliente => {
            // Buscar nome do cliente
            if (cliente.nome?.toLowerCase().includes(termoLower)) {
                resultados.push({
                    tipo: 'cliente',
                    titulo: cliente.nome,
                    subtitulo: `${cliente.projetos?.length || 0} projeto(s)`,
                    data: cliente,
                    id: cliente.id
                });
            }
            
            // Buscar nos projetos do cliente
            (cliente.projetos || []).forEach(projeto => {
                if (projeto.nome?.toLowerCase().includes(termoLower) ||
                    projeto.nomeCliente?.toLowerCase().includes(termoLower) ||
                    projeto.orcamento?.toLowerCase().includes(termoLower)) {
                    resultados.push({
                        tipo: 'projeto',
                        titulo: projeto.nome,
                        subtitulo: `Cliente: ${projeto.nomeCliente} | ${projeto.orcamento}`,
                        data: Formatter.date(projeto.data),
                        projeto: projeto,
                        clienteId: cliente.id
                    });
                }
            });
        });
        
        this.renderizarResultados(resultados);
    },
    
    renderizarResultados(resultados) {
        const container = document.getElementById('busca-global-resultados');
        
        if (resultados.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 40px;">Nenhum resultado encontrado</p>';
            return;
        }
        
        container.innerHTML = resultados.map((r, i) => `
            <div class="busca-resultado-item" onclick="BuscaGlobal.selecionarResultado(${i})" style="
                padding: 15px;
                border-bottom: 1px solid #e5e7eb;
                cursor: pointer;
                transition: all 0.2s;
            " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-size: 2rem;">${r.tipo === 'cliente' ? '👤' : '📁'}</span>
                    <div style="flex: 1;">
                        <div style="font-weight: 700; color: #1f2937; margin-bottom: 4px;">${r.titulo}</div>
                        <div style="font-size: 0.9rem; color: #6b7280;">${r.subtitulo}</div>
                        ${r.data ? `<div style="font-size: 0.85rem; color: #9ca3af; margin-top: 2px;">${r.data}</div>` : ''}
                    </div>
                    <span style="color: #6366f1; font-size: 1.2rem;">→</span>
                </div>
            </div>
        `).join('');
        
        this.resultados = resultados;
    },
    
    selecionarResultado(index) {
        const resultado = this.resultados[index];
        
        if (resultado.tipo === 'projeto') {
            this.fechar();
            if (typeof window.carregarProjetoCliente === 'function') {
                window.carregarProjetoCliente(resultado.clienteId, resultado.projeto.id);
                Toast.show(`📂 Projeto "${resultado.titulo}" carregado`, 'success');
            }
        } else if (resultado.tipo === 'cliente') {
            this.fechar();
            Toast.show(`👤 Cliente: ${resultado.titulo}`, 'info');
            // Navegar para visualização do cliente se existir
            if (typeof window.navigateTo === 'function') {
                window.navigateTo('clientes');
            }
        }
    }
};

// ==================== DASHBOARD ====================
const Dashboard = {
    dados: null,
    
    calcular() {
        const clientes = Object.values(window.BancoClientes || {});
        const todosProjetos = clientes.flatMap(c => c.projetos || []);
        
        // Extrair valores numéricos dos orçamentos
        const valores = todosProjetos.map(p => {
            const match = p.orcamento?.match(/[\d.,]+/);
            return match ? parseFloat(match[0].replace(/\./g, '').replace(',', '.')) : 0;
        }).filter(v => v > 0);
        
        const valorTotal = valores.reduce((sum, v) => sum + v, 0);
        const valorMedio = valores.length > 0 ? valorTotal / valores.length : 0;
        
        // Projetos por mês
        const projetosPorMes = {};
        todosProjetos.forEach(p => {
            const data = new Date(p.data);
            const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
            projetosPorMes[mesAno] = (projetosPorMes[mesAno] || 0) + 1;
        });
        
        // Cliente mais frequente
        const projetosPorCliente = {};
        clientes.forEach(c => {
            projetosPorCliente[c.nome] = (c.projetos || []).length;
        });
        const clienteTop = Object.entries(projetosPorCliente)
            .sort((a, b) => b[1] - a[1])[0];
        
        this.dados = {
            totalClientes: clientes.length,
            totalProjetos: todosProjetos.length,
            valorTotal,
            valorMedio,
            maiorValor: Math.max(...valores, 0),
            menorValor: valores.length > 0 ? Math.min(...valores) : 0,
            projetosPorMes,
            clienteTop: clienteTop ? { nome: clienteTop[0], projetos: clienteTop[1] } : null,
            projetosRecentes: todosProjetos.sort((a, b) => 
                new Date(b.data) - new Date(a.data)
            ).slice(0, 5)
        };
        
        return this.dados;
    },
    
    exibir() {
        const dados = this.calcular();
        
        const html = `
            <div class="card" style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white;">
                <h2 style="color: white; border: none;">📊 Dashboard</h2>
                <p style="color: rgba(255,255,255,0.9);">Visão geral do seu negócio</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
                <div class="card" style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">👥</div>
                    <div style="font-size: 2.5rem; font-weight: 800; color: #6366f1;">${dados.totalClientes}</div>
                    <div style="color: #6b7280; font-weight: 600;">Clientes</div>
                </div>
                
                <div class="card" style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">📁</div>
                    <div style="font-size: 2.5rem; font-weight: 800; color: #8b5cf6;">${dados.totalProjetos}</div>
                    <div style="color: #6b7280; font-weight: 600;">Projetos</div>
                </div>
                
                <div class="card" style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">💰</div>
                    <div style="font-size: 1.8rem; font-weight: 800; color: #10b981;">${Formatter.currency(dados.valorTotal)}</div>
                    <div style="color: #6b7280; font-weight: 600;">Valor Total</div>
                </div>
                
                <div class="card" style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">📈</div>
                    <div style="font-size: 1.8rem; font-weight: 800; color: #f59e0b;">${Formatter.currency(dados.valorMedio)}</div>
                    <div style="color: #6b7280; font-weight: 600;">Ticket Médio</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <div class="card">
                    <h3>🏆 Cliente Destaque</h3>
                    ${dados.clienteTop ? `
                        <div style="padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%); border-radius: 10px; margin-top: 10px;">
                            <div style="font-size: 1.3rem; font-weight: 700; color: #1f2937;">${dados.clienteTop.nome}</div>
                            <div style="color: #6b7280; margin-top: 5px;">${dados.clienteTop.projetos} projeto(s)</div>
                        </div>
                    ` : '<p style="color: #6b7280;">Nenhum cliente ainda</p>'}
                </div>
                
                <div class="card">
                    <h3>💎 Maior Orçamento</h3>
                    <div style="padding: 20px; background: linear-gradient(135deg, #fef3c7 0%, #fef9f3 100%); border-radius: 10px; margin-top: 10px;">
                        <div style="font-size: 1.8rem; font-weight: 700; color: #10b981;">${Formatter.currency(dados.maiorValor)}</div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h3>📅 Projetos Recentes</h3>
                ${dados.projetosRecentes.length > 0 ? `
                    <div style="margin-top: 15px;">
                        ${dados.projetosRecentes.map(p => `
                            <div style="padding: 12px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 700;">${p.nome}</div>
                                    <div style="font-size: 0.9rem; color: #6b7280;">${p.nomeCliente}</div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-weight: 700; color: #10b981;">${p.orcamento}</div>
                                    <div style="font-size: 0.85rem; color: #9ca3af;">${Formatter.date(p.data)}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p style="color: #6b7280;">Nenhum projeto ainda</p>'}
            </div>
        `;
        
        return html;
    },
    
    inserirNaPagina() {
        // Procurar elemento main ou body
        const main = document.querySelector('main') || document.querySelector('body');
        if (main) {
            const dashboardDiv = document.createElement('div');
            dashboardDiv.id = 'dashboard-view';
            dashboardDiv.className = 'app-view';
            dashboardDiv.style.display = 'none';
            dashboardDiv.innerHTML = this.exibir();
            main.insertBefore(dashboardDiv, main.firstChild);
        }
    }
};

// ==================== DUPLICAR PROJETO ====================
const DuplicarProjeto = {
    duplicar(clienteId, projetoId) {
        if (!window.BancoClientes || !window.BancoClientes[clienteId]) {
            Toast.show('❌ Cliente não encontrado', 'error');
            return;
        }
        
        const cliente = window.BancoClientes[clienteId];
        const projetoOriginal = cliente.projetos?.find(p => p.id === projetoId);
        
        if (!projetoOriginal) {
            Toast.show('❌ Projeto não encontrado', 'error');
            return;
        }
        
        // Clonar projeto
        const novoProjeto = Utils.deepClone(projetoOriginal);
        novoProjeto.id = Utils.generateId();
        novoProjeto.nome = `${projetoOriginal.nome} (Cópia)`;
        novoProjeto.data = new Date().toISOString();
        
        // Adicionar ao cliente
        if (!cliente.projetos) cliente.projetos = [];
        cliente.projetos.push(novoProjeto);
        
        // Salvar
        if (typeof window.salvarBancoClientes === 'function') {
            window.salvarBancoClientes();
        }
        
        Toast.show('✅ Projeto duplicado com sucesso!', 'success');
        
        // Recarregar lista se existir função
        if (typeof window.atualizarListaProjetos === 'function') {
            window.atualizarListaProjetos();
        }
        
        return novoProjeto;
    },
    
    adicionarBotaoDuplicar() {
        // Adicionar botão de duplicar em todos os projetos existentes
        setTimeout(() => {
            const projetosElementos = document.querySelectorAll('[data-projeto-id]');
            projetosElementos.forEach(el => {
                if (!el.querySelector('.btn-duplicar')) {
                    const projetoId = el.getAttribute('data-projeto-id');
                    const clienteId = el.getAttribute('data-cliente-id');
                    
                    const btnDuplicar = document.createElement('button');
                    btnDuplicar.className = 'btn btn-secondary btn-sm btn-duplicar';
                    btnDuplicar.innerHTML = '📋 Duplicar';
                    btnDuplicar.onclick = () => DuplicarProjeto.duplicar(clienteId, projetoId);
                    
                    const botoesContainer = el.querySelector('.botoes-acao') || el;
                    botoesContainer.appendChild(btnDuplicar);
                }
            });
        }, 1000);
    }
};

// ==================== CONTROLE DE PAGAMENTOS ====================
const ControlePagamentos = {
    adicionarAoProjeto(clienteId, projetoId) {
        const cliente = window.BancoClientes?.[clienteId];
        if (!cliente) return;
        
        const projeto = cliente.projetos?.find(p => p.id === projetoId);
        if (!projeto) return;
        
        // Inicializar controle de pagamento se não existir
        if (!projeto.pagamento) {
            projeto.pagamento = {
                status: 'pendente', // pendente, parcial, pago
                valorTotal: 0,
                valorPago: 0,
                parcelas: []
            };
        }
        
        return projeto.pagamento;
    },
    
    registrarPagamento(clienteId, projetoId, valor, descricao = '') {
        const pagamento = this.adicionarAoProjeto(clienteId, projetoId);
        if (!pagamento) return false;
        
        pagamento.parcelas.push({
            id: Utils.generateId(),
            valor: valor,
            data: new Date().toISOString(),
            descricao: descricao || 'Pagamento'
        });
        
        pagamento.valorPago += valor;
        
        // Atualizar status
        if (pagamento.valorPago >= pagamento.valorTotal) {
            pagamento.status = 'pago';
        } else if (pagamento.valorPago > 0) {
            pagamento.status = 'parcial';
        }
        
        if (typeof window.salvarBancoClientes === 'function') {
            window.salvarBancoClientes();
        }
        
        Toast.show(`✅ Pagamento de ${Formatter.currency(valor)} registrado!`, 'success');
        return true;
    },
    
    exibirModal(clienteId, projetoId) {
        const pagamento = this.adicionarAoProjeto(clienteId, projetoId);
        if (!pagamento) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>💰 Controle de Pagamentos</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                
                <div style="background: linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Status:</span>
                        <span class="badge badge-${pagamento.status === 'pago' ? 'success' : pagamento.status === 'parcial' ? 'warning' : 'danger'}">
                            ${pagamento.status.toUpperCase()}
                        </span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Valor Total:</span>
                        <strong>${Formatter.currency(pagamento.valorTotal)}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Valor Pago:</span>
                        <strong style="color: #10b981;">${Formatter.currency(pagamento.valorPago)}</strong>
                    </div>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #e5e7eb;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Falta Pagar:</span>
                            <strong style="color: #ef4444; font-size: 1.3rem;">${Formatter.currency(pagamento.valorTotal - pagamento.valorPago)}</strong>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="font-weight: 700; display: block; margin-bottom: 10px;">Registrar Novo Pagamento</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="number" id="novo-pagamento-valor" placeholder="Valor" style="flex: 1; padding: 12px;">
                        <input type="text" id="novo-pagamento-desc" placeholder="Descrição (opcional)" style="flex: 2; padding: 12px;">
                        <button class="btn btn-success" onclick="ControlePagamentos.registrarPagamentoModal('${clienteId}', '${projetoId}')">
                            Adicionar
                        </button>
                    </div>
                </div>
                
                <h3>Histórico de Pagamentos</h3>
                <div style="max-height: 300px; overflow-y: auto;">
                    ${pagamento.parcelas.length > 0 ? pagamento.parcelas.map(p => `
                        <div style="padding: 12px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between;">
                            <div>
                                <div style="font-weight: 700;">${p.descricao}</div>
                                <div style="font-size: 0.85rem; color: #6b7280;">${Formatter.datetime(p.data)}</div>
                            </div>
                            <div style="font-weight: 700; color: #10b981;">${Formatter.currency(p.valor)}</div>
                        </div>
                    `).join('') : '<p style="text-align: center; color: #6b7280; padding: 40px;">Nenhum pagamento registrado</p>'}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    registrarPagamentoModal(clienteId, projetoId) {
        const valor = parseFloat(document.getElementById('novo-pagamento-valor').value);
        const desc = document.getElementById('novo-pagamento-desc').value;
        
        if (!valor || valor <= 0) {
            Toast.show('⚠️ Digite um valor válido', 'warning');
            return;
        }
        
        this.registrarPagamento(clienteId, projetoId, valor, desc);
        
        // Fechar e reabrir modal para atualizar
        document.querySelector('.modal-overlay').remove();
        setTimeout(() => this.exibirModal(clienteId, projetoId), 100);
    }
};

// ==================== TAGS E CATEGORIAS ====================
const TagsECategorias = {
    categorias: ['Cozinha', 'Quarto', 'Banheiro', 'Sala', 'Escritório', 'Comercial', 'Outro'],
    cores: {
        'Cozinha': '#ef4444',
        'Quarto': '#8b5cf6',
        'Banheiro': '#3b82f6',
        'Sala': '#10b981',
        'Escritório': '#f59e0b',
        'Comercial': '#6366f1',
        'Outro': '#6b7280'
    },
    
    adicionarAoProjeto(projeto, categoria, tags = []) {
        if (!projeto.metadata) projeto.metadata = {};
        projeto.metadata.categoria = categoria;
        projeto.metadata.tags = tags;
        return projeto;
    },
    
    renderizarSeletor(projetoAtual = null) {
        return `
            <div class="form-group">
                <label>📂 Categoria</label>
                <select id="projeto-categoria" style="padding: 12px;">
                    <option value="">Selecione uma categoria</option>
                    ${this.categorias.map(cat => `
                        <option value="${cat}" ${projetoAtual?.metadata?.categoria === cat ? 'selected' : ''}>
                            ${cat}
                        </option>
                    `).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>🏷️ Tags (separadas por vírgula)</label>
                <input type="text" id="projeto-tags" placeholder="ex: urgente, premium, desconto" 
                       value="${projetoAtual?.metadata?.tags?.join(', ') || ''}" style="padding: 12px;">
            </div>
        `;
    },
    
    renderizarBadges(projeto) {
        if (!projeto.metadata) return '';
        
        let html = '';
        
        if (projeto.metadata.categoria) {
            const cor = this.cores[projeto.metadata.categoria] || '#6b7280';
            html += `<span class="badge" style="background: ${cor}20; color: ${cor}; margin-right: 8px;">
                ${projeto.metadata.categoria}
            </span>`;
        }
        
        if (projeto.metadata.tags && projeto.metadata.tags.length > 0) {
            projeto.metadata.tags.forEach(tag => {
                html += `<span class="badge badge-info" style="margin-right: 5px;">${tag}</span>`;
            });
        }
        
        return html;
    }
};

// ==================== HISTÓRICO (UNDO/REDO) ====================
const Historico = {
    acoes: [],
    posicao: -1,
    maxAcoes: 20,
    
    init() {
        this.adicionarAtalhos();
    },
    
    salvarEstado(descricao) {
        // Remover ações futuras se estiver no meio do histórico
        if (this.posicao < this.acoes.length - 1) {
            this.acoes = this.acoes.slice(0, this.posicao + 1);
        }
        
        // Salvar estado atual
        const estado = {
            descricao: descricao,
            timestamp: Date.now(),
            dados: Utils.deepClone(window.BancoClientes)
        };
        
        this.acoes.push(estado);
        this.posicao++;
        
        // Limitar tamanho do histórico
        if (this.acoes.length > this.maxAcoes) {
            this.acoes.shift();
            this.posicao--;
        }
        
        console.log(`📝 Histórico salvo: ${descricao}`);
    },
    
    desfazer() {
        if (this.posicao <= 0) {
            Toast.show('Não há ações para desfazer', 'info');
            return false;
        }
        
        this.posicao--;
        const estado = this.acoes[this.posicao];
        
        window.BancoClientes = Utils.deepClone(estado.dados);
        
        if (typeof window.salvarBancoClientes === 'function') {
            window.salvarBancoClientes();
        }
        
        Toast.show(`↩️ Desfeito: ${estado.descricao}`, 'success');
        return true;
    },
    
    refazer() {
        if (this.posicao >= this.acoes.length - 1) {
            Toast.show('Não há ações para refazer', 'info');
            return false;
        }
        
        this.posicao++;
        const estado = this.acoes[this.posicao];
        
        window.BancoClientes = Utils.deepClone(estado.dados);
        
        if (typeof window.salvarBancoClientes === 'function') {
            window.salvarBancoClientes();
        }
        
        Toast.show(`↪️ Refeito: ${estado.descricao}`, 'success');
        return true;
    },
    
    adicionarAtalhos() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                this.desfazer();
            }
            
            if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
                e.preventDefault();
                this.refazer();
            }
        });
    }
};

// ==================== SENHA DE ACESSO ====================
const SenhaAcesso = {
    senhaKey: 'marcenaria_pro_senha',
    bloqueadoKey: 'marcenaria_pro_bloqueado',
    
    temSenha() {
        return !!localStorage.getItem(this.senhaKey);
    },
    
    verificarSenha(senha) {
        const senhaArmazenada = localStorage.getItem(this.senhaKey);
        return senha === senhaArmazenada;
    },
    
    definirSenha(novaSenha) {
        localStorage.setItem(this.senhaKey, novaSenha);
        Toast.show('✅ Senha definida com sucesso!', 'success');
    },
    
    removerSenha() {
        localStorage.removeItem(this.senhaKey);
        Toast.show('Senha removida', 'info');
    },
    
    bloquear() {
        localStorage.setItem(this.bloqueadoKey, 'true');
        this.mostrarTelaLogin();
    },
    
    desbloquear() {
        localStorage.removeItem(this.bloqueadoKey);
    },
    
    estaBloqueado() {
        return localStorage.getItem(this.bloqueadoKey) === 'true';
    },
    
    mostrarTelaLogin() {
        const overlay = document.createElement('div');
        overlay.id = 'senha-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
        `;
        
        overlay.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 400px; width: 90%;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 4rem; margin-bottom: 15px;">🔐</div>
                    <h2 style="margin: 0; color: #1f2937;">Marcenaria PRO</h2>
                    <p style="color: #6b7280; margin-top: 5px;">Digite sua senha para acessar</p>
                </div>
                
                <input type="password" id="senha-login-input" placeholder="Senha" 
                       style="width: 100%; padding: 15px; font-size: 1.1rem; border: 2px solid #e5e7eb; border-radius: 10px; margin-bottom: 20px;">
                
                <button onclick="SenhaAcesso.tentarLogin()" class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.1rem;">
                    Entrar
                </button>
                
                <p style="text-align: center; margin-top: 20px; font-size: 0.9rem; color: #6b7280;">
                    ${!this.temSenha() ? 'Defina uma senha na primeira vez' : ''}
                </p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Focar no input
        setTimeout(() => {
            const input = document.getElementById('senha-login-input');
            input.focus();
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.tentarLogin();
            });
        }, 100);
    },
    
    tentarLogin() {
        const senha = document.getElementById('senha-login-input').value;
        
        if (!senha) {
            Toast.show('⚠️ Digite uma senha', 'warning');
            return;
        }
        
        // Se não tem senha definida, esta será a primeira
        if (!this.temSenha()) {
            this.definirSenha(senha);
            this.desbloquear();
            document.getElementById('senha-overlay')?.remove();
            Toast.show('✅ Bem-vindo! Senha definida.', 'success');
            return;
        }
        
        // Verificar senha
        if (this.verificarSenha(senha)) {
            this.desbloquear();
            document.getElementById('senha-overlay')?.remove();
            Toast.show('✅ Acesso liberado!', 'success');
        } else {
            Toast.show('❌ Senha incorreta', 'error');
            document.getElementById('senha-login-input').value = '';
        }
    },
    
    init() {
        // Se tiver senha e estiver bloqueado, mostrar tela
        if (this.temSenha() && this.estaBloqueado()) {
            this.mostrarTelaLogin();
        }
        
        // Auto-bloqueio após inatividade (10 minutos)
        if (this.temSenha()) {
            let timeout;
            const resetTimer = () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    if (this.temSenha()) {
                        this.bloquear();
                    }
                }, 10 * 60 * 1000); // 10 minutos
            };
            
            ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
                document.addEventListener(event, resetTimer, true);
            });
            
            resetTimer();
        }
    },
    
    mostrarConfiguracao() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>🔐 Configurar Senha</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                
                ${this.temSenha() ? `
                    <div style="background: #fef3c7; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="margin: 0; color: #92400e;">⚠️ Você já tem uma senha configurada</p>
                    </div>
                    
                    <button class="btn btn-danger" style="width: 100%; margin-bottom: 15px;" onclick="SenhaAcesso.removerSenhaConfirm()">
                        Remover Senha
                    </button>
                    <button class="btn btn-warning" style="width: 100%;" onclick="SenhaAcesso.bloquear()">
                        Bloquear Agora
                    </button>
                ` : `
                    <p style="color: #6b7280; margin-bottom: 20px;">Defina uma senha para proteger seus dados</p>
                    
                    <div class="form-group">
                        <label>Nova Senha</label>
                        <input type="password" id="nova-senha-config" placeholder="Digite sua senha" style="width: 100%; padding: 12px;">
                    </div>
                    
                    <div class="form-group">
                        <label>Confirmar Senha</label>
                        <input type="password" id="confirmar-senha-config" placeholder="Digite novamente" style="width: 100%; padding: 12px;">
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%;" onclick="SenhaAcesso.salvarNovaSenha()">
                        Definir Senha
                    </button>
                `}
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    salvarNovaSenha() {
        const senha = document.getElementById('nova-senha-config').value;
        const confirmar = document.getElementById('confirmar-senha-config').value;
        
        if (!senha || senha.length < 4) {
            Toast.show('⚠️ Senha deve ter pelo menos 4 caracteres', 'warning');
            return;
        }
        
        if (senha !== confirmar) {
            Toast.show('❌ As senhas não coincidem', 'error');
            return;
        }
        
        this.definirSenha(senha);
        document.querySelector('.modal-overlay').remove();
    },
    
    async removerSenhaConfirm() {
        const confirmado = await ConfirmDialog.show({
            title: '⚠️ Remover Senha',
            message: 'Tem certeza que deseja remover a senha? O sistema ficará desprotegido.',
            type: 'warning'
        });
        
        if (confirmado) {
            this.removerSenha();
            this.desbloquear();
            document.querySelector('.modal-overlay').remove();
        }
    }
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Funcionalidades Avançadas carregadas - v2026.3.0');
    
    // Inicializar tudo
    setTimeout(() => {
        BuscaGlobal.init();
        Dashboard.inserirNaPagina();
        Historico.init();
        SenhaAcesso.init();
        DuplicarProjeto.adicionarBotaoDuplicar();
        
        console.log('✅ Busca Global (Ctrl+K)');
        console.log('✅ Dashboard');
        console.log('✅ Duplicar Projeto');
        console.log('✅ Controle de Pagamentos');
        console.log('✅ Tags e Categorias');
        console.log('✅ Histórico (Ctrl+Z / Ctrl+Y)');
        console.log('✅ Senha de Acesso');
    }, 1000);
});

// Exportar para uso global
window.BuscaGlobal = BuscaGlobal;
window.Dashboard = Dashboard;
window.DuplicarProjeto = DuplicarProjeto;
window.ControlePagamentos = ControlePagamentos;
window.TagsECategorias = TagsECategorias;
window.Historico = Historico;
window.SenhaAcesso = SenhaAcesso;
