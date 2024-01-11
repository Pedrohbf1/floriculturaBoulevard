import { initializeApp } from "firebase/app"
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"
import styled from "styled-components"
import FirebaseApp from '../../../firebase'

const Modal = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: none;
    border-radius: 20px;
    text-align: center;
    justify-content: center;
    gap: 30px;
    padding: 30px 50px;
    background-color: #FFF;
    margin: 50px auto;

    section {
        align-items: center;
        justify-content: center;
        h2 {
            font-family: 'GandhiSansBold';
            color: #DAA520;
            margin: 0;
        }
    }

    header {
        display: flex;
        align-items: center;
        justify-content: center;
        input {
            width: 900px;
        }
    }

    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 40px;
        input {
            padding: 20px 10px;
            border: 1px solid #DAA520;
            border-radius: 9px;
            font-size: 18px;
        }
        section {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin: -30px 0 0 0;
            p {
                margin: 0;
                color: red;
            }
            main {
                display: flex;
                gap: 5px;
            }
            label {
                font-size: 14px;
                margin-top: 3px;
            }
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

const Paragrafo = styled.h4`
    color: green;
    margin: 0;
`

const AdicionarProdutoCaixa = () => {
      
    const db = getFirestore(FirebaseApp) 
    const userCollectionRef = collection(db, "ProdutosCaixa")

    const [todosOsProduto, setTodosOsProdutos] = useState([])

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(userCollectionRef)
          setTodosOsProdutos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getUsers()
    }, [])

    const [campoVazio, setCampoVazio] = useState(false)
    const [loginExistente, setLoginExistente] = useState(false)
    const [loginCriado, setLoginCriado] = useState(false)
    const [valorNaoNumero, setValorNaoNumero] = useState(false)

    const [nomeDoProduto, setNomeDoProduto] = useState("")
    const [valorDoProduto, setValorDoProduto] = useState("")

    function verificarProdutoExistente (produto) {
        return todosOsProduto.some((conta) => conta.produto === produto)
    }

    const handleInputChange = (event) => {
        const valorDigitado = event.target.value

        const valorLimpo = valorDigitado.replace(/[^0-9,]/g, '');

        setValorDoProduto(valorLimpo)
    }

    async function CadastrarProdutoNoCaixa () {

        if (nomeDoProduto === "" || valorDoProduto === ""){
            setCampoVazio(true)
            setLoginExistente(false)
            setLoginCriado(false)
            return
        } else if (verificarProdutoExistente(nomeDoProduto)) {
            setLoginExistente(true)
            setCampoVazio(false)
            setLoginCriado(false)
            return
        }  else {
            setLoginExistente(false)
            setCampoVazio(false)
            setLoginCriado(true)

            if(valorDoProduto.includes(',')) {
                const user = await addDoc(userCollectionRef, {
                    produto: nomeDoProduto,
                    valor: valorDoProduto 
                })
            } else {
                const user = await addDoc(userCollectionRef, {
                    produto: nomeDoProduto,
                    valor: `${parseInt(valorDoProduto)}.00` 
                })
            }
        }
    }

    return (
        <Modal open>
            <section>
                <h2>Cadastrar produto</h2>
            </section>

            <div>
                <input type="text" required placeholder="Digite o nome do produto..." value={nomeDoProduto} onChange={(e) => {setNomeDoProduto(e.target.value)}} />
                
                <header>
                    <div><h3>R$</h3></div>
                    <input type="text" required placeholder="Digite o valor do produto..." value={valorDoProduto} onChange={(e) => {handleInputChange(e)}}/>
                </header>

                <section>
                    {loginExistente && <p>Este nome de usuario já está cadastrado</p>}
                    {campoVazio && <p>Preencha todos os campos</p>}
                    {valorNaoNumero && <p>Esse valor não é um numero</p>}
                    {loginCriado && <Paragrafo>Produto registrado com sucesso</Paragrafo>}
                </section>
            </div>

            <form method="dialog">
                <button onClick={() => CadastrarProdutoNoCaixa()}>Registar</button>
            </form>
                </Modal>
    )
}

export default AdicionarProdutoCaixa