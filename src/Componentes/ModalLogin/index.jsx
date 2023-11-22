import { initializeApp } from "firebase/app"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"
import styled from "styled-components"
import FirebaseApp from '../../firebase'

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

const Modal = styled.dialog`
    width: 400px;
    margin-top: 200px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: none;
    border-radius: 20px;
    text-align: center;
    justify-content: center;
    gap: 30px;

    section {
        align-items: center;
        justify-content: center;
        h2 {
            font-family: 'GandhiSansBold';
            color: #DAA520;
            margin: 0;
        }
        p {
            margin: 0;
            font-size: 13px;
            color: #DAA520;
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

const Paragrafo = styled.p`
    color: green;
`

const ModalLogin = () => {

    // const firebaseApp = initializeApp({
    //     apiKey: "AIzaSyBXCUB7n_UfwSpLhd9nt8i4VV2UPlG1Q-0",
    //     authDomain: "floricultura-boulevard.firebaseapp.com",
    //     projectId: "floricultura-boulevard",
        
    //   }); 
      
    const db = getFirestore(FirebaseApp) 
    const userCollectionRef = collection(db, "Contas")

    const [todasContas, setTodasContas] = useState([])

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(userCollectionRef)
          setTodasContas(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getUsers()
    }, [])

    const [mostrarSenha, setMostrarSenha] = useState(true)
    const [tipoDeSenha, setTipoDeSenha] = useState("password")
    const [senhaIncorreta, setSenhaIncorreta] = useState(false)

    function exibirSenha () {
        setMostrarSenha(!mostrarSenha)
        if(!mostrarSenha) {
            setTipoDeSenha("password")
        } else {
            setTipoDeSenha("text")
        }
    }

    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const [login, setLogin] = useState(false)
    const [exibirModal, setExibirModal] = useState(true) 


    function permanecerLogado () {
        const exibir = localStorage.logado
        if (exibir === "true") {
            setExibirModal(false)
        } else {
            setExibirModal(true)
        }
    }

    useEffect(() => {
        permanecerLogado()
    }, [])

    function entrarNaConta () {
        todasContas.find((conta) => {
            if(conta.usuario === usuario && conta.senha === senha) {
                localStorage.setItem("logado", "true")
                setExibirModal(false)
            } else {
                setSenhaIncorreta(true)
            }
        })
    }

    return (
        <>
            {exibirModal &&
                <Overlay>
                <Modal open>
                    <section>
                        <h2>Login</h2>
                        <p>Apenas administradores</p>
                    </section>

                    <div>
                        <input type="text" placeholder="Digite seu usuário..." value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
                        
                        <input type={tipoDeSenha} placeholder="Digite sua senha..." value={senha} onChange={(e) => setSenha(e.target.value)}/>

                        <section>
                            {senhaIncorreta && <p>Login ou senha incorretos</p>}
                            <main>
                                <input type="checkbox" onClick={() => exibirSenha()}/>
                                <label>Mostrar minha senha </label>
                            </main>
                        </section>
                    </div>

                    <form method="dialog">
                        <button onClick={() => entrarNaConta()}>Entrar</button>
                    </form>
                </Modal>
            </Overlay>
            }
        </>
    )
}

export default ModalLogin