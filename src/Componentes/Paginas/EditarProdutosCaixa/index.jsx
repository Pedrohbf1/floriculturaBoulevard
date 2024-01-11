import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore"
import FirebaseApp from '../../../firebase'
import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { ImBin2 } from 'react-icons/im'
import { FaPencilAlt } from "react-icons/fa";
import EditarProdutos from "../../CadaProdutoDoEditarProdutosCaixa"

const EditarProdutosCaixa = () => {

    const db = getFirestore(FirebaseApp) 
    const userCollectionRef = collection(db, "ProdutosCaixa") 

    const [todosOsProdutos, setTodosOsProdutos] = useState([])

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(userCollectionRef)
          setTodosOsProdutos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
         }
         getUsers()
    }, [])

    const [produtosFiltrados, setProdutosFiltrados] = useState([])
    const [nomeFiltrado, setNomeFiltrado] = useState("")

    useEffect(() => {
        // setProdutosFiltrados(todosOsProdutos)
        const produtosFiltrados = todosOsProdutos.filter((produto) =>
            produto.produto.toLowerCase().includes(nomeFiltrado.toLowerCase())
        );
        setProdutosFiltrados(produtosFiltrados)
    }, [todosOsProdutos, nomeFiltrado])

    async function deletarLogin (id) {
        const userDoc = doc(db, "ProdutosCaixa", id)
	    await deleteDoc(userDoc)
        alert("Produto removido com sucesso. Recarregue a página.");
    }

    function fitrarProdutos (e) {
        setNomeFiltrado(e.target.value)
    }

    return (
        <DivEstilizada>
            <input type="text" placeholder="Digite o nome do produto..." value={nomeFiltrado} onChange={(e) => fitrarProdutos(e)} />
            {produtosFiltrados != 0 && produtosFiltrados.map((login) => {
                return (
                    <EditarProdutos 
                        key={login.id} 
                        produto={login.produto} 
                        valor={login.valor} 
                        id={login.id} 
                        deletarLogin={deletarLogin}
                    />
                )
            })}
        </DivEstilizada>
    )
}

const DivEstilizada = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    input {
        width: 100%;
        border: 1px solid #DAA520;
        border-radius: 10px;
        padding: 10px;
    }
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

export default EditarProdutosCaixa