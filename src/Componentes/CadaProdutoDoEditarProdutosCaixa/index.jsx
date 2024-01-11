import { ImBin2 } from 'react-icons/im'
import { FaPencilAlt } from "react-icons/fa";
import { useState } from 'react';
import ModalEditarProdutoCaixa from '../ModaEditarProdutoCaixa';

const EditarProdutos = (props) => {

    const [modalEditarProduto, setModalEditarProduto] = useState(false)

    function editarProduto () {
        setModalEditarProduto(!modalEditarProduto)
    }

    return (
        <section>
            <div>
                <span>
                    <h3>Nome</h3>
                    <h4>{props.produto}</h4>
                </span>
                <span>
                    <h3>Valor</h3>
                    <h4>R${props.valor}</h4>
                </span>
                <div style={{display: "flex", gap: "15px"}}>
                    <ImBin2 style={{cursor: "pointer", backgroundColor: "#DAA520", padding: "3px", borderRadius: "5px", color: "#FFF"}} size={20} onClick={() => props.deletarLogin(props.id)}  />
                    <FaPencilAlt style={{cursor: "pointer", backgroundColor: "#DAA520", padding: "3px", borderRadius: "5px", color: "#FFF"}} size={20} onClick={() => editarProduto()} />
                    {modalEditarProduto && <ModalEditarProdutoCaixa produto={props.produto} valor={props.valor} id={props.id} editarProduto={editarProduto} />}
                </div>
            </div>
        </section>
    )
}

export default EditarProdutos