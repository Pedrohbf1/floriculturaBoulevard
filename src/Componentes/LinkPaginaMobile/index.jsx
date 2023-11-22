import styled from "styled-components"
import LinkPagina from "../LinkPagina"

const DivMobile = styled.div `
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 15px;
    @media (min-width: 910px) {
        display: none;
    }
`

const LinkPaginaMobile = ({ filtrarPorCategoria }) => {
    return (
        <DivMobile>
            <LinkPagina to="/">
                INÍCIO
            </LinkPagina>
            <LinkPagina to="/produtos" filtrarPorCategoria={filtrarPorCategoria} filtro="produtos">
                PRODUTOS
            </LinkPagina>
            <LinkPagina to="/paisagismo" filtrarPorCategoria={filtrarPorCategoria} filtro="paisagismo">
                PAISAGISMO
            </LinkPagina>
            <LinkPagina to="/casamento" filtrarPorCategoria={filtrarPorCategoria} filtro="casamento">
                CASAMENTO
            </LinkPagina>
            <LinkPagina to="/decoracoes" filtrarPorCategoria={filtrarPorCategoria} filtro="decoracoes">
                DECORAÇÕES
            </LinkPagina>
            <LinkPagina to="/contato">
                CONTATO 
            </LinkPagina>
        </DivMobile>
    )
}

export default LinkPaginaMobile