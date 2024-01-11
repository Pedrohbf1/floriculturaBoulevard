import styled from "styled-components"

const SelecionarSubFiltro = ({ texto, subFilter, name, onChange }) => {

    const DivInput = styled.div`
        display: flex;
        gap: 7px;
        label {
            font-size: 17px;
        }
        input {
            accent-color: #DAA520;
        }
    `

    function mandarSubFiltro (subFiltro) {
        onChange(subFiltro)
        console.log(subFiltro)
    }

    return (
        <DivInput>
            <input type="radio" name={name} value={subFilter} onChange={(e) => mandarSubFiltro(e.target.value)}/>
            <label>{texto}</label>
        </DivInput>
    )
}

export default SelecionarSubFiltro