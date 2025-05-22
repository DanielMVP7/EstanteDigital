const formLivros = document.querySelector('#form-cad-livros');
const livroEl = document.querySelector('#nome-livro');
const autorEl = document.querySelector('#nome-autor');
const editoraEl = document.querySelector('#nome-editora');
const isbnEl = document.querySelector('#n-isbn');
const paginasTotalEl = document.querySelector('#qntd-pag');
const paginasAtualEl = document.querySelector('#atual-pag');
const limparBtn = document.querySelector('#limpar');
const listaLivros = document.querySelector('#lista-livros');

let livros = JSON.parse(localStorage.getItem('livros')) || [];

formLivros.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome_livro = livroEl.value;
    const nome_autor = autorEl.value;
    const nome_editora = editoraEl.value;
    const n_isbn = isbnEl.value;
    const n_paginas = paginasTotalEl.value;
    const atual_paginas = paginasAtualEl.value;

    livros.push({ nome_livro, nome_autor, nome_editora, n_isbn, n_paginas, atual_paginas});
    console.table(livros)

    localStorage.setItem('livros', JSON.stringify(livros));

    mostraLivros();

    limpaCampos();
});

function limpaCampos() {
    livroEl.value = '';
    autorEl.value = '';
    editoraEl.value = '';
    isbnEl.value = '';
    paginasTotalEl.value = '';
    paginasAtualEl.value = '';

    livroEl.focus();
}

function mostraLivros() {
    if (livros.length > 0) {
        listaLivros.innerHTML = '';
        livros.forEach((livro, id) => {
            listaLivros.insertAdjacentHTML('beforeend', `
                <div class="card" data-id="${id}">
                    <div class="livro">
                        <div class="capa">
                            <div class="titulo">${livro.nome_livro}</div>
                            <div class="autor">${livro.nome_autor}</div>
                        </div>
                        <div class="info">
                            <div>
                                <p class="editora">Editora: ${livro.nome_editora}</p>
                                <p class="paginas">Páginas: ${livro.atual_paginas}/${livro.n_paginas}</p>
                            </div>
                            <button class="btn-excluir">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                `)
        })
        
        document.querySelectorAll('.btn-excluir').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.card');
                const id = card.dataset.id;
                excluirLivro(id);
            });
        });
    } else {
        listaLivros.innerHTML = '';
    }
}

function excluirLivro(id) {
    if(confirm('Deseja realmente excluir este livro?')) {
        livros.splice(id, 1);
        localStorage.setItem('livros', JSON.stringify(livros));
        mostraLivros();
    }
}

limparBtn.addEventListener('click', limpaCampos);

mostraLivros();