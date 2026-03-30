import { createInterface } from 'readline'
import { cadastrarLivro, removerLivro, listarLivros, marcarComoNaoLido, marcarComoLido, semResposta, filtrarPosicaoLivro } from './utils.js'
import { log } from 'console'

const reader = createInterface({
    input: process.stdin,
    output: process.stdout
})

const caminhoArquivo = './src/livros.json'

// Por ser um projeto pequeno não me preocupei com risco de stack overflow por causa das recursões
export function mostrarMenu() {

    setTimeout(() => {
        reader.question('O que gostaria de fazer?\n a) Adicionar novo livro \n b) Listar livros \n c) Marcar como lido/não lido \n d) Remover livro \n e) Sair \n > ', crud => {

            // Adiciona um novo livro
            if (crud.toLowerCase() === 'a') {

                // Fluxo para cadastrar um livro
                pedirInfosLivro(livro => {

                    const add = cadastrarLivro(caminhoArquivo, livro)

                    if (add) {
                        console.log('\nLivro adicionado com sucesso!')
                    }

                    mostrarMenu()

                })

                // Listar livros
            } else if (crud.toLowerCase() === 'b') {

                const livrosAtuais = listarLivros(caminhoArquivo)

                console.log('\nLivros atuais:\n\n', livrosAtuais, '\n')
                mostrarMenu()

                // Marcar com lido/não lido
            } else if (crud.toLowerCase() === 'c') {

                reader.question('\nQual livro você gostaria de marcar como lido/não lido? ', titulo => {

                    const livrosAtuais = listarLivros(caminhoArquivo)

                    const posicaoLivro = filtrarPosicaoLivro(livrosAtuais, titulo.toLowerCase())

                    // Se o findIndex retornar -1
                    if (posicaoLivro === -1) {
                        console.log('\nEsse livro não existe na sua biblioteca!\n')
                        mostrarMenu()

                    } else {

                        const livro = livrosAtuais[posicaoLivro]
                        // Destructuring
                        const { lido } = livrosAtuais[posicaoLivro]
                        console.log(livro)

                        if (lido) {
                            reader.question('Deseja marcar como não lido? (Sim/Não) \n > ', resposta => {

                                // success -> armazena true/false
                                const success = marcarComoNaoLido(caminhoArquivo, resposta, posicaoLivro)

                                if (success) {
                                    console.log('\nLivro marcado como não lido!\n')

                                } else {
                                    console.log('\nNenhuma alteração foi feita.\n')
                                }

                                mostrarMenu()

                            })

                        } else {
                            reader.question('Deseja marcar como lido? (Sim/Não) \n > ', resposta => {

                                // success -> armazena true/false
                                const success = marcarComoLido(caminhoArquivo, resposta, posicaoLivro)

                                if (success) {
                                    console.log('\nLivro marcado como lido!\n')

                                } else {
                                    console.log('\nNenhuma alteração foi feita.\n')
                                }

                                mostrarMenu()

                            })
                        }
                    }
                })

                // Remover Livro
            } else if (crud.toLowerCase() === 'd') {

                // Aprender como remover os dados no JSON
                reader.question('Qual livro deseja remover? ', titulo => {

                    const livrosAtuais = listarLivros(caminhoArquivo)
                    const posicaoLivro = filtrarPosicaoLivro(livrosAtuais, titulo.toLowerCase())

                    if (posicaoLivro === -1) {
                        console.log('\nEsse livro não existe na sua biblioteca.\n')

                    } else {

                        const remove = removerLivro(caminhoArquivo, livrosAtuais, posicaoLivro)

                        if (remove !== false) {

                            console.log('\nLivro removido com sucesso!\n')

                        }

                    }

                    mostrarMenu()
                })


                // Sair
            } else if (crud.toLowerCase() === 'e') {
                reader.close()
            } else {
                console.log('Ação inválida!')
                mostrarMenu()
            }
        })
    }, 1000)
}

function pedirInfosLivro(callback) {
    // inicia um objeto livro para armazenar as entradas do user e retornar ao final de todas as perguntas
    const livro = {}
    // inicia as perguntas
    pedirTitulo(livro, callback)
}

function pedirTitulo(livro, callback) {

    reader.question('\nDigite o título do livro: ', titulo => {
        if (semResposta(titulo)) {
            pedirTitulo(livro)
        }
        livro.titulo = titulo
        pedirAutor(livro, callback)
    })
}

function pedirAutor(livro, callback) {
    reader.question('\nDigite o autor do livro: ', autor => {
        if (semResposta(autor)) {
            pedirAutor(livro)
        }
        livro.autor = autor
        pedirCategoria(livro, callback)
    })
}

function pedirCategoria(livro, callback) {
    reader.question('\nDigite a categoria do livro: ', categoria => {
        if (semResposta(categoria)) {
            pedirCategoria(livro)
        }
        livro.categoria = categoria
        pedirStatus(livro, callback)
    })
}

function pedirStatus(livro, callback) {
    reader.question('\nJá foi lido? (Sim ou Não): ', lido => {


        if (semResposta(lido)) {
            pedirStatus(livro)
        } else if (lido.toLowerCase().trim() === 'sim') {
            livro.lido = true
            callback(livro)
        } else if (lido.toLowerCase().trim() === 'não') {
            livro.lido = false
            callback(livro)
        } else {
            console.log('Resposta deve ser "sim" ou "não".')
            pedirStatus(livro)
        }


    })
}

