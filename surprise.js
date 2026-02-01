/**
 * MARCENARIA PRO - FUNCIONALIDADES SURPREENDENTES 🚀
 * Versão: 2026.6.0 - EDIÇÃO INOVAÇÃO TOTAL
 * O que você nunca imaginou em um sistema de marcenaria!
 */

// ==================== COMANDOS DE VOZ ====================
const ComandosVoz = {
    reconhecimento: null,
    ativo: false,
    comandos: {
        'abrir busca': () => BuscaGlobal?.abrir(),
        'calculadora': () => Calculadora?.abrir(),
        'dashboard': () => Dashboard?.exibir(),
        'dark mode': () => DarkMode?.toggle(),
        'novo projeto': () => Toast.show('🎤 Criando novo projeto...', 'info'),
        'clientes vip': () => CRM?.exibirPainelCRM(),
        'orçamento rápido': () => OrcamentoRapido?.abrir(),
        'relatório': () => Graficos?.exibirRelatorioCompleto(),
        'backup': () => BackupCompleto?.exportar(),
        'ajuda': () => TourInterativo?.iniciar()
    },
    
    init() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.log('⚠️ Reconhecimento de voz não suportado neste navegador');
            return false;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.reconhecimento = new SpeechRecognition();
        this.reconhecimento.continuous = false;
        this.reconhecimento.lang = 'pt-BR';
        this.reconhecimento.interimResults = false;
        
        this.reconhecimento.onresult = (event) => {
            const comando = event.results[0][0].transcript.toLowerCase();
            console.log('🎤 Comando recebido:', comando);
            this.processarComando(comando);
        };
        
        this.reconhecimento.onerror = (event) => {
            console.error('Erro no reconhecimento:', event.error);
            if (event.error !== 'no-speech') {
                Toast.show('❌ Erro ao processar comando de voz', 'error');
            }
        };
        
        this.criarBotao();
        console.log('🎤 Comandos de voz prontos!');
        return true;
    },
    
    criarBotao() {
        const botao = document.createElement('button');
        botao.id = 'btn-voz';
        botao.innerHTML = '🎤';
        botao.title = 'Ativar Comandos de Voz (ou pressione V)';
        botao.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
            color: white;
            border: none;
            font-size: 1.8rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
            z-index: 9999;
            transition: all 0.3s ease;
        `;
        
        botao.onclick = () => this.ativar();
        document.body.appendChild(botao);
        
        // Atalho V para voz
        document.addEventListener('keydown', (e) => {
            if (e.key === 'v' && !e.ctrlKey && !e.metaKey && 
                !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                this.ativar();
            }
        });
    },
    
    ativar() {
        if (!this.reconhecimento) {
            Toast.show('❌ Comandos de voz não disponíveis', 'error');
            return;
        }
        
        const botao = document.getElementById('btn-voz');
        botao.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        botao.style.transform = 'scale(1.1)';
        botao.style.animation = 'pulse 1s infinite';
        
        Toast.show('🎤 Escutando... Diga um comando!', 'info', 3000);
        
        try {
            this.reconhecimento.start();
            this.ativo = true;
            
            setTimeout(() => {
                if (this.ativo) {
                    this.desativar();
                }
            }, 5000);
        } catch (error) {
            console.error('Erro ao iniciar reconhecimento:', error);
            this.desativar();
        }
    },
    
    desativar() {
        const botao = document.getElementById('btn-voz');
        botao.style.background = 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)';
        botao.style.transform = 'scale(1)';
        botao.style.animation = 'none';
        this.ativo = false;
    },
    
    processarComando(texto) {
        this.desativar();
        
        for (const [comando, funcao] of Object.entries(this.comandos)) {
            if (texto.includes(comando)) {
                Toast.show(`✅ Executando: ${comando}`, 'success');
                funcao();
                return;
            }
        }
        
        Toast.show(`❓ Comando não reconhecido: "${texto}"`, 'warning');
    },
    
    listarComandos() {
        const comandosLista = Object.keys(this.comandos).map(c => `"${c}"`).join(', ');
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2>🎤 Comandos de Voz Disponíveis</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                
                <p style="margin-bottom: 20px; color: #6b7280;">
                    Pressione <kbd>V</kbd> ou clique no botão 🎤 e diga:
                </p>
                
                <div style="display: grid; gap: 12px;">
                    ${Object.keys(this.comandos).map(cmd => `
                        <div class="card" style="padding: 15px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
                            <strong style="color: #0ea5e9;">"${cmd}"</strong>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-top: 25px; padding: 15px; background: #fef3c7; border-radius: 10px;">
                    <strong>💡 Dica:</strong> Fale claramente e espere a confirmação!
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
};

