import styled from "styled-components"
import SelecionarSubFiltro from "../../SelecionarSubFiltro"
import { useState } from "react"
import { AiFillFileAdd } from 'react-icons/ai'
import InputCriarCard from "../../CriarCardInput"
import ConfirmarCriarCard from "../../ConfirmarCriarCard"
import { initializeApp } from "firebase/app"
import { StorageErrorCode, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { collection, getFirestore } from "firebase/firestore"

import FirebaseApp from '../../../firebase'

const DivPrincipal = styled.header`
    width: 100%;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
        margin: 0;
    }
`

const SectionSubFiltro = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
`

const CorpoDaPagina = styled.main`
    display: flex;
    flex-direction: column;
    gap: 50px;
`

const Finalizador = styled.main`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    section {
        display: flex;
        flex-direction: column;
        gap: 10px;
        h3 {
            margin: 0;
            text-align: center;
        }
        input {
            width: 300px;
            padding: 20px 10px;
            border: 1px solid #DAA520;
            border-radius: 9px;
            font-size: 18px;
            text-align: center;
        }
    }

    main {
        display: flex;
        flex-direction: column;
        gap: 10px;
        h3 {
            margin: 0;
            text-align: center;
        }
        input {
            display: none;
        }

        label {
            text-align: center;
            border: 1.5px dashed #DAA520;
            padding: 15px 0;
            background-color: #FFF;
            cursor: pointer;
        }
    }
`

const CardExibicaoDiv = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    img {
        object-fit: cover;
        width: 100%;
        height: 360px;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        box-shadow: 3px 1px 4px rgba(0, 0, 0, 0.2);
    }
    footer {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: #FFF;
        padding: 10px;
        box-sizing: border-box;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
        h3 {
            margin: 0;
            text-align: center;
            font-family: 'GandhiSansBold';
            font-size: 22px;
        }
        div {
            display: flex;
            justify-content: space-between;
            p {
                margin: 0;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.506);
            }
        }
    }

    button {
        width: 100%;
        padding: 10px;
        background-color: #DAA520;
        border: none;
        margin-top: 30px;
        color: #FFF;
        font-size: 18px;
        font-family: 'GandhiSansBold';
        border-radius: 10px;
        cursor: pointer;
        transition: 0.3s ease;
        &:hover {
            transform: scale(1.1, 1.05)
        }
    }
`


const CategoriaAdmin = () => {

    // const firebaseApp = initializeApp({
    //     apiKey: "AIzaSyBXCUB7n_UfwSpLhd9nt8i4VV2UPlG1Q-0",
    //     authDomain: "floricultura-boulevard.firebaseapp.com",
    //     projectId: "floricultura-boulevard",
    // });
    
    const [arquivoFoto, setArquivoFoto] = useState(null)
    const [filtro, setFiltro] = useState("")
    const [subFiltro, setSubFiltro] = useState("")
    const [arquivoStorage, setArquivoStorage] = useState("")

    function CardCriado () {
        setArquivoFoto("")
        setFiltro("")
        setSubFiltro("")
        setArquivoStorage("")
        setTitulo("")
    }

    async function criarCard (event) {
        
        const file = event.target.files[0]
        
        if(file) {
            const reader = new FileReader()
            reader.onload = () => {
                setArquivoFoto(reader.result)
            } 
            reader.readAsDataURL(file)
        }

        const storage = getStorage(FirebaseApp)
        const timestamp = Date.now()

        const storageRef = ref(storage, `imagens/${timestamp}------${file.name}`)
        const snapshot = await uploadBytes(storageRef, file)
        const url = await getDownloadURL(snapshot.ref)

        setArquivoStorage(url)

    }

    function filtros(valor) {
        setFiltro(valor)
        switch(valor) {
            case "buque" :
            case "flores-de-corte" :
            case "flores-de-vaso" :
            case "plantas-ornamentais" :
            case "plantas-frutiferas" :
            case "arvores-nativas" :
            case "vasos-vietnamitas" :
            case "vasos-de-fibra" :
            case "vasos-de-cimento" :
            case "vasos-de-ceramica" :
            case "caxipos-diversos" :
                setSubFiltro("produtos");
                break;
            case "plantas-para-interna" :
            case "externa" : 
                setSubFiltro("paisagismo");
                break;
            case "buque-de-noiva" :
            case "buque-de-daminha" : 
            case "flores-para-madrinhas" :
            case "tiaras" :
            case "lapelas" :
                setSubFiltro("casamento");
                break;
            case "arranjos" :
            case "pecas-decorativas" :
                setSubFiltro("decoracoes");
                break;
            default : 
                setSubFiltro("")
        }
    }

    const [titulo, setTitulo] = useState("")

    function setarTitulo (titulo) {
        setTitulo(titulo)
    }
      
    const db = getFirestore(FirebaseApp)
    const userCollectionRef = collection(db, "Produtos")

    return (
        <CorpoDaPagina>
            <DivPrincipal>
                <h2>Selecione quais são os filtros</h2>
                <h1>Produtos</h1>

                <SectionSubFiltro>

                    <SelecionarSubFiltro 
                        texto="Buquê" 
                        subFilter="buque" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />

                    <SelecionarSubFiltro 
                        texto="Flores de corte" 
                        subFilter="flores-de-corte" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />
                    <SelecionarSubFiltro 
                        texto="Flores de vaso" 
                        subFilter="flores-de-vaso" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />
                    <SelecionarSubFiltro 
                        texto="Plantas ornamentais" 
                        subFilter="plantas-ornamentais" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />
                    <SelecionarSubFiltro 
                        texto="Plantas frutíferas" 
                        subFilter="plantas-frutiferas" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />

                    <SelecionarSubFiltro 
                        texto="Árvores nativas" 
                        subFilter="arvores-nativas" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />

                </SectionSubFiltro>

            </DivPrincipal>

            <DivPrincipal>
                <h1>Vasos</h1>

                <SectionSubFiltro>

                    <SelecionarSubFiltro 
                        texto="Vasos vietnamitas" 
                        subFilter="vasos-vietnamitas" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />
                    <SelecionarSubFiltro 
                        texto="Vasos de fibra" 
                        subFilter="vasos-de-fibra" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />
                    <SelecionarSubFiltro 
                        texto="Vasos de cimento" 
                        subFilter="vasos-de-cimento" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />
                    <SelecionarSubFiltro 
                        texto="Vasos de ceramica" 
                        subFilter="vasos-de-ceramica" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />
                    <SelecionarSubFiltro 
                        texto="Caxipos diversos" 
                        subFilter="caxipos-diversos" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />

                </SectionSubFiltro>

            </DivPrincipal>

            <DivPrincipal>
                <h1>Paisagismo</h1>

                <SectionSubFiltro>

                    <SelecionarSubFiltro 
                        texto="Plantas para interna" 
                        subFilter="plantas-para-interna" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />
                    <SelecionarSubFiltro 
                        texto="Externa" 
                        subFilter="externa" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />

                </SectionSubFiltro>

            </DivPrincipal>

            <DivPrincipal>
                <h1>Casamento</h1>

                <SectionSubFiltro>

                    <SelecionarSubFiltro 
                        texto="Buquê de noiva" 
                        subFilter="buque-de-noiva" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />
                    <SelecionarSubFiltro 
                        texto="Buquê de daminha" 
                        subFilter="buque-de-daminha" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />

                    <SelecionarSubFiltro 
                        texto="Flores para madrinhas" 
                        subFilter="flores-para-madrinhas" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />

                    <SelecionarSubFiltro 
                        texto="Tiaras" 
                        subFilter="tiaras" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />

                    <SelecionarSubFiltro 
                        texto="Lapelas" 
                        subFilter="lapelas" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />

                </SectionSubFiltro>

            </DivPrincipal>

            <DivPrincipal>
                <h1>Decorações</h1>

                <SectionSubFiltro>

                    <SelecionarSubFiltro 
                        texto="Arranjos" 
                        subFilter="arranjos" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />
                    <SelecionarSubFiltro 
                        texto="Peças decorativas" 
                        subFilter="pecas-decorativas" 
                        name="produtos"
                        onChange={(valor) => filtros(valor)} 
                    />

                </SectionSubFiltro>

            </DivPrincipal>

            <Finalizador>

                <InputCriarCard titulo={titulo} setarTitulo={(valor) => setarTitulo(valor)}/>

                <main>
                    <h3>Selecione a foto do produto</h3>
                    <label htmlFor="inputFile"><AiFillFileAdd size={40} /></label>
                    <input type="file" id="inputFile" onChange={criarCard}/>
                </main>

                {arquivoFoto && 
                <CardExibicaoDiv>
                    <img src={arquivoFoto} alt="Foto" />
                    <footer>
                        <h3>
                            {titulo}
                        </h3>
                        <div>
                            <p>
                                {filtro}
                            </p>
                            <p>
                                {subFiltro}
                            </p>
                        </div>
                    </footer>

                    {arquivoStorage != "" && <ConfirmarCriarCard CardCriado={CardCriado} arquivoFoto={arquivoFoto} userCollectionRef={userCollectionRef} arquivoStorage={arquivoStorage} titulo={titulo} filtro={filtro} subFiltro={subFiltro}/>}
                </CardExibicaoDiv>}
            </Finalizador>
            
        </CorpoDaPagina>
    )
}

export default CategoriaAdmin