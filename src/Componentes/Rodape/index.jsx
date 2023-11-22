import { Link } from "react-router-dom"
import styled from "styled-components"

const RodapeEstilizado = styled.footer`
    width: 100%;
    background-color: #FFF;
    box-shadow: 0px -5px 75px rgba(0, 0, 0, 0.2);
    padding: 30px 0 10px 0;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    color: #000;
    gap: 5px;
    box-sizing: border-box;
    :first-child {
        font-size: 16px;
        text-align: center;
    }
    :nth-child(2) {
        font-size: 14px;
    }
    :nth-child(3) {
        font-size: 12px;
        color: #EFF;
        text-decoration: none;
    }
`

const Rodape = () => {
    return (
        <RodapeEstilizado>

            <div>Floricultura Boulevard &copy; Copyright 2023 | Todos os direitos reservados </div>
            <div>Desenvolvido por Pedro Henrique</div>
            <Link to="/admin">Painel de controle</Link>
            
        </RodapeEstilizado>
    )
}

export default Rodape