// ==================== GAMIFICAÇÃO E CONQUISTAS ====================
const Gamificacao = {
    conquistas: {
        'primeiro-projeto': { titulo: '🎯 Primeiro Projeto', descricao: 'Criou seu primeiro projeto', pontos: 10, desbloqueado: false },
        'cliente-fiel': { titulo: '💎 Cliente Fiel', descricao: '5 projetos com mesmo cliente', pontos: 50, desbloqueado: false },
        'vendedor-pro': { titulo: '🏆 Vendedor Pro', descricao: 'R$ 50.000 em vendas', pontos: 100, desbloqueado: false },
        'organizador': { titulo: '📚 Organizador', descricao: 'Adicionou tags em 10 projetos', pontos: 30, desbloqueado: false },
        'madrugador': { titulo: '🌅 Madrugador', descricao: 'Trabalhou às 6h da manhã', pontos: 20, desbloqueado: false },
        'night-owl': { titulo: '🦉 Coruja', descricao: 'Trabalhou depois da meia-noite', pontos: 20, desbloqueado: false },
        'backup-master': { titulo: '💾 Backup Master', descricao: 'Fez 5 backups', pontos: 40, desbloqueado: false },
        'speedster': { titulo: '⚡ Velocista', descricao: 'Criou projeto em menos de 2 min', pontos: 25, desbloqueado: false },
        'perfeccionista': { titulo: '✨ Perfeccionista', descricao: 'Revisou projeto 5 vezes', pontos: 35, desbloqueado: false },
        'social': { titulo: '📱 Social', descricao: 'Enviou 10 orçamentos por WhatsApp', pontos: 30, desbloqueado: false }
    },
    
    pontuacao: 0,
    nivel: 1,
    
    init() {
        this.carregarProgresso();
        this.criarBadge();
        this.verificarConquistas();
        console.log('🏆 Sistema de gamificação ativo!');
    },
    
    carregarProgresso() {
        const dados = localStorage.getItem('marcenaria_gamificacao');
        if (dados) {
            const parsed = JSON.parse(dados);
            this.conquistas = { ...this.conquistas, ...parsed.conquistas };
            this.pontuacao = parsed.pontuacao || 0;
            this.nivel = parsed.nivel || 1;
        }
    },
    
    salvarProgresso() {
        localStorage.setItem('marcenaria_gamificacao', JSON.stringify({
            conquistas: this.conquistas,
            pontuacao: this.pontuacao,
            nivel: this.nivel
        }));
    },
    
    criarBadge() {
        const badge = document.createElement('div');
        badge.id = 'gamificacao-badge';
        badge.innerHTML = `
            <div style="font-size: 1.5rem;">🏆</div>
            <div style="font-size: 0.75rem; font-weight: 700;">NÍVEL ${this.nivel}</div>
        `;
        badge.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
            color: white;
            padding: 12px 18px;
            border-radius: 15px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
            z-index: 9999;
            text-align: center;
            transition: all 0.3s ease;
            line-height: 1.3;
        `;
        
        badge.onmouseenter = () => {
            badge.style.transform = 'scale(1.1)';
        };
        
        badge.onmouseleave = () => {
            badge.style.transform = 'scale(1)';
        };
        
        badge.onclick = () => this.exibirPainel();
        document.body.appendChild(badge);
    },
    
    desbloquearConquista(id) {
        if (this.conquistas[id] && !this.conquistas[id].desbloqueado) {
            this.conquistas[id].desbloqueado = true;
            this.pontuacao += this.conquistas[id].pontos;
            this.nivel = Math.floor(this.pontuacao / 100) + 1;
            
            this.salvarProgresso();
            this.mostrarNotificacaoConquista(this.conquistas[id]);
            this.atualizarBadge();
            
            // Confetes!
            this.lancarConfetes();
        }
    },
    
    mostrarNotificacaoConquista(conquista) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
            color: white;
            padding: 40px 50px;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            z-index: 99999;
            text-align: center;
            animation: conquista-popup 3s ease forwards;
        `;
        
        notif.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 15px;">🎉</div>
            <div style="font-size: 1.8rem; font-weight: 900; margin-bottom: 10px;">CONQUISTA DESBLOQUEADA!</div>
            <div style="font-size: 1.3rem; margin-bottom: 10px;">${conquista.titulo}</div>
            <div style="font-size: 0.95rem; opacity: 0.9;">${conquista.descricao}</div>
            <div style="margin-top: 20px; font-size: 1.5rem; font-weight: 700;">+${conquista.pontos} pontos</div>
        `;
        
        document.body.appendChild(notif);
        
        setTimeout(() => notif.remove(), 3000);
    },
    
    lancarConfetes() {
        const cores = ['#fbbf24', '#f59e0b', '#ec4899', '#8b5cf6', '#10b981'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confete = document.createElement('div');
                confete.textContent = ['🎉', '✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 5)];
                confete.style.cssText = `
                    position: fixed;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    font-size: ${20 + Math.random() * 30}px;
                    pointer-events: none;
                    z-index: 999999;
                    animation: confete-fall ${2 + Math.random() * 2}s ease-out forwards;
                `;
                
                document.body.appendChild(confete);
                setTimeout(() => confete.remove(), 4000);
            }, i * 50);
        }
    },
    
    atualizarBadge() {
        const badge = document.getElementById('gamificacao-badge');
        if (badge) {
            badge.innerHTML = `
                <div style="font-size: 1.5rem;">🏆</div>
                <div style="font-size: 0.75rem; font-weight: 700;">NÍVEL ${this.nivel}</div>
            `;
        }
    },
    
    verificarConquistas() {
        // Verificar conquistas baseadas em dados
        const totalProjetos = Object.values(window.BancoClientes || {})
            .reduce((acc, c) => acc + (c.projetos?.length || 0), 0);
        
        if (totalProjetos >= 1) {
            this.desbloquearConquista('primeiro-projeto');
        }
        
        // Verificar horário
        const hora = new Date().getHours();
        if (hora >= 0 && hora < 6) {
            this.desbloquearConquista('night-owl');
        } else if (hora >= 6 && hora < 8) {
            this.desbloquearConquista('madrugador');
        }
    },
    
    exibirPainel() {
        const conquistasDesbloqueadas = Object.values(this.conquistas).filter(c => c.desbloqueado).length;
        const conquistasTotais = Object.keys(this.conquistas).length;
        const progresso = (conquistasDesbloqueadas / conquistasTotais * 100).toFixed(0);
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header" style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; margin: -25px -25px 25px -25px; padding: 30px 25px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h2 style="margin: 0; color: white;">🏆 Suas Conquistas</h2>
                            <p style="margin: 5px 0 0 0; opacity: 0.9;">Nível ${this.nivel} • ${this.pontuacao} pontos</p>
                        </div>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="background: rgba(255,255,255,0.2); border: none; color: white;">×</button>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 20px; border-radius: 15px; margin-bottom: 25px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span style="font-weight: 700;">Progresso Geral</span>
                        <span style="font-weight: 700; color: #0ea5e9;">${progresso}%</span>
                    </div>
                    <div style="background: #e0f2fe; height: 20px; border-radius: 10px; overflow: hidden;">
                        <div style="background: linear-gradient(90deg, #0ea5e9 0%, #06b6d4 100%); height: 100%; width: ${progresso}%; transition: width 1s ease;"></div>
                    </div>
                    <div style="margin-top: 10px; text-align: center; color: #0369a1;">
                        ${conquistasDesbloqueadas} de ${conquistasTotais} conquistas desbloqueadas
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;">
                    ${Object.entries(this.conquistas).map(([id, conquista]) => `
                        <div class="card" style="
                            padding: 20px;
                            text-align: center;
                            ${conquista.desbloqueado ? 
                                'background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #fbbf24;' : 
                                'background: #f3f4f6; opacity: 0.5; filter: grayscale(100%);'}
                            transition: all 0.3s ease;
                        ">
                            <div style="font-size: 3rem; margin-bottom: 10px;">${conquista.desbloqueado ? '🏆' : '🔒'}</div>
                            <div style="font-weight: 700; margin-bottom: 5px; font-size: 1.1rem;">${conquista.titulo}</div>
                            <div style="font-size: 0.85rem; color: #6b7280; margin-bottom: 10px;">${conquista.descricao}</div>
                            <div style="font-weight: 700; color: #f59e0b;">${conquista.pontos} pontos</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
};

// ==================== TOUR INTERATIVO GUIADO ====================
const TourInterativo = {
    etapas: [
        { elemento: '#btn-voz', titulo: '🎤 Comandos de Voz', texto: 'Pressione V ou clique aqui para dar comandos de voz! Diga "ajuda" para ver todos os comandos.' },
        { elemento: '#gamificacao-badge', titulo: '🏆 Conquistas', texto: 'Complete desafios, ganhe pontos e suba de nível! Cada ação desbloqueia conquistas.' },
        { elemento: null, titulo: '⌨️ Atalhos Rápidos', texto: 'Ctrl+K = Busca | Ctrl+Q = Calculadora | V = Voz | ESC = Fechar' },
        { elemento: null, titulo: '📊 Dashboard Pro', texto: 'Execute: Dashboard.exibir() no console (F12) para ver análises completas!' },
        { elemento: null, titulo: '💎 CRM Inteligente', texto: 'Execute: CRM.exibirPainelCRM() para classificação automática de clientes!' }
    ],
    
    etapaAtual: 0,
    overlay: null,
    
    iniciar() {
        if (localStorage.getItem('tour_concluido') === 'true') {
            const refazer = confirm('Você já completou o tour. Deseja refazê-lo?');
            if (!refazer) return;
        }
        
        this.etapaAtual = 0;
        this.mostrarEtapa();
    },
    
    mostrarEtapa() {
        if (this.etapaAtual >= this.etapas.length) {
            this.finalizar();
            return;
        }
        
        const etapa = this.etapas[this.etapaAtual];
        
        // Criar overlay
        if (this.overlay) this.overlay.remove();
        
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 999998;
        `;
        
        // Destacar elemento se existir
        if (etapa.elemento) {
            const elemento = document.querySelector(etapa.elemento);
            if (elemento) {
                const rect = elemento.getBoundingClientRect();
                elemento.style.position = 'relative';
                elemento.style.zIndex = '999999';
                
                // Spotlight
                const spotlight = document.createElement('div');
                spotlight.style.cssText = `
                    position: fixed;
                    top: ${rect.top - 10}px;
                    left: ${rect.left - 10}px;
                    width: ${rect.width + 20}px;
                    height: ${rect.height + 20}px;
                    border: 3px solid #fbbf24;
                    border-radius: 15px;
                    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8);
                    z-index: 999999;
                    pointer-events: none;
                    animation: pulse-border 2s infinite;
                `;
                document.body.appendChild(spotlight);
            }
        }
        
        // Caixa de instrução
        const caixa = document.createElement('div');
        caixa.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            z-index: 9999999;
            max-width: 500px;
            text-align: center;
            animation: slideInUp 0.5s ease;
        `;
        
        caixa.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 20px;">${etapa.titulo.split(' ')[0]}</div>
            <h2 style="margin-bottom: 15px; color: #1f2937;">${etapa.titulo}</h2>
            <p style="color: #6b7280; line-height: 1.6; margin-bottom: 30px;">${etapa.texto}</p>
            
            <div style="display: flex; gap: 15px; justify-content: center;">
                ${this.etapaAtual > 0 ? `
                    <button onclick="TourInterativo.anterior()" class="btn btn-secondary">
                        ← Anterior
                    </button>
                ` : ''}
                <button onclick="TourInterativo.pular()" class="btn btn-secondary">
                    Pular Tour
                </button>
                <button onclick="TourInterativo.proxima()" class="btn btn-primary">
                    ${this.etapaAtual === this.etapas.length - 1 ? 'Finalizar ✓' : 'Próximo →'}
                </button>
            </div>
            
            <div style="margin-top: 20px; font-size: 0.85rem; color: #9ca3af;">
                ${this.etapaAtual + 1} de ${this.etapas.length}
            </div>
        `;
        
        document.body.appendChild(this.overlay);
        document.body.appendChild(caixa);
        
        this.caixa = caixa;
    },
    
    proxima() {
        this.limpar();
        this.etapaAtual++;
        this.mostrarEtapa();
    },
    
    anterior() {
        this.limpar();
        this.etapaAtual--;
        this.mostrarEtapa();
    },
    
    pular() {
        this.limpar();
        Toast.show('Tour cancelado. Pressione F1 para reabrir!', 'info');
    },
    
    finalizar() {
        this.limpar();
        localStorage.setItem('tour_concluido', 'true');
        
        // Animação de conclusão
        const final = document.createElement('div');
        final.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 50px 60px;
            border-radius: 25px;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
            z-index: 9999999;
            text-align: center;
            animation: slideInUp 0.5s ease;
        `;
        
        final.innerHTML = `
            <div style="font-size: 5rem; margin-bottom: 20px;">🎉</div>
            <h1 style="margin-bottom: 15px; color: white; font-size: 2rem;">Tour Concluído!</h1>
            <p style="margin-bottom: 30px; font-size: 1.1rem; opacity: 0.95;">
                Você está pronto para usar todas as funcionalidades!
            </p>
            <button onclick="this.parentElement.remove()" class="btn" style="background: white; color: #10b981; font-weight: 700;">
                Começar a Usar! 🚀
            </button>
        `;
        
        document.body.appendChild(final);
        
        // Desbloquear conquista
        if (typeof Gamificacao !== 'undefined') {
            setTimeout(() => {
                Gamificacao.desbloquearConquista('primeiro-projeto');
            }, 1000);
        }
    },
    
    limpar() {
        if (this.overlay) this.overlay.remove();
        if (this.caixa) this.caixa.remove();
        
        // Remover spotlight
        document.querySelectorAll('[style*="pulse-border"]').forEach(el => el.remove());
    }
};

