import styled from "styled-components"
import { BiLogoInstagram, BiLogoWhatsapp } from 'react-icons/bi'
import LinkPagina from "../LinkPagina"
import {IoReorderThreeSharp} from 'react-icons/io5'
import { useState } from "react"
import LinkPaginaMobile from "../LinkPaginaMobile"

const HeaderEstilizada = styled.header`
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    border: 1px solid rgba(216, 226, 217, 0.442);
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 13px 0;
        gap: 30px;
        a {
            color: #000;
        }
    }
`

const CapaEstilizada = styled.div`
    width: 100%;
    padding: 20px 0;
    align-items: center;
    justify-content: center;
    display: flex;
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
    @media (max-width: 910px) {
        display: none;
    }
`

const MobileDiv = styled.div`
    display: none;
    @media (max-width: 910px) {
        display: block;
        justify-content: center;
        align-items: center;
        display: flex;
        cursor: pointer;
        padding: 10px;
    }
`

const Header = ({filtrarPorCategoria}) => {

    const [mostarComponenteMobile, setMostrarComponenteMobile] = useState(false)

    const toggleComponenteMobile = () => {
        setMostrarComponenteMobile(!mostarComponenteMobile)
    }

    return (
        <>
            <HeaderEstilizada>
                <div>
                    <a href="https://www.instagram.com/floriculturaboulevard/"><BiLogoInstagram size={32}/></a> 
                    <a href="https://wa.me/553732711786"> <BiLogoWhatsapp size={32} /> </a>
                </div>
            </HeaderEstilizada>

            <CapaEstilizada>
                <a href="/"><img src="https://firebasestorage.googleapis.com/v0/b/floricultura-boulevard.appspot.com/o/imagens%2FLogomarca.png?alt=media&token=33699707-18d3-4fa4-9aa5-359f8d88d84c&_gl=1*1lmr1gr*_ga*MTc4ODI4OTE2LjE2OTE2MTkxMjY.*_ga_CW55HF8NVT*MTY5NzgzNTQwMS4zMS4xLjE2OTc4MzU2NDcuNTguMC4w" alt="Logo Marca Floricultura" /></a>
            </CapaEstilizada>

            <ListaLink>
                <LinkPagina to="/">
                    INÍCIO
                </LinkPagina>
                <LinkPagina to="/produtos" >
                    PRODUTOS
                </LinkPagina>
                <LinkPagina to="/paisagismo" >
                    PAISAGISMO
                </LinkPagina>
                <LinkPagina to="/casamento" >
                    CASAMENTO
                </LinkPagina>
                <LinkPagina to="/decoracoes"  >
                    DECORAÇÕES
                </LinkPagina>
                <LinkPagina to="/contato">
                    CONTATO
                </LinkPagina>
            </ListaLink>

            <MobileDiv onClick={toggleComponenteMobile}>
                <div>
                    <IoReorderThreeSharp size={40} />
                </div>
            </MobileDiv>
            {mostarComponenteMobile && <LinkPaginaMobile filtrarPorCategoria={filtrarPorCategoria} />}
        </>
    )
}

export default Header