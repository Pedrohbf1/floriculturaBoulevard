import { useState } from "react";
import styled from "styled-components";
import MetodoCartaoCredito from "../MetodoCartaoCredito";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import FirebaseApp from '../../firebase'
import { useEffect } from "react";

const TerminarVenda = ({metodoDePagamentoSelecionado, carrinhoDeCompras, totalDoCarrinho,}) => {
  const [valorDoCliente, setValorDoCliente] = useState(totalDoCarrinho);
  const [troco, setTroco] = useState(0);
  const [valorCompletoCarrinho, setValorCompletoCarrinho] = useState(totalDoCarrinho)

  const handleInputChange = (event) => {
    const valorDigitado = event.target.value;
    const valorLimpo = valorDigitado.replace(/[^0-9,]/g, "");
    setValorDoCliente(valorLimpo);
  };

  const calcularTroco = (e) => {
    e.preventDefault()
    const valorCliente = parseFloat(valorDoCliente.replace(",", "."));
    const trocoCalculado = valorCliente - valorCompletoCarrinho;
    setTroco(trocoCalculado.toFixed(2));
  };

  const db = getFirestore(FirebaseApp)
  const userCollectionRef = collection(db, "Caixa")

  const [quantidadeVezesParcelado, setQuantidadeVezesParcelado] = useState(1)

  const hoje = new Date();

    
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth() + 1; 
    const dia = hoje.getDate();
    const horas = hoje.getHours();
  const minutos = hoje.getMinutes();
  const segundos = hoje.getSeconds();

  const dataFormatada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano} ${horas}:${minutos}:${segundos}`;

    const [desconto, setDesconto] = useState(0)
    const [tipoDeDesconto, setTipoDeDesconto] = useState("Dinheiro")

    const [temDesconto, setTemDesconto] = useState("")

    function SetarDesconto (e) {

      const input = e.target.value;

      const numerosEPoint = input.replace(/[^0-9.]/g, '');

      const numerosEPointSemMaisDeUmPonto = numerosEPoint.replace(/(\..*)\./g, '$1');

        setDesconto(numerosEPointSemMaisDeUmPonto)
    }

    useEffect(() => {
        if (desconto !== 0) {
          if (tipoDeDesconto === "Dinheiro") {
            setTemDesconto(`R$${desconto}`);
          } else {
            setTemDesconto(`${desconto}%`);
          }
        }
      }, [desconto, tipoDeDesconto]);

  async function EnviarVendaParaOCaixa (e) {
    e.preventDefault()

    try {
        const venda = await addDoc(userCollectionRef, {
            valorTotal: valorCompletoCarrinho,
            desconto: temDesconto,
            parcelas: quantidadeVezesParcelado,
            dia: dataFormatada,
            formaDePagamento: metodoDePagamentoSelecionado,
            venda: carrinhoDeCompras
        })
        alert('Venda registrada com sucesso!');
        window.location.reload();
    } catch(error) {
        console.error("Erro ao fazer a venda", error)
        alert('Erro ao registrar venda. Verifique o console para mais detalhes.');
    }

  }

  useEffect(() => {
    if(tipoDeDesconto === "Dinheiro") {
        setValorCompletoCarrinho(totalDoCarrinho - desconto)
    } else {
        const valorDesconto = (desconto / 100) * totalDoCarrinho;
        setValorCompletoCarrinho((totalDoCarrinho - valorDesconto).toFixed(2));
    }
  }, [desconto, tipoDeDesconto, totalDoCarrinho])

  return (
    <>
      <HeaderEstilizado>
        <section>
          <div>
            <h2>Valor total da compra</h2>
            <span>
              <h3>R${valorCompletoCarrinho}</h3>
            </span>
          </div>
          <div>
            <h2>Desconto</h2>
            <span>
              <select value={tipoDeDesconto} onChange={(e) => setTipoDeDesconto(e.target.value)}>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Porcentagem">Porcentagem</option>
              </select>
              <input type="text" value={desconto} onChange={((e) => SetarDesconto(e))}/>
            </span>
          </div>
        </section>
      </HeaderEstilizado>

    {metodoDePagamentoSelecionado === "cartaoCredito" &&
        <>
            <CorpoEstilizado>
                <h2>A forma de pagamento selecionada foi cartão de crédito</h2>
            </CorpoEstilizado>
            <MetodoCartaoCredito setQuantidadeVezesParcelado={setQuantidadeVezesParcelado}/>
        </>
    }

      {metodoDePagamentoSelecionado === "cartoDebito" && 
        <CorpoEstilizado>
          <h2>A forma de pagamento selecionada foi cartão de debito</h2>
        </CorpoEstilizado>}
      {metodoDePagamentoSelecionado === "pix" && (
        <CorpoEstilizado>
          <h2>A forma de pagamento selecionada foi Pix</h2>
          <section>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/floricultura-boulevard.appspot.com/o/imagens%2Fqrcode-pix.png?alt=media&token=022de342-0bb8-4599-a135-75d91181c3ec"
              alt=""
            />
            <span>
              <h3>Chave pix : (37) 99671-9447</h3>
              <h3>Nome : Carla Rodrigues Bahia</h3>
              <h3>Banco : Caixa Economica Federal</h3>
            </span>
          </section>
        </CorpoEstilizado>
      )}
      {metodoDePagamentoSelecionado === "dinheiro" && (
        <MetodoDinheiro>
          <h2>A forma de pagamento selecionada foi dinheiro</h2>
          <section>
            <span>
              <label>Insira quanto o cliente está te dando</label>
              <input
                type="text"
                value={valorDoCliente}
                onChange={(e) => handleInputChange(e)}
              />
              <h3>Troco: R${troco}</h3>
              <section>
                <button onClick={(e) => calcularTroco(e)}>Calcular Troco</button>
              </section>
            </span>
          </section>
        </MetodoDinheiro>
      )}
    <BotaoEstilizado onClick={(e) => EnviarVendaParaOCaixa(e)}>Finalizar venda</BotaoEstilizado>
    </>
  );
};

const HeaderEstilizado = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-around;
  section {
    display: flex;
    text-align: center;
    gap: 30px;
    :nth-child(2) {
        display: flex;
        flex-direction: column;
        gap: 10px;
        select {
            border: 1px solid #daa520;
            color: #daa520;
            background-color: #FFF;
            padding: 5px;
            font-size: 19px;
        }
    }
    h2 {
      color: #daa520;
      margin: 0;
    }
    span {
      border: 1px solid #daa520;
      padding: 15px;
      border-radius: 10px;
      h3 {
        margin: 0;
      }
    }
  }
  :nth-child(3) {
    margin-left: 250px;
  }
`;

const CorpoEstilizado = styled.main`
  width: 100%;
  margin: 45px 0;
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      color: #daa520;
    }
    img {
      width: 300px;
    }
    span {
      display: flex;
      flex-direction: column;
      gap: 10px;
      h3 {
        margin: 0;
        color: #daa520;
      }
    }
  }
`;

const MetodoDinheiro = styled.header`
  width: 100%;
  margin: 45px 0;
  section {
    margin-top: 50px;
    display: flex;
    text-align: center;
    justify-content: center;
    gap: 30px;
    span {
      label {
        color: #daa520;
        font-size: 18px;
      }
      input {
        background-color: #fff;
        text-align: center;
      }
      h3 {
        color: #daa520;
        font-size: 20px;
      }
    }
  }
  button {
    background-color: #daa520;
    border: none;
    border-radius: 10px;
    padding: 15px;
    color: #FFF;
    font-size: 18px;
  }
`;

const BotaoEstilizado = styled.button`
    width: 100%;
    margin-top: 30px;
    padding: 10px 0;
    border: none;
    color: #FFF;
    background-color: #DAA520;
    font-size: 22px;
    border-radius: 15px;
    cursor: pointer;
    font-weight: bold;
`

export default TerminarVenda;