// ==================== MODO FOCO (SEM DISTRAÇÕES) ====================
const ModoFoco = {
    ativo: false,
    
    ativar() {
        this.ativo = true;
        document.body.classList.add('modo-foco');
        
        // Ocultar elementos desnecessários
        const ocultar = ['#btn-voz', '#gamificacao-badge', '#dark-mode-toggle'];
        ocultar.forEach(sel => {
            const el = document.querySelector(sel);
            if (el) el.style.display = 'none';
        });
        
        // Fundo minimalista
        document.body.style.background = '#ffffff';
        
        Toast.show('🎯 Modo Foco ativado! Pressione F para desativar', 'info', 3000);
        
        // Música ambiente (opcional)
        this.tocarMusicaAmbiente();
    },
    
    desativar() {
        this.ativo = false;
        document.body.classList.remove('modo-foco');
        
        // Mostrar elementos novamente
        const mostrar = ['#btn-voz', '#gamificacao-badge', '#dark-mode-toggle'];
        mostrar.forEach(sel => {
            const el = document.querySelector(sel);
            if (el) el.style.display = '';
        });
        
        document.body.style.background = '';
        
        Toast.show('✅ Modo Foco desativado', 'success');
        
        this.pararMusicaAmbiente();
    },
    
    toggle() {
        if (this.ativo) {
            this.desativar();
        } else {
            this.ativar();
        }
    },
    
    tocarMusicaAmbiente() {
        // Placeholder - pode integrar com API de música ou sons locais
        console.log('🎵 Música ambiente (implementar se desejar)');
    },
    
    pararMusicaAmbiente() {
        console.log('🔇 Música pausada');
    }
};

