import styled from "styled-components"
import { ImBin2 } from 'react-icons/im'
import { initializeApp } from 'firebase/app'
import { collection, deleteDoc, doc, getFirestore } from 'firebase/firestore'
import { useState } from 'react';
import { FiMaximize2 } from 'react-icons/fi'
import ModalFotoExibicao from "../ModalFotoExibicao";


const DivEstilizada = styled.main`
    width: 250px;
    height: 430px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    img {
        object-fit: cover;
        width: 100%;
        height: 360px;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        box-shadow: 3px 1px 4px rgba(0, 0, 0, 0.2);
    }
    footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: #FFF;
        padding: 10px;
        box-sizing: border-box;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
        h3 {
            margin: 0;
            text-align: center;
            font-family: 'GandhiSansBold';
            font-size: 22px;
        }
        div {
            display: flex;
            justify-content: space-between;
            p {
                margin: 0;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.506);
            }
        }
    }
`

const CardExibicao = ({imagem, filtro, nome, deletar, idDelet, deletarCard}) => {

    const [expandir, setExpandir] = useState(false)

    function expandirFoto () {
        setExpandir(!expandir)
    }
    return (
        <DivEstilizada>
            <img src={imagem} alt="" />
            <footer>
                <h3>
                    {nome}   
                </h3>
                <div>
                    <p>
                        {filtro}
                    </p>
                    {deletar && <ImBin2 style={{cursor: "pointer", backgroundColor: "#DAA520", padding: "3px", borderRadius: "5px", color: "#FFF"}} size={20} onClick={() => deletarCard(idDelet)} />}
                    {!deletar && <FiMaximize2 size={20} style={{cursor: "pointer"}} onClick={() => expandirFoto()}/>}
                    {expandir && <ModalFotoExibicao imagem={imagem} titulo={nome} expandirFoto={expandirFoto}/>}
                </div>
            </footer>
        </DivEstilizada>
    )
}

export default CardExibicao