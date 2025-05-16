const formLivros = document.querySelector('#form-cad-livros');
const livroEl = document.querySelector('#nome-livro');
const autorEl = document.querySelector('#nome-autor');
const editoraEl = document.querySelector('#nome-editora');
const isbnEl = document.querySelector('#n-isbn');
const paginasEl = document.querySelector('#qntd-pag');
const listaLivros = document.querySelector('#lista-livros');

let livros = JSON.parse(localStorage.getItem('livros')) || [];

formLivros.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome_livro = livroEl.value;
    const nome_autor = autorEl.value;
    const nome_editora = editoraEl.value;
    const n_isbn = isbnEl.value;
    const n_paginas = paginasEl.value;

    livros.push({ nome_livro, nome_autor, nome_editora, n_isbn, n_paginas });
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
    paginasEl.value = '';

    livroEl.focus();
}

function mostraLivros() {
    if (livros.length > 0) {
        listaLivros.innerHTML = '';
        livros.forEach((livro, id) => {
            listaLivros.insertAdjacentHTML('beforeend', `
                <div class="livro">
                    <div class="capa">
                        <div class="titulo">${livro.nome_livro}</div>
                        <div class="autor">${livro.nome_autor}</div>
                     </div>
                    <div class="info">
                        <span class="editora">${livro.nome_editora}</span>
                        <span class="paginas">${livro.n_paginas}pag</span>
                    </div>
                </div>
                `)
        })
    }
}

mostraLivros();