// ==================== EASTER EGGS DIVERTIDOS ====================
const EasterEggs = {
    codigo: [],
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    
    init() {
        document.addEventListener('keydown', (e) => {
            this.codigo.push(e.key);
            if (this.codigo.length > 10) this.codigo.shift();
            
            if (this.codigo.join(',') === this.konamiCode.join(',')) {
                this.ativarKonami();
                this.codigo = [];
            }
        });
        
        // Easter egg: clicar 10x no logo
        let cliques = 0;
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'H1') {
                cliques++;
                if (cliques === 10) {
                    this.modoMatriz();
                    cliques = 0;
                }
            }
        });
    },
    
    ativarKonami() {
        Toast.show('🎮 CÓDIGO KONAMI ATIVADO!', 'success', 3000);
        
        // Efeito visual louco
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Parabéns! Você encontrou o Easter Egg!\n\n+1000 pontos de desenvolvedor!');
        }, 2000);
    },
    
    modoMatriz() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999999;
            pointer-events: none;
        `;
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        let frameCount = 0;
        const maxFrames = 200;
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0f0';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            
            frameCount++;
            if (frameCount < maxFrames) {
                requestAnimationFrame(draw);
            } else {
                canvas.remove();
                Toast.show('🟢 Modo Matrix desativado!', 'success');
            }
        }
        
        draw();
        Toast.show('🟢 BEM-VINDO À MATRIX!', 'success', 3000);
    }
};

// ==================== ANIMAÇÕES CSS EXTRAS ====================
const AnimacoesExtras = `
@keyframes pulse-border {
    0%, 100% { border-color: #fbbf24; box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7); }
    50% { border-color: #f59e0b; box-shadow: 0 0 0 10px rgba(251, 191, 36, 0); }
}

@keyframes conquista-popup {
    0% { transform: translate(-50%, -50%) scale(0); }
    50% { transform: translate(-50%, -50%) scale(1.1); }
    70% { transform: translate(-50%, -50%) scale(0.95); }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    95% { opacity: 1; }
    100% { opacity: 0; }
}

@keyframes confete-fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}

kbd {
    background: #f3f4f6;
    border: 1px solid #d1d5d8;
    border-radius: 5px;
    padding: 3px 8px;
    font-family: monospace;
    font-size: 0.9em;
    box-shadow: 0 2px 0 #d1d5d8;
}
`;

// Injetar CSS
const style = document.createElement('style');
style.textContent = AnimacoesExtras;
document.head.appendChild(style);

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('');
    console.log('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉');
    console.log('🚀 MODO SURPRESA ATIVADO!');
    console.log('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉');
    console.log('');
    
    setTimeout(() => {
        // Inicializar tudo
        const vozOk = ComandosVoz.init();
        Gamificacao.init();
        EasterEggs.init();
        
        console.log('');
        console.log('✨ FUNCIONALIDADES SURPREENDENTES:');
        console.log('');
        console.log('🎤 COMANDOS DE VOZ (Pressione V):');
        console.log('   - "abrir busca", "calculadora", "dashboard"');
        console.log('   - "dark mode", "clientes vip", "relatório"');
        console.log('   - Digite: ComandosVoz.listarComandos()');
        console.log('');
        console.log('🏆 GAMIFICAÇÃO:');
        console.log('   - Sistema de conquistas e pontos');
        console.log('   - Suba de nível fazendo ações');
        console.log('   - Digite: Gamificacao.exibirPainel()');
        console.log('');
        console.log('🎓 TOUR INTERATIVO (Pressione F1):');
        console.log('   - Guia completo do sistema');
        console.log('   - Digite: TourInterativo.iniciar()');
        console.log('');
        console.log('🎯 MODO FOCO (Pressione F):');
        console.log('   - Trabalhe sem distrações');
        console.log('   - Digite: ModoFoco.toggle()');
        console.log('');
        console.log('🎮 EASTER EGGS:');
        console.log('   - Código Konami: ↑↑↓↓←→←→BA');
        console.log('   - Clique 10x no título');
        console.log('');
        console.log('💎 Você tem o sistema MAIS AVANÇADO!');
        console.log('');
        
        // Atalhos globais
        document.addEventListener('keydown', (e) => {
            // F1 = Tour
            if (e.key === 'F1') {
                e.preventDefault();
                TourInterativo.iniciar();
            }
            
            // F = Modo Foco
            if (e.key === 'f' && !e.ctrlKey && !e.metaKey && 
                !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                ModoFoco.toggle();
            }
        });
        
        // Mostrar tour na primeira vez
        if (!localStorage.getItem('tour_concluido')) {
            setTimeout(() => {
                if (confirm('🎉 Bem-vindo ao sistema mais avançado!\n\nDeseja fazer um tour rápido pelas novas funcionalidades surpreendentes?')) {
                    TourInterativo.iniciar();
                }
            }, 2000);
        } else {
            // Mensagem de boas-vindas
            setTimeout(() => {
                Toast.show('🚀 Sistema carregado! Pressione V para comandos de voz', 'success', 4000);
            }, 1500);
        }
        
    }, 2500);
});

// Exportar globalmente
window.ComandosVoz = ComandosVoz;
window.Gamificacao = Gamificacao;
window.TourInterativo = TourInterativo;
window.ModoFoco = ModoFoco;
window.EasterEggs = EasterEggs;
