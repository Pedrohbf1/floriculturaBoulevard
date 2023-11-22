import styled from "styled-components"
import { AiFillCloseCircle } from 'react-icons/ai'

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

const ModalFigura = styled.header`
    width: 900px;
    max-width: 100%;
    margin: 65px auto;
    box-sizing: border-box;
    div {
        img {
            height: 100%;
        }
    }
    nav {
        box-sizing: border-box;
        width: 100%;
        padding: 15px 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        background-color: #FFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h2 {
            margin: 0;
        }
    }
`

const ModalFotoExibicao = ({imagem, titulo, expandirFoto}) => {
    return (
        <Overlay>
            <ModalFigura>
                <div>
                    <img src={imagem} alt="" />
                </div>

                <nav>
                    <h2>{titulo}</h2>
                    <AiFillCloseCircle size={30} onClick={() => expandirFoto()} style={{cursor: "pointer"}}/>
                </nav>

            </ModalFigura>
        </Overlay>
    )
}

export default ModalFotoExibicao