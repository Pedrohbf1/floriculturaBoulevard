import styled from "styled-components"
import {AiOutlineRight} from 'react-icons/ai'

const DivSubFiltro = styled.div`
    box-sizing: border-box;
    padding: 0 0 8px 0;
    border-bottom: 1px solid rgba(120, 64, 8, 0.7);
    display: flex;
    cursor: pointer;
    div {
        display: flex;
        background-color: ${(props) => (props.selected ? '#50301E' : 'transparent')};
        padding: 5px 0;
        gap: 7px;
        @media (max-width: 910px) {
                align-items: center;
                justify-content: center;
                display: flex;
            }
    }
    p {
        margin: 0;
        font-size: 19px;
        font-weight: bold;
        color: ${(props) => (props.selected ? '#FFF' : '#000')};
    }
`

const SubFiltro = ({ nome, onSelect, selected, filtrarPorFiltros, filtro}) => {

    const handleClick = () => {
        onSelect(nome)
        filtrarPorFiltros(filtro)
    }

    return (
        <DivSubFiltro onClick={handleClick} selected={selected}>
            <div>
                <AiOutlineRight size={20} style={{
                    color: selected ? "#FFF" : "rgba(120, 64, 8, 0.5)", 
                }}/>
                <p>{nome}</p>
            </div>
        </DivSubFiltro>
    )
}

export default SubFiltro