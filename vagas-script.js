// Script para gerenciar vagas inclusivas
class VagasManager {
    constructor() {
        this.vagas = [];
        this.vagasFiltradas = [];
        this.init();
    }

    async init() {
        await this.carregarVagas();
        this.renderizarVagas();
        this.configurarFiltros();
        this.configurarBusca();
    }

    async carregarVagas() {
        try {
            const response = await fetch('vagas.json');
            const data = await response.json();
            this.vagas = data.vagas;
            this.vagasFiltradas = [...this.vagas];
        } catch (error) {
            console.error('Erro ao carregar vagas:', error);
            // Fallback com dados estáticos caso o JSON não carregue
            this.carregarVagasEstaticas();
        }
    }

    carregarVagasEstaticas() {
        // Dados de fallback caso o JSON não carregue
        this.vagas = [
            {
                id: 1,
                titulo: "Assistente Administrativo",
                empresa: "Tech Solutions Ltda",
                localizacao: "Manaus/AM",
                setor: "Administrativo",
                tipoDeficiencia: "Deficiência Auditiva",
                requisitos: "Ensino médio completo, conhecimentos em planilhas",
                libras: "valorizado",
                salario: "R$ 1.800,00"
            },
            {
                id: 2,
                titulo: "Designer Gráfico",
                empresa: "Creative Minds",
                localizacao: "Remoto",
                setor: "Tecnologia",
                tipoDeficiencia: "Deficiência Auditiva",
                requisitos: "Conhecimento em Photoshop, Illustrator",
                libras: "necessario",
                salario: "R$ 3.500,00"
            }
        ];
        this.vagasFiltradas = [...this.vagas];
    }

