import { Link } from "react-router-dom"
import styled from "styled-components"

const ImagemDeDestaqueEstlizada = styled.section`
    width: 20%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    gap: 10px;
    position: relative;
  overflow: hidden;
    @media (max-width: 1400px) {
        width: 20%;
    }
    @media (max-width: 910px) {
        width: 80%;
    }
    h2 {
        margin: 0;
        color: rgba(0, 0, 0, 0.506);
    }
    img {
        width: 100%;
        height: 450px;
        object-fit: cover;
        border-radius: 20px;
        transition: transform 0.3s ease
    }
    img:hover {
        transform: scale(1.02, 1.02)
    }
`

const ImagemDestaque = ({ titulo, imagem, to, filtrarPorCategoria }) => {

    return (
        <ImagemDeDestaqueEstlizada>
            <h2>{titulo}</h2>
            <Link to={to} onClick={() => filtrarPorCategoria(to)}>
                <img src={imagem} alt="Imagem de destaque" />
            </Link>
        </ImagemDeDestaqueEstlizada>
    )
}

export default ImagemDestaque