import styled from "styled-components"
import ImagemDestaque from "../../ImagensDestaque"

const SectionCapa = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    img {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }
    h3 {
        font-family: 'adelia';
        justify-content: center;
        align-items: center;
        display: flex;
        margin: 0;
        font-size: 30px;
    }
`

const Centalizador = styled.div`
    width: 1400px;
    max-width: 100%;
    box-sizing: border-box;
    margin: 60px auto;
    display: flex;
    justify-content: space-between;
    @media (max-width: 910px) {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`

const imagemDestaque = [
    {
        title: "Produtos",
        image: "https://i.pinimg.com/originals/2e/2a/60/2e2a605ab3c772b33c1c53734bd33891.jpg",
        to: "produtos"
    },
    {
        title: "Paisagismo",
        image: "https://imagens-revista-pro.vivadecora.com.br/uploads/2018/06/o-que-e-paisagismo-paisagismo-jardim.jpg",
        to: "paisagismo"
    },
    {
        title: "Casamento",
        image: "https://img.freepik.com/fotos-premium/banner-de-um-vestido-de-noiva-e-buque-de-flores-nupciais-generative-ai_123447-37421.jpg",
        to: "casamento"
    },
    {
        title: "Decorações",
        image: "https://decoracaobrasil.com/wp-content/uploads/2021/11/decorac%CC%A7a%CC%83o-de-casamento-com-flores.png",
        to: "decoracoes"
    }
]

const Inicio = ({ filtrarPorCategoria }) => {
    return (
        <>
            <SectionCapa>
                <img src="https://firebasestorage.googleapis.com/v0/b/floricultura-boulevard.appspot.com/o/imagens%2Fwallpaper.jpeg?alt=media&token=cbb373a6-a7a4-47da-a52f-db4638eb846e&_gl=1*bvgfo7*_ga*MTc4ODI4OTE2LjE2OTE2MTkxMjY.*_ga_CW55HF8NVT*MTY5NzgzNTQwMS4zMS4xLjE2OTc4MzU2ODMuMjIuMC4w" alt="capa"/>   
                <h3>
                    Sempre há flores para aqueles que querem vê-las.   
                </h3> 
            </SectionCapa>

            <Centalizador>
                {imagemDestaque.map( (destaque) => (
                    <ImagemDestaque key={destaque.title} titulo={destaque.title} imagem={destaque.image} to={destaque.to} filtrarPorCategoria={filtrarPorCategoria}/>
                ))}
            </Centalizador>
        </>
    )
}

export default Inicio