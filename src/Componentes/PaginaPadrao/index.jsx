import { Outlet } from "react-router-dom"
import Header from "../Header"
import Rodape from "../Rodape"
import styled from "styled-components"

const FundoCinza = styled.main`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.055);
    box-sizing: border-box;
`

const PaginaPadrao = () => {
    
    return (
        <main>
            <Header/>
            <FundoCinza>
                <Outlet />
                <Rodape />
            </FundoCinza>
        </main>
    )
}

export default PaginaPadrao