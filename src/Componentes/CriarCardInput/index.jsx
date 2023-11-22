import { useState } from "react"

const InputCriarCard = ({ setarTitulo, titulo }) => {

    return (
        <section>
            <h3>Informe o nome do produto</h3>
            <input 
                type="text" 
                placeholder="Digite o nome do produto..."
                value={titulo}
                onChange={(e) => setarTitulo(e.target.value)}
            />
        </section>
    )
}

export default InputCriarCard