    renderizarVagas() {
        const container = document.querySelector('.vagas-container');
        if (!container) {
            console.error('Container de vagas não encontrado');
            return;
        }

        if (this.vagasFiltradas.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center">
                        <h5>Nenhuma vaga encontrada</h5>
                        <p>Tente ajustar os filtros para encontrar mais oportunidades.</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.vagasFiltradas.map(vaga => this.criarCardVaga(vaga)).join('');
        
        // Atualizar contador de vagas
        this.atualizarContador();
    }

    criarCardVaga(vaga) {
        const badgeLibras = this.getBadgeLibras(vaga.libras);
        const badgeDeficiencia = this.getBadgeDeficiencia(vaga.tipoDeficiencia);
        
        return `
            <div class="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div class="card h-100 border-0 shadow-sm vaga-card" data-vaga-id="${vaga.id}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-3">
                            <span class="badge ${badgeDeficiencia.class}">${vaga.tipoDeficiencia}</span>
                            <span class="text-primary fw-bold">${vaga.localizacao}</span>
                        </div>
                        <h4 class="mb-3 vaga-titulo">${vaga.titulo}</h4>
                        <p class="mb-2"><strong>Empresa:</strong> <span class="vaga-empresa">${vaga.empresa}</span></p>
                        <p class="mb-2"><strong>Setor:</strong> <span class="vaga-setor">${vaga.setor}</span></p>
                        <p class="mb-2"><strong>Salário:</strong> <span class="text-success fw-bold">${vaga.salario}</span></p>
                        <p class="mb-3"><strong>Requisitos:</strong> <span class="vaga-requisitos">${vaga.requisitos}</span></p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge ${badgeLibras.class}">
                                <i class="fa fa-hands me-1"></i> ${badgeLibras.texto}
                            </span>
                            <div>
                                <button class="btn btn-sm btn-outline-primary me-2" onclick="vagasManager.verDetalhes(${vaga.id})">
                                    <i class="fa fa-eye"></i> Detalhes
                                </button>
                                <button class="btn btn-sm btn-primary" onclick="vagasManager.candidatar(${vaga.id})">
                                    <i class="fa fa-paper-plane"></i> Candidatar-se
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getBadgeLibras(libras) {
        switch(libras) {
            case 'necessario':
                return { class: 'bg-danger text-white', texto: 'Libras necessário' };
            case 'valorizado':
                return { class: 'bg-warning text-dark', texto: 'Libras valorizado' };
            default:
                return { class: 'bg-light text-dark', texto: 'Libras não necessário' };
        }
    }

    getBadgeDeficiencia(tipo) {
        const cores = {
            'Deficiência Auditiva': 'bg-primary',
            'Deficiência Visual': 'bg-success',
            'Deficiência Física': 'bg-info',
            'Outras Deficiências': 'bg-secondary',
            'Todas as deficiências': 'bg-dark'
        };
        return { class: cores[tipo] || 'bg-primary' };
    }

    configurarFiltros() {
        // Configurar filtros de checkbox
        const checkboxes = document.querySelectorAll('.filtro-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.aplicarFiltros());
        });

        // Configurar filtros de select
        const selects = document.querySelectorAll('.filtro-select');
        selects.forEach(select => {
            select.addEventListener('change', () => this.aplicarFiltros());
        });

        // Botão aplicar filtros
        const btnAplicar = document.querySelector('.btn-aplicar-filtros');
        if (btnAplicar) {
            btnAplicar.addEventListener('click', () => this.aplicarFiltros());
        }

        // Botão limpar filtros
        this.adicionarBotaoLimparFiltros();
    }

    configurarBusca() {
        // Adicionar campo de busca se não existir
        this.adicionarCampoBusca();
        
        const campoBusca = document.querySelector('#busca-vagas');
        if (campoBusca) {
            campoBusca.addEventListener('input', (e) => {
                this.buscarVagas(e.target.value);
            });
        }
    }

    adicionarCampoBusca() {
        const filtrosContainer = document.querySelector('.card-body');
        if (filtrosContainer && !document.querySelector('#busca-vagas')) {
            const campoBuscaHTML = `
                <div class="mb-3">
                    <h6 class="mb-3">Buscar Vagas</h6>
                    <div class="input-group">
                        <input type="text" class="form-control" id="busca-vagas" 
                               placeholder="Digite cargo, empresa ou palavra-chave...">
                        <button class="btn btn-outline-primary" type="button" onclick="vagasManager.limparBusca()">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <hr>
            `;
            filtrosContainer.insertAdjacentHTML('afterbegin', campoBuscaHTML);
        }
    }

    adicionarBotaoLimparFiltros() {
        const btnAplicar = document.querySelector('.btn-aplicar-filtros');
        if (btnAplicar && !document.querySelector('.btn-limpar-filtros')) {
            const btnLimpar = `
                <button class="btn btn-outline-secondary w-100 mt-2 btn-limpar-filtros">
                    <i class="fa fa-refresh"></i> Limpar Filtros
                </button>
            `;
            btnAplicar.insertAdjacentHTML('afterend', btnLimpar);
            
            document.querySelector('.btn-limpar-filtros').addEventListener('click', () => {
                this.limparFiltros();
            });
        }
    }

    buscarVagas(termo) {
        if (!termo.trim()) {
            this.aplicarFiltros();
            return;
        }

        const termoLower = termo.toLowerCase();
        this.vagasFiltradas = this.vagas.filter(vaga => {
            return vaga.titulo.toLowerCase().includes(termoLower) ||
                   vaga.empresa.toLowerCase().includes(termoLower) ||
                   vaga.requisitos.toLowerCase().includes(termoLower) ||
                   vaga.setor.toLowerCase().includes(termoLower) ||
                   vaga.localizacao.toLowerCase().includes(termoLower);
        });

        this.renderizarVagas();
    }

    aplicarFiltros() {
        let vagasFiltradas = [...this.vagas];

        // Filtro por tipo de deficiência
        const deficienciasSelecionadas = this.getCheckboxesSelecionados('deficiencia');
        if (deficienciasSelecionadas.length > 0) {
            vagasFiltradas = vagasFiltradas.filter(vaga => {
                return deficienciasSelecionadas.some(def => 
                    vaga.tipoDeficiencia === def || vaga.tipoDeficiencia === 'Todas as deficiências'
                );
            });
        }

        // Filtro por Libras
        const librasSelecionadas = this.getCheckboxesSelecionados('libras');
        if (librasSelecionadas.length > 0) {
            vagasFiltradas = vagasFiltradas.filter(vaga => {
                return librasSelecionadas.includes(vaga.libras);
            });
        }

        // Filtro por setor
        const setorSelecionado = document.querySelector('#filtro-setor')?.value;
        if (setorSelecionado && setorSelecionado !== 'todos') {
            vagasFiltradas = vagasFiltradas.filter(vaga => 
                vaga.setor.toLowerCase() === setorSelecionado.toLowerCase()
            );
        }

        // Filtro por localização
        const localizacaoSelecionada = document.querySelector('#filtro-localizacao')?.value;
        if (localizacaoSelecionada && localizacaoSelecionada !== 'todas') {
            vagasFiltradas = vagasFiltradas.filter(vaga => 
                vaga.localizacao.toLowerCase().includes(localizacaoSelecionada.toLowerCase())
            );
        }

        this.vagasFiltradas = vagasFiltradas;
        this.renderizarVagas();
    }

    getCheckboxesSelecionados(tipo) {
        const checkboxes = document.querySelectorAll(`input[data-filtro="${tipo}"]:checked`);
        return Array.from(checkboxes).map(cb => cb.value);
    }

    limparFiltros() {
        // Limpar checkboxes
        document.querySelectorAll('.filtro-checkbox').forEach(cb => cb.checked = false);
        
        // Limpar selects
        document.querySelectorAll('.filtro-select').forEach(select => select.selectedIndex = 0);
        
        // Limpar busca
        const campoBusca = document.querySelector('#busca-vagas');
        if (campoBusca) campoBusca.value = '';
        
        // Mostrar todas as vagas
        this.vagasFiltradas = [...this.vagas];
        this.renderizarVagas();
    }

    limparBusca() {
        const campoBusca = document.querySelector('#busca-vagas');
        if (campoBusca) {
            campoBusca.value = '';
            this.aplicarFiltros();
        }
    }

    atualizarContador() {
        let contador = document.querySelector('.contador-vagas');
        if (!contador) {
            const titulo = document.querySelector('h1.mb-0');
            if (titulo) {
                contador = document.createElement('p');
                contador.className = 'contador-vagas text-muted mt-2';
                titulo.parentNode.appendChild(contador);
            }
        }
        
        if (contador) {
            contador.textContent = `${this.vagasFiltradas.length} vaga(s) encontrada(s)`;
        }
    }

    verDetalhes(vagaId) {
        const vaga = this.vagas.find(v => v.id === vagaId);
        if (!vaga) return;

        // Criar modal de detalhes
        const modalHTML = `
            <div class="modal fade" id="modalDetalhes" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${vaga.titulo}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Empresa:</strong> ${vaga.empresa}</p>
                                    <p><strong>Localização:</strong> ${vaga.localizacao}</p>
                                    <p><strong>Setor:</strong> ${vaga.setor}</p>
                                    <p><strong>Salário:</strong> <span class="text-success">${vaga.salario}</span></p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Tipo de Deficiência:</strong> ${vaga.tipoDeficiencia}</p>
                                    <p><strong>Libras:</strong> ${this.getBadgeLibras(vaga.libras).texto}</p>
                                </div>
                            </div>
                            <hr>
                            <h6>Requisitos:</h6>
                            <p>${vaga.requisitos}</p>
                            ${vaga.descricao ? `
                                <h6>Descrição da Vaga:</h6>
                                <p>${vaga.descricao}</p>
                            ` : ''}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" class="btn btn-primary" onclick="vagasManager.candidatar(${vaga.id})">
                                <i class="fa fa-paper-plane"></i> Candidatar-se
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remover modal existente se houver
        const modalExistente = document.querySelector('#modalDetalhes');
        if (modalExistente) modalExistente.remove();

        // Adicionar novo modal
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Mostrar modal
        const modal = new bootstrap.Modal(document.querySelector('#modalDetalhes'));
        modal.show();
    }

    candidatar(vagaId) {
        const vaga = this.vagas.find(v => v.id === vagaId);
        if (!vaga) return;

        // Simular processo de candidatura
        if (confirm(`Deseja se candidatar para a vaga de ${vaga.titulo} na empresa ${vaga.empresa}?`)) {
            alert('Candidatura enviada com sucesso! Entraremos em contato em breve.');
            
            // Aqui você poderia implementar o envio real da candidatura
            console.log('Candidatura enviada para:', vaga);
        }
    }

    // Método para exportar vagas filtradas
    exportarVagas() {
        const dados = this.vagasFiltradas.map(vaga => ({
            Título: vaga.titulo,
            Empresa: vaga.empresa,
            Localização: vaga.localizacao,
            Setor: vaga.setor,
            Salário: vaga.salario,
            'Tipo de Deficiência': vaga.tipoDeficiencia,
            Libras: this.getBadgeLibras(vaga.libras).texto
        }));

        const csv = this.converterParaCSV(dados);
        this.downloadCSV(csv, 'vagas-inclusivas.csv');
    }

    converterParaCSV(dados) {
        if (dados.length === 0) return '';
        
        const headers = Object.keys(dados[0]);
        const csvContent = [
            headers.join(','),
            ...dados.map(row => headers.map(header => `"${row[header]}"`).join(','))
        ].join('\n');
        
        return csvContent;
    }

    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    window.vagasManager = new VagasManager();
});

// Adicionar estilos CSS para melhorar a aparência
const estilosAdicionais = `
<style>
.vaga-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.vaga-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.contador-vagas {
    font-size: 0.9rem;
    margin-top: 0.5rem;
}

#busca-vagas {
    border-radius: 0.375rem 0 0 0.375rem;
}

.input-group .btn {
    border-radius: 0 0.375rem 0.375rem 0;
}

.badge {
    font-size: 0.75rem;
}

.vaga-titulo {
    color: #2c3e50;
    font-weight: 600;
}

.vaga-empresa {
    color: #3498db;
    font-weight: 500;
}

.modal-content {
    border-radius: 0.5rem;
    border: none;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.modal-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 0.5rem 0.5rem 0 0;
}

.modal-header .btn-close {
    filter: invert(1);
}

@media (max-width: 768px) {
    .vaga-card {
        margin-bottom: 1rem;
    }
    
    .d-flex.justify-content-between {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML('beforeend', estilosAdicionais);
