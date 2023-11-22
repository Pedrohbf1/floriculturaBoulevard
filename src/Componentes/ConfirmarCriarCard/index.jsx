import { useState } from "react"
import styled from "styled-components"
import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore } from 'firebase/firestore'


const BotaoEstilizado = styled.button` 
    width: 100%;
    padding: 10px;
    background-color: #DAA520;
    border: none;
    margin-top: 20px;
    color: #FFF;
    font-size: 18px;
    font-family: 'GandhiSansBold';
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
        transform: scale(1.1, 1.05)
    }
`

const ErroParagrafo = styled.h4`
    margin: 10px 0 0 0;
    color: red;
    text-align: center;
`

const ConfirmarCriarCard = ({arquivoFoto, titulo, filtro, subFiltro, arquivoStorage, userCollectionRef}) => {

    const [erro, setErro] = useState(false)

    async function lancarProduto () {
        if(arquivoFoto == "" || titulo == "" || filtro == "" || subFiltro == "") {
            setErro(true)
        } else {
            setErro(false)
            await addDoc(userCollectionRef, {
                subFiltro: subFiltro,
                imagem: arquivoStorage,
                nome: titulo,
                filtro: filtro,
            })
            window.location.reload()
        }
    }

    return (
        <>
            {erro && <ErroParagrafo>preencha todos os campos</ErroParagrafo>}
            <BotaoEstilizado onClick={() => lancarProduto()}>Confirmar</BotaoEstilizado>
        </>
    )
}

export default ConfirmarCriarCard