import styled from "styled-components"
import { BsFillTelephoneFill, BsWhatsapp } from 'react-icons/bs'
import { IoLocationSharp } from 'react-icons/io5'
import MapPage from "../../MapPage"

const DivCentralizadora = styled.main`
    width: 1400px;
    max-width: 100%;
    margin: 50px auto;
    padding: 10px 0 20px 0;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.200);
    align-items: center;
    justify-content: center;
    display: flex;
    div {
        div {
            display: flex;
            justify-content: space-around;
            a {
                color: #000;
                text-decoration: none;
            }
            section, div {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }
        }
        h3 {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`

const SectionEstilizada = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    h4 {
        margin: 0;
    }
`

const LocalizacaoEstilizada = styled.div`
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        text-decoration: none;
        gap: 5px;
    }
`

const Contato = () => {
    return (
        <DivCentralizadora>
            <div>
                <h3>Entre em contato que teremos um enorme prazer em atendê-los:</h3>
                <div>
                    <section>
                        <BsFillTelephoneFill size={25}/>
                        3271-1786
                    </section>
                    
                    <a href="https://wa.me/553732711786">
                        <div>
                            <BsWhatsapp size={25}/>
                            37 9 9671-9447
                        </div>
                    </a>
                </div>
                <h3>Onde nos encontrar ?</h3>

                <SectionEstilizada>
                    <MapPage />
                </SectionEstilizada>
                
                <LocalizacaoEstilizada>
                    <a href="https://maps.app.goo.gl/sXouKv966L2WJ8Su7">
                        <IoLocationSharp size={25} />
                        <h4>Praça Nove de Junho, 9 - Centro, Pitangui - MG, 35650-000</h4>
                    </a>
                </LocalizacaoEstilizada>

            </div>
        </DivCentralizadora>
    )
}

export default Contato