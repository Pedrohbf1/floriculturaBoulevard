import { useState } from "react"
import styled from "styled-components"
import TerminarVenda from "../TerminarVenda";

const FormaDePagamento = ({totalDoCarrinho, carrinhoDeCompras}) => {


    const [formasDePagamento, setFormasDePagamento] = useState([
        {nome: "Pix", forma: "pix"},
        {nome: "Dinheiro", forma: "dinheiro"},
        {nome: "Cartão de crédito", forma: "cartaoCredito"},
        {nome: "Cartão de débito", forma: "cartoDebito"}
    ])

    const [formaSelecionada, setFormaSelecionada] = useState(null);

    const [metodoDePagamentoSelecionado, setMetodoDePagamentoSelecionado] = useState("")

    const handleSelecionarFormaPagamento = (forma) => {
        setFormaSelecionada(forma);
        setMetodoDePagamentoSelecionado(forma.forma)
    };

    const [terminarFormaDePagamento, setTerminarFormaDePagamento] = useState(false)

    function ClicarParaProsseguir (e) {
        e.preventDefault()
        setTerminarFormaDePagamento(!terminarFormaDePagamento)
    }

    return (
        <>
            {!terminarFormaDePagamento && 
            <>
                <SelecionarMetodoDePagamentoEstilizado>
                    <h2>Selecione a forma de pagamento</h2>
                    <section>
                        {formasDePagamento.map((forma) => {
                            return (
                                <span
                                    key={forma.nome}
                                    onClick={() => handleSelecionarFormaPagamento(forma)}
                                    className={formaSelecionada === forma ? "selecionado" : ""}
                                >
                                {forma.nome}
                            </span>
                            )
                        })}
                    </section>
                    {metodoDePagamentoSelecionado != "" && <button onClick={(e) => ClicarParaProsseguir(e)}>Continuar</button>}
                </SelecionarMetodoDePagamentoEstilizado>
            </>
            }
            {terminarFormaDePagamento && <TerminarVenda carrinhoDeCompras={carrinhoDeCompras} totalDoCarrinho={totalDoCarrinho} metodoDePagamentoSelecionado={metodoDePagamentoSelecionado} />}
        </>
    )
}

export default FormaDePagamento

const SelecionarMetodoDePagamentoEstilizado = styled.footer`
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    :nth-child(2) {
        align-items: center;
        justify-content: center;
        gap: 40px;
        display: flex;
        span {
            margin-top: 15px;
            border: 1px solid #DAA420;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            &.selecionado {
                background-color: #daa420;
                color: #fff;
            }
        }
    }
    button {
        margin-top: 50px;
        padding: 15px;
        border: 1px solid #DAA420;
        border-radius: 10px;
        background-color: #DAA420;
        color: #FFF;
        font-size: 20px;
    }
`

