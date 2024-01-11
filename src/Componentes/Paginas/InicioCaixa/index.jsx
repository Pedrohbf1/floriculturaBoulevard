import styled from "styled-components"
import ModalLogin from "../../ModalLogin"
import { Link } from "react-router-dom"
import style from './InicioCaixa.module.css'

const DivCentralizadora = styled.section`
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 30px;
    h2 {
        margin: 0;
    }
    div {
        display: flex;
        flex-direction: column;
        gap: 50px;
        main {
            padding: 30px;
            background-color: #FFF;
            border-radius: 10px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
            align-items: center;
            justify-content: center;
            display: flex;
            text-align: center;
            h3 {
                color: #DAA520;
                text-decoration: none;
                margin: 0;
            }
        }
    }
`

const InicioCaixa = () => {
    return (
        <>
            <DivCentralizadora>
                <h2>Oque deseja fazer?</h2>
                <div>
                    <Link to="/admin" className={`
                        ${style.link}
                    `}>
                        <main>
                            <h3>VOLTAR PARA O PAINEL ADMINISTRATIVO</h3>
                        </main>
                    </Link>
                    
                    <Link to="registrarVenda" className={`
                        ${style.link}
                    `}>
                        <main>
                            <h3>CAIXA</h3>
                        </main>
                    </Link>

                    <Link to="cadatrarProduto" className={`
                        ${style.link}
                    `}>
                        <main>
                            <h3>CADASTRAR PRODUTO</h3>
                        </main>
                    </Link>

                    <Link to="editarProduto" className={`
                        ${style.link}
                    `}>
                        <main>
                            <h3>EDITAR PRODUTOS</h3>
                        </main>
                    </Link>
                    <Link to="fluxoCaixa" className={`
                        ${style.link}
                    `}>
                        <main>
                            <h3>FLUXO DE CAIXA</h3>
                        </main>
                    </Link>

                </div>
            </DivCentralizadora>
        </>
    )
}

export default InicioCaixa