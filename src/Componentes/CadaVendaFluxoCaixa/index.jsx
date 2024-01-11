import { useState } from "react"
import ModalFluxoCaixa from "../ModalFluxoDeCaixa"

const CadaVenda = ({dia, formaDePagamento, parcelas, desconto, valorTotal, venda }) => {

    const [modalVendas, setModalVendas] = useState(false)

    const fecharModal = () => {
        setModalVendas(false);
    };


    return (
        <tr>
            <td>{dia}</td>
            <td>{formaDePagamento === "pix" ? "Pix" : formaDePagamento === "cartaoCredito" ? "Cartão de crédito" : formaDePagamento === "dinheiro" ? "Dinheiro" : formaDePagamento === "cartoDebito" ? "Cartão de débito" : ""  }</td>
            <td>{parcelas === 1 ? "à vista" : parcelas + "x"}</td>
            <td>{desconto === "" ? "Sem desconto" : desconto}</td>
            <td>R${valorTotal}</td>
            <td>
                <button onClick={() => setModalVendas(true)}>
                    Abrir Venda
                </button>
            </td>
            {modalVendas && <ModalFluxoCaixa venda={venda} fecharModal={fecharModal}/>}
        </tr>
    )
}

export default CadaVenda