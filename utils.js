/**
 * MARCENARIA PRO - Utilitários e Melhorias
 * Versão: 2026.2.0
 * Arquivo com funções auxiliares, validações, sanitização e melhorias
 */

// ==================== SISTEMA DE LOADING ====================
const LoadingSystem = {
    overlay: null,
    
    init() {
        if (!this.overlay) {
            this.overlay = document.createElement('div');
            this.overlay.id = 'loading-overlay';
            this.overlay.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p class="loading-text">Processando...</p>
                </div>
            `;
            document.body.appendChild(this.overlay);
        }
    },
    
    show(text = 'Processando...') {
        this.init();
        const loadingText = this.overlay.querySelector('.loading-text');
        if (loadingText) loadingText.textContent = text;
        this.overlay.classList.add('active');
    },
    
    hide() {
        if (this.overlay) {
            this.overlay.classList.remove('active');
        }
    }
};

// ==================== SISTEMA DE CONFIRMAÇÃO ====================
const ConfirmDialog = {
    show(options = {}) {
        return new Promise((resolve) => {
            const {
                title = 'Confirmar Ação',
                message = 'Tem certeza que deseja continuar?',
                confirmText = 'Confirmar',
                cancelText = 'Cancelar',
                type = 'warning' // warning, danger, info
            } = options;
            
            const overlay = document.createElement('div');
            overlay.className = 'confirm-overlay active';
            overlay.innerHTML = `
                <div class="confirm-dialog ${type}">
                    <h3>${title}</h3>
                    <p>${message}</p>
                    <div class="confirm-buttons">
                        <button class="btn btn-secondary confirm-cancel">${cancelText}</button>
                        <button class="btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'} confirm-ok">${confirmText}</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(overlay);
            
            const handleResponse = (confirmed) => {
                overlay.classList.remove('active');
                setTimeout(() => overlay.remove(), 300);
                resolve(confirmed);
            };
            
            overlay.querySelector('.confirm-cancel').onclick = () => handleResponse(false);
            overlay.querySelector('.confirm-ok').onclick = () => handleResponse(true);
            overlay.onclick = (e) => {
                if (e.target === overlay) handleResponse(false);
            };
        });
    }
};

// ==================== SANITIZAÇÃO DE INPUTS ====================
const Sanitizer = {
    /**
     * Remove tags HTML e scripts perigosos
     */
    sanitizeHTML(str) {
        if (!str) return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },
    
    /**
     * Sanitiza input numérico
     */
    sanitizeNumber(value, options = {}) {
        const { min = null, max = null, decimals = 2 } = options;
        let num = parseFloat(value);
        
        if (isNaN(num)) return 0;
        if (min !== null && num < min) num = min;
        if (max !== null && num > max) num = max;
        
        return parseFloat(num.toFixed(decimals));
    },
    
    /**
     * Sanitiza nome de arquivo
     */
    sanitizeFileName(str) {
        return str.replace(/[^a-z0-9_\-\.]/gi, '_');
    },
    
    /**
     * Remove espaços extras
     */
    sanitizeText(str) {
        return str.trim().replace(/\s+/g, ' ');
    }
};

// ==================== VALIDAÇÕES AVANÇADAS ====================
const Validator = {
    /**
     * Valida campo obrigatório
     */
    required(value, fieldName = 'Campo') {
        if (!value || value.toString().trim() === '') {
            return { valid: false, message: `${fieldName} é obrigatório` };
        }
        return { valid: true };
    },
    
    /**
     * Valida número positivo
     */
    positiveNumber(value, fieldName = 'Valor') {
        const num = parseFloat(value);
        if (isNaN(num) || num <= 0) {
            return { valid: false, message: `${fieldName} deve ser um número positivo` };
        }
        return { valid: true };
    },
    
    /**
     * Valida email
     */
    email(value) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            return { valid: false, message: 'Email inválido' };
        }
        return { valid: true };
    },
    
    /**
     * Valida telefone brasileiro
     */
    phone(value) {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length < 10 || cleaned.length > 11) {
            return { valid: false, message: 'Telefone inválido' };
        }
        return { valid: true };
    },
    
    /**
     * Valida range numérico
     */
    range(value, min, max, fieldName = 'Valor') {
        const num = parseFloat(value);
        if (isNaN(num) || num < min || num > max) {
            return { valid: false, message: `${fieldName} deve estar entre ${min} e ${max}` };
        }
        return { valid: true };
    }
};

// ==================== FORMATADORES ====================
const Formatter = {
    /**
     * Formata moeda brasileira
     */
    currency(value) {
        return new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        }).format(value || 0);
    },
    
    /**
     * Formata data
     */
    date(date) {
        if (!date) return '-';
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    },
    
    /**
     * Formata data com hora
     */
    datetime(date) {
        if (!date) return '-';
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    },
    
    /**
     * Formata número com separador de milhar
     */
    number(value, decimals = 2) {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value || 0);
    },
    
    /**
     * Formata telefone
     */
    phone(value) {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `(${cleaned.slice(0,2)}) ${cleaned.slice(2,7)}-${cleaned.slice(7)}`;
        } else if (cleaned.length === 10) {
            return `(${cleaned.slice(0,2)}) ${cleaned.slice(2,6)}-${cleaned.slice(6)}`;
        }
        return value;
    },
    
    /**
     * Formata tamanho de arquivo
     */
    fileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
};

// ==================== SISTEMA DE NOTIFICAÇÕES TOAST ====================
const Toast = {
    container: null,
    
    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            document.body.appendChild(this.container);
        }
    },
    
    show(message, type = 'info', duration = 3000) {
        this.init();
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
        `;
        
        this.container.appendChild(toast);
        
        // Animar entrada
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Remover após duração
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

// Manter compatibilidade com função antiga
window.showToast = (message, type) => Toast.show(message, type);

// ==================== SISTEMA DE DARK MODE ====================
const DarkMode = {
    key: 'marcenaria_pro_dark_mode',
    
    init() {
        const saved = localStorage.getItem(this.key);
        if (saved === 'true') {
            this.enable();
        }
        this.createToggle();
    },
    
    enable() {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem(this.key, 'true');
    },
    
    disable() {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(this.key, 'false');
    },
    
    toggle() {
        if (document.documentElement.hasAttribute('data-theme')) {
            this.disable();
        } else {
            this.enable();
        }
    },
    
    createToggle() {
        // Adiciona botão de dark mode no header
        const header = document.querySelector('header');
        if (header && !document.getElementById('dark-mode-toggle')) {
            const toggle = document.createElement('button');
            toggle.id = 'dark-mode-toggle';
            toggle.className = 'dark-mode-toggle';
            toggle.innerHTML = '🌙';
            toggle.title = 'Alternar modo escuro';
            toggle.onclick = () => {
                this.toggle();
                toggle.innerHTML = document.documentElement.hasAttribute('data-theme') ? '☀️' : '🌙';
            };
            header.appendChild(toggle);
            
            // Atualizar ícone inicial
            if (document.documentElement.hasAttribute('data-theme')) {
                toggle.innerHTML = '☀️';
            }
        }
    }
};

// ==================== UTILITÁRIOS GERAIS ====================
const Utils = {
    /**
     * Debounce para otimizar chamadas frequentes
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Copia texto para clipboard
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            Toast.show('Copiado para área de transferência!', 'success');
            return true;
        } catch (err) {
            console.error('Erro ao copiar:', err);
            Toast.show('Erro ao copiar', 'error');
            return false;
        }
    },
    
    /**
     * Gera ID único
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    /**
     * Deep clone de objeto
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    
    /**
     * Aguarda tempo especificado
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// ==================== SISTEMA DE ATALHOS DE TECLADO ====================
const Shortcuts = {
    init() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+S ou Cmd+S - Salvar
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if (typeof window.salvarBancoClientes === 'function') {
                    window.salvarBancoClientes();
                    Toast.show('✅ Dados salvos!', 'success');
                }
            }
            
            // Ctrl+E ou Cmd+E - Exportar
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                if (typeof window.exportarBancoClientesJSON === 'function') {
                    window.exportarBancoClientesJSON();
                }
            }
            
            // Ctrl+K ou Cmd+K - Busca rápida (futuro)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                Toast.show('Busca rápida em desenvolvimento', 'info');
            }
            
            // ESC - Fechar modais
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal-overlay.active, .confirm-overlay.active');
                modals.forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });
    }
};

// ==================== MELHORIAS NAS FUNÇÕES EXISTENTES ====================

/**
 * Wrapper melhorado para deletar projeto com confirmação
 */
window.deletarProjetoClienteComConfirmacao = async function(clienteId, projetoId) {
    const confirmed = await ConfirmDialog.show({
        title: '⚠️ Deletar Projeto',
        message: 'Esta ação não pode ser desfeita. Deseja realmente deletar este projeto?',
        confirmText: 'Sim, Deletar',
        cancelText: 'Cancelar',
        type: 'danger'
    });
    
    if (confirmed) {
        LoadingSystem.show('Deletando projeto...');
        await Utils.sleep(300); // Feedback visual
        
        if (typeof window.deletarProjetoCliente === 'function') {
            window.deletarProjetoCliente(clienteId, projetoId);
            Toast.show('Projeto deletado com sucesso!', 'success');
        }
        
        LoadingSystem.hide();
    }
};

/**
 * Wrapper melhorado para salvar com feedback
 */
window.salvarComFeedback = async function() {
    LoadingSystem.show('Salvando dados...');
    await Utils.sleep(500);
    
    try {
        if (typeof window.salvarBancoClientes === 'function') {
            window.salvarBancoClientes();
        }
        if (typeof window.salvarAppData === 'function') {
            window.salvarAppData();
        }
        Toast.show('✅ Dados salvos com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao salvar:', error);
        Toast.show('❌ Erro ao salvar dados', 'error');
    } finally {
        LoadingSystem.hide();
    }
};

/**
 * Validação de formulário genérica
 */
window.validarFormulario = function(formData, rules) {
    const errors = [];
    
    for (const [field, rule] of Object.entries(rules)) {
        const value = formData[field];
        
        if (rule.required) {
            const result = Validator.required(value, rule.label || field);
            if (!result.valid) errors.push(result.message);
        }
        
        if (rule.type === 'number' && value) {
            const result = Validator.positiveNumber(value, rule.label || field);
            if (!result.valid) errors.push(result.message);
        }
        
        if (rule.type === 'email' && value) {
            const result = Validator.email(value);
            if (!result.valid) errors.push(result.message);
        }
        
        if (rule.min !== undefined && rule.max !== undefined && value) {
            const result = Validator.range(value, rule.min, rule.max, rule.label || field);
            if (!result.valid) errors.push(result.message);
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Utilitários carregados - Versão 2026.2.0');
    
    // Inicializar sistemas
    LoadingSystem.init();
    Toast.init();
    DarkMode.init();
    Shortcuts.init();
    
    console.log('✅ Dark Mode disponível');
    console.log('✅ Sistema de Loading ativo');
    console.log('✅ Confirmações inteligentes ativas');
    console.log('✅ Atalhos de teclado: Ctrl+S (salvar), Ctrl+E (exportar)');
});

// Exportar para uso global
window.LoadingSystem = LoadingSystem;
window.ConfirmDialog = ConfirmDialog;
window.Sanitizer = Sanitizer;
window.Validator = Validator;
window.Formatter = Formatter;
window.Toast = Toast;
window.DarkMode = DarkMode;
window.Utils = Utils;
window.Shortcuts = Shortcuts;
