import { Outlet, useNavigate} from "react-router-dom"
import styled from "styled-components"
import LinkPagina from "../LinkPagina"
import Rodape from "../Rodape"
import ModalLogin from "../ModalLogin"

const HeaderEstilizada = styled.header`
    width: 100%;
    padding: 10px 0;
    align-items: center;
    justify-content: center;
    display: flex;
    border: 1px solid rgba(216, 226, 217, 0.442);
    div {
        display: flex;
        h1 {
            margin: 10px 0 0 0;
            flex-grow: 1;
        }
        button {
            position: absolute;
            right: 40px;
            top: 20px; 
            border: 1px solid #DAA520;;
            cursor: pointer;
            padding: 5px 20px;
            border-radius: 5px;
        }
    }
`

const CapaEstilizada = styled.div`
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    padding-top: 20px;
    img {
        width: 650px;
        max-width: 100%;
    }
`

const ListaLink = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7%;
    div {
        padding: 30px 0 0 0;
        margin-bottom: 20px;
    }
`

const FundoCinza = styled.main`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.055);
    margin-top: 20px;
    box-sizing: border-box;
    min-height: 100vh;
`

const Centralizador = styled.div`
    width: 800px;
    margin: 0 auto;
    padding: 30px 0 ;
`

const PaginaPadraoCaixa = () => {

    const navigate = useNavigate()

    function logout () {
        localStorage.removeItem("logado")
        navigate("/")
    }

    return (
        <main>
            <ModalLogin />
            <HeaderEstilizada>
                <div>
                    <h1>Caixa Floricultura Boulevard</h1>
                    <button onClick={() => logout()}>Sair</button>
                </div>
            </HeaderEstilizada>

            <CapaEstilizada>
                <a href="/"><img src="https://firebasestorage.googleapis.com/v0/b/floricultura-boulevard.appspot.com/o/imagens%2FLogomarca.png?alt=media&token=33699707-18d3-4fa4-9aa5-359f8d88d84c" alt="Logo Marca Floricultura" /></a>
            </CapaEstilizada>

            <ListaLink>
                <LinkPagina to="/admin">
                    VOLTAR PARA O PAINEL ADMINISTRATIVO
                </LinkPagina>
                <LinkPagina to="/admin/caixa">
                    INICIO  
                </LinkPagina>
                <LinkPagina to="/admin/caixa/registrarVenda" >
                    CAIXA
                </LinkPagina>
                <LinkPagina to="/admin/caixa/cadatrarProduto" >
                    CADASTRAR PRODUTO
                </LinkPagina>
                <LinkPagina to="/admin/caixa/editarProduto" >
                    EDITAR PRODUTOS
                </LinkPagina>
                <LinkPagina to="/admin/caixa/fluxoCaixa" >
                    FLUXO DE CAIXA
                </LinkPagina>
            </ListaLink>

            <FundoCinza>
                <Centralizador>
                    <Outlet />
                </Centralizador>
            </FundoCinza>
        </main>
    )
}

export default PaginaPadraoCaixa