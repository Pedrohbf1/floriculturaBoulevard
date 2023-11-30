import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore"
import FirebaseApp from '../../../firebase'
import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { ImBin2 } from 'react-icons/im'

const RemoverLogin = () => {

    const db = getFirestore(FirebaseApp) 
    const userCollectionRef = collection(db, "Contas") 

    const [todasOsLogins, setTodosOsLogins] = useState([])

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(userCollectionRef)
          setTodosOsLogins(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
         }
         getUsers()
    }, [])

    const [loginsFiltrados, setLoginsFiltrados] = useState([])

    useEffect(() => {
        setLoginsFiltrados(todasOsLogins)
        console.log(todasOsLogins)
    }, [todasOsLogins])

    async function deletarLogin (id) {
        const userDoc = doc(db, "Contas", id)
	    await deleteDoc(userDoc)
        alert("Produto removido com sucesso. Recarregue a página.");
    }

    return (
        <DivEstilizada>
            {loginsFiltrados != 0 && loginsFiltrados.map((login) => {
                return (
                <section>
                    <div>
                        <span>
                            <h3>Usuario</h3>
                            <h4>{login.usuario}</h4>
                        </span>
                        <span>
                            <h3>Senha</h3>
                            <h4>{login.senha}</h4>
                        </span>
                        <ImBin2 style={{cursor: "pointer", backgroundColor: "#DAA520", padding: "3px", borderRadius: "5px", color: "#FFF"}} size={20} onClick={() => deletarLogin(login.id)}  />
                    </div>
                </section>)
            })}
        </DivEstilizada>
    )
}

const DivEstilizada = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    section {
        width: 100%;
        background-color: #FFF;
        padding: 20px;
        border-radius: 10px;
        div {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        span {
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            justify-content: center;
            h3 {
                margin: 0;
                color: #DAA520;
            }
            h4 {
                margin: 0;
            }
        }
    }
`

export default RemoverLogin