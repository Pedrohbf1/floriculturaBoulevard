import { useState } from "react"
import styled from "styled-components"
import { IoMdClose } from "react-icons/io";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import FirebaseApp from '../../firebase'

const ModalEditarProdutoCaixa = (props) => { 

    const [produto, setProduto] = useState(props.produto)
    const [valor, setValor] = useState(props.valor)

    const [campoVazio, setCampoVazio] = useState(false)

    async function editarProdutosDentroDoFirestore () {

        if(produto === "" || valor === "") {
            setCampoVazio(true)
        } else {
            const db = getFirestore(FirebaseApp)
            const userDocRef = doc(db, "ProdutosCaixa", props.id)
            setCampoVazio(false)

            await updateDoc(userDocRef, {
                produto: produto,
                valor: valor, 
            })
            props.editarProduto()
            alert("Produto alterado com sucesso, recarregue a página para visualizar!")
        }
    }

    const handleInputChange = (event) => {
        const valorDigitado = event.target.value

        const valorLimpo = valorDigitado.replace(/[^0-9,]/g, '');

        setValor(valorLimpo)
    }

    return (
        <>
            <Overlay />
            <Modal open>
                <section>
                    <h2>Editar Produto</h2>
                    <FecharModal onClick={() => props.editarProduto()}> <IoMdClose size={20} /> </FecharModal>
                </section>

                <div>
                    <input type="text" placeholder="Digite o nome do produto..." value={produto} onChange={(e) => setProduto(e.target.value)} />

                    <header>
                        <footer>
                            <h2>R$</h2>
                        </footer>
                        <input placeholder="Digite o valor do produto..." value={valor} onChange={(e) => handleInputChange(e)} />
                    </header>
                </div>
                {campoVazio && <p style={{margin: 0, color: "red"}}>Preencha todos os campos</p>}
                <form method="dialog">
                    <button onClick={(e) => editarProdutosDentroDoFirestore(e)}>Confirmar</button>
                </form>

            </Modal>
        </>
    )
}

export default ModalEditarProdutoCaixa

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

const Modal = styled.dialog`
    z-index: 2;
    width: 400px;
    margin-top: -100px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: none;
    border-radius: 20px;
    text-align: center;
    justify-content: center;
    gap: 30px;
    box-sizing: border-box;
    section {
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        justify-content: center;
        display: flex;
        h2 {
            font-family: 'GandhiSansBold';
            color: #DAA520;
            margin: 0;
        }
    }

    div {
        header {
            display: flex;
            gap: 10px;
            footer {
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            h2 {
                margin: 0;
            }
        }
        margin-top: -30px;
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 40px;
        input {
            padding: 20px 10px;
            border: 1px solid #DAA520;
            border-radius: 9px;
            font-size: 18px;
            width: 80%;
        }

    }

    button {
        width: 50%;
        padding: 10px;
        background-color: #DAA520;
        border: none;
        color: #FFF;
        font-size: 18px;
        font-family: 'GandhiSansBold';
        border-radius: 10px;
        cursor: pointer;
    }
`

const FecharModal = styled.span`
    background-color: #DAA520;
    border-radius: 10px;
    position: absolute;
    padding: 1px;
    margin-left: 350px;
    margin-top: -50px;
    color: #FFF;
    cursor: pointer;
`