import { BrowserRouter, Route, Routes } from "react-router-dom"
import PaginaPadrao from "./Componentes/PaginaPadrao"
import EstilosGlobais from "./Componentes/EstilosGlobais"
import Inicio from "./Componentes/Paginas/Inicio"
import Produtos from "./Componentes/Paginas/Produtos"
import Erro404 from "./Componentes/Paginas/Erro404"
import Contato from "./Componentes/Paginas/Contato"
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import Paisagismo from "./Componentes/Paginas/Paisagismo"
import Casamento from "./Componentes/Paginas/Casamento"
import Decoracoes from "./Componentes/Paginas/Decoracoes"
import PaginaPadraoAdmin from "./Componentes/PaginaPadraoAdmin"
import CriarLogin from "./Componentes/Paginas/CriarLogin"
import InicioAdmin from "./Componentes/Paginas/InicioAdmin"
import CategoriaAdmin from "./Componentes/Paginas/CriarCard"
import RemoverProdutos from "./Componentes/Paginas/RemoverProdutos"

import firebaseApp from "./firebase"
import RemoverLogin from "./Componentes/Paginas/RemoverLogin"

function App() {

  // const firebaseApp = initializeApp({
  //   apiKey: "AIzaSyBXCUB7n_UfwSpLhd9nt8i4VV2UPlG1Q-0",
  //   authDomain: "floricultura-boulevard.firebaseapp.com",
  //   projectId: "floricultura-boulevard",
  // });  
  
  const db = getFirestore(firebaseApp) 
  const userCollectionRef = collection(db, "Produtos") 
  
  const [fotos, setFotos] = useState([])
  const [fotosSelecionadas, setFotosSelecionada] = useState(fotos)
  
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef)
      setFotos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
     }
     getUsers()
  }, [])

  function filtrarPorCategoria (filtro) {

    setFotosSelecionada(fotos.filter((foto) => {
      return foto.subFiltro === filtro
    }))
    
  }

  return (
    <BrowserRouter>
      <EstilosGlobais />

      <Routes>
        <Route path="/" element={<PaginaPadrao />}>
          <Route path="/" element={<Inicio filtrarPorCategoria={filtrarPorCategoria} />}/>
          <Route path="/produtos" element={<Produtos fotos={fotos} subFiltro="produtos"/>} />
          <Route path="/paisagismo" element={<Paisagismo fotos={fotos} subFiltro="paisagismo" />} />
          <Route path="/casamento" element={<Casamento fotos={fotos} subFiltro="casamento" />} />
          <Route path="/decoracoes" element={<Decoracoes fotos={fotos} subFiltro="decoracoes" />} />
          <Route path="/contato" element={<Contato />} />
        </Route>

        <Route path="/admin" element={<PaginaPadraoAdmin />}>
          <Route index element={<InicioAdmin />} />
          <Route path="adicionar-produtos" element={<CategoriaAdmin />} />
          <Route path="remover-produtos" element={<RemoverProdutos />} />
          <Route path="registrar" element={<CriarLogin />} />
          <Route path="remover-registrar" element={<RemoverLogin />} />
        </Route>

        <Route path="*" element={<Erro404 />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
