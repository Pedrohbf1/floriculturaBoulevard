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

const CriarLogin = () => {

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
    const [loginExistente, setLoginExistente] = useState(false)
    const [loginCriado, setLoginCriado] = useState(false)

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
    const [campoVazio, setCampoVazio] = useState(false)

    function verificarUsuarioExistente (usuario) {
        return todasContas.some((conta) => conta.usuario === usuario)
    }

    async function entrarNaConta () {

        if (usuario === "" || senha === ""){
            setCampoVazio(true)
            setLoginExistente(false)
            setLoginCriado(false)
            return
        } else if (verificarUsuarioExistente(usuario)) {
            setLoginExistente(true)
            setCampoVazio(false)
            setLoginCriado(false)
            return
        } else {
            setLoginExistente(false)
            setCampoVazio(false)
            setLoginCriado(true)
            const user = await addDoc(userCollectionRef, {
                usuario: usuario,
                senha: senha,
            })
            console.log(user)
        }
    }

    return (
        <Modal open>
            <section>
                <h2>Registrar</h2>
            </section>

            <div>
                <input type="text" required placeholder="Digite o nome do usuário..." value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
                        
                <input type={tipoDeSenha} required placeholder="Digite a senha..." value={senha} onChange={(e) => setSenha(e.target.value)}/>

                <section>
                    {loginExistente && <p>Este nome de usuario já está cadastrado</p>}
                    {campoVazio && <p>Preencha todos os campos</p>}
                    {loginCriado && <Paragrafo>Login criado com sucesso</Paragrafo>}
                    <main>
                        <input type="checkbox" onClick={() => exibirSenha()}/>
                        <label>Mostrar minha senha </label>
                    </main>
                </section>
            </div>

            <form method="dialog">
                <button onClick={() => entrarNaConta()}>Registar</button>
            </form>
                </Modal>
    )
}

export default CriarLogin