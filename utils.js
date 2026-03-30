import fs from 'fs'
import { mostrarMenu } from './app.js'

// CRUD

// Create   
export function cadastrarLivro(caminhoArquivo, objetoLivro) {

    try{
        const livros = listarLivros(caminhoArquivo)
        livros.push(objetoLivro)
        
        adicionarNoJson(caminhoArquivo, livros)
        return true 
    } catch (e) {
        console.log(e)
        return false
    }

}

// Read
export function listarLivros(caminhoArquivo){
    try{
        let livros = fs.readFileSync(caminhoArquivo, 'utf-8' ) // utf-8 transforma/codifica os bytes em textos legíveis/string
        livros = JSON.parse(livros) // transforma em um objeto js
        return livros 
    } catch (e) {
        console.log(e)
        return false
    }
}

// Update
export function marcarComoNaoLido(caminhoArquivo, resposta, posicaoLivro) {

    if (resposta.toLowerCase().trim() === 'sim') {
        atualizarStatusLivro(caminhoArquivo, posicaoLivro, false)
        return true
    } else {
        return false
    }
}

export function marcarComoLido(caminhoArquivo, resposta, posicaoLivro) {

    if (resposta.toLowerCase().trim() === 'sim') {
        atualizarStatusLivro(caminhoArquivo, posicaoLivro, true)
        return true
    } else {
        return false
    }
}

export function atualizarStatusLivro(caminhoArquivo, posicaoLivro, status){

    const livrosAtuais = listarLivros(caminhoArquivo)
    livrosAtuais[posicaoLivro].lido = status

    adicionarNoJson(caminhoArquivo, livrosAtuais)
    return true
}

// Delete
export function removerLivro(caminhoArquivo, arrayParaRemover, posicaoLivro) {

    arrayParaRemover.splice(posicaoLivro, 1)

    adicionarNoJson(caminhoArquivo, arrayParaRemover)
    return true
}

// FUNÇÕES AUXILIARES
export function filtrarPosicaoLivro(arrayParaFiltrar, tituloLivro) {

    const posicaoLivroDesejado = arrayParaFiltrar.findIndex(item => {
        return item.titulo.toLowerCase() === tituloLivro
    })

    return posicaoLivroDesejado

}

export function semResposta(resposta){
    if(resposta.trim() === '' ){
        return true
    } else {
        return false
    }
}


function adicionarNoJson(caminhoArquivo, data){
    const newData = JSON.stringify(data, null, 2)
    fs.writeFileSync(caminhoArquivo, newData)
}

