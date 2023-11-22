import styled from "styled-components"
import SubFiltro from "../../SubFiltro"
import { useEffect, useState } from "react"
import CardExibicao from "../../CardExibicao"
import { initializeApp } from 'firebase/app'
import { collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore'
import FirebaseApp from '../../../firebase'

const ConteudoGeral = styled.section`
    width: 1300px;
    display: flex;
    gap: 70px;
    margin: 0 0 0 -250px;
    article {
        display: flex;
        gap: 30px;
        flex-wrap: wrap;
        width: 100%;
        
    }
    section {
        width: 200px;
        box-sizing: border-box;
        article {
            width: 100%;
            background-color: #FFF;
            max-width: 100%;
            padding: 20px 30px 20px 20px;
            border-radius: 20px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            
            
        }
        h3 {
            margin: 0;
            font-family: 'GandhiSansBold';
            font-size: 23px;
            @media (max-width: 910px) {
                align-items: center;
                justify-content: center;
                display: flex;
            }
        }
        main {
            display: flex;
            flex-direction: column;
            gap: 35px;
            h2 {
                margin: 0;
               
            }
        }

       

        h3 {
            margin: 0;
            font-family: 'GandhiSansBold';
            font-size: 23px;
        }
    }
`

const filtros = [
    {
        nome: "Produtos",
        filter: "produtos"
    }, 
    {
        nome: "Paisagismo",
        filter: "paisagismo"
    }, 
    {
        nome: "Decorações",
        filter: "decoracoes"
    },
    {
        nome: "Casamento",
        filter: "casamento"
    }
]

const RemoverProdutos = () => {

    // const firebaseApp = initializeApp({
    //     apiKey: "AIzaSyBXCUB7n_UfwSpLhd9nt8i4VV2UPlG1Q-0",
    //     authDomain: "floricultura-boulevard.firebaseapp.com",
    //     projectId: "floricultura-boulevard",
    //   });  
      
      const db = getFirestore(FirebaseApp) 
      const userCollectionRef = collection(db, "Produtos") 

    const [todasAsFotos, setTodasAsFotos] = useState([])

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(userCollectionRef)
          setTodasAsFotos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
         }
         getUsers()
    }, [])

    const [fotosFiltradas, setFotosFiltradas] = useState([])

    useEffect(() => {
        setFotosFiltradas(todasAsFotos)
    }, [todasAsFotos])

    function filtrarPorFiltros (filtro) {
        setFotosFiltradas(todasAsFotos.filter((foto) => {
            return foto.subFiltro === filtro 
        }))
    }

    const [selectedSubFiltro, setSelectedSubFitro] = useState(null)

    const handleSubFiltroSelect = (nome) => {
        setSelectedSubFitro(nome === selectedSubFiltro ? null : nome)
    }

    async function deletarCard (id) {
        const userDoc = doc(db, "Produtos", id)
	    await deleteDoc(userDoc)
        window.location.reload();
    }

    return (
        <ConteudoGeral>

                <section>
                    <article>
                        <div>
                            <h3>Filtros</h3>
                        </div>
                        <main>
                            {filtros.map((subFiltro) => (
                                <SubFiltro 
                                    key={subFiltro.nome} 
                                    nome={subFiltro.nome} 
                                    onSelect={handleSubFiltroSelect}
                                    selected={selectedSubFiltro === subFiltro.nome}
                                    filtro={subFiltro.filter}
                                    filtrarPorFiltros={filtrarPorFiltros}
                                />
                            ))}
                        </main>
                    </article>
                </section>

                <article>
                    {fotosFiltradas.map((produto) => {
                        return <CardExibicao deletarCard={(valor) => deletarCard(valor)} idDelet={produto.id} filtro={produto.subFiltro} nome={produto.nome} imagem={produto.imagem} key={produto.id} deletar={true} />
                    })}
                </article>

            </ConteudoGeral>
    )
}

export default RemoverProdutos