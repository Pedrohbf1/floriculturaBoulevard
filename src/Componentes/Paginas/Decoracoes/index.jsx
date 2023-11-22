import styled from "styled-components"
import SubFiltro from "../../SubFiltro"
import { useEffect, useState } from "react"
import CardExibicao from "../../CardExibicao"
import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import FirebaseApp from '../../../firebase'

const Centraliza = styled.div`
    width: 1600px;
    max-width: 100%;
    margin: 50px auto 130px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
    div {
        width: 100%;
        h2 {
            margin: 0;
            font-family: 'GandhiSansBold';
        }
    }
`

const ConteudoGeral = styled.section`
    width: 100%;
    display: flex;
    gap: 100px;
    @media (max-width: 910px) {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }
    article {
        display: flex;
        gap: 30px;
        flex-wrap: wrap;
        width: 100%;
        @media (max-width: 910px) {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
    section {
        width: 250px;
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
            @media (max-width: 910px) {
                display: flex;
                flex-direction: column;
            }
            
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
                @media (max-width: 910px) {
                    align-items: center;
                    justify-content: center;
                    display: flex;
                }   
            }
        }

        @media (max-width: 910px) {
            width: 95%;
        }

        h3 {
            margin: 0;
            font-family: 'GandhiSansBold';
            font-size: 23px;
        }
    }
`

const subFiltros = [ 
    {
        nome: "Arranjos",
        filter: "arranjos"
    },
    {
        nome: "Peças decorativas",
        filter: "pecas-decorativas"
    }
]

const Produtos = ({ fotos, subFiltro}) => {

    // const firebaseApp = initializeApp({
    //     apiKey: "AIzaSyBXCUB7n_UfwSpLhd9nt8i4VV2UPlG1Q-0",
    //     authDomain: "floricultura-boulevard.firebaseapp.com",
    //     projectId: "floricultura-boulevard",
    //   });  
      
      const db = getFirestore(FirebaseApp) 
      const userCollectionRef = collection(db, "Produtos") 

    const [selectedSubFiltro, setSelectedSubFitro] = useState(null)

    const [todasAsFotos, setTodasAsFotos] = useState([])

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(userCollectionRef)
          setTodasAsFotos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
         }
         getUsers()
    }, [])

    const [produtosFiltrados, setProdutosFiltrados] = useState([])

    useEffect(() => {
        setProdutosFiltrados(todasAsFotos.filter((foto) => {
            return foto.subFiltro === subFiltro
        }))
    }, [todasAsFotos])

    function filtrarPorFiltros (filtro) {
        setProdutosFiltrados(fotos.filter((foto) => {
            return foto.filtro === filtro 
        }))
    }

    const handleSubFiltroSelect = (nome) => {
        setSelectedSubFitro(nome === selectedSubFiltro ? null : nome)
    }

    return (
        <Centraliza>
            <div>
                <h2>Decorações</h2>
            </div>

            <ConteudoGeral>

                <section>
                    <article>
                        <div>
                            <h3>Filtros</h3>
                        </div>
                        <main>
                            {subFiltros.map((subFiltro) => (
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
                    {produtosFiltrados.map((produto) => {
                        return <CardExibicao filtro={produto.filtro} nome={produto.nome} imagem={produto.imagem} key={produto.id} deletar={false}/>
                    })}

                </article>

            </ConteudoGeral>
        </Centraliza>
    )
}

export default Produtos