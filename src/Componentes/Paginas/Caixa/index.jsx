import { collection, getDocs, getFirestore } from "firebase/firestore";
import FirebaseApp from "../../../firebase";
import { useState, useEffect } from "react";
import styled from "styled-components";
import FormaDePagamento from "../../FormaDePagamento";
import CarrinhoDeCompras from "../../CarrinhoDeCompras";

const Caixa = () => {
  const db = getFirestore(FirebaseApp);
  const userCollectionRef = collection(db, "ProdutosCaixa");

  const [todosOsProdutos, setTodosOsProdutos] = useState([]);
  const [filtroProduto, setFiltroProduto] = useState("");
  const [opcoesFiltradas, setOpcoesFiltradas] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  const [nomeProdutoSelecionado, setNomeProdutoSelecionado] = useState("")
  const [valorProdutoSelecionado, setValorProdutoSelecionado] = useState("")

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setTodosOsProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  useEffect(() => {
    setOpcoesFiltradas(
      todosOsProdutos.filter((produto) =>
        produto.produto.toLowerCase().includes(filtroProduto.toLowerCase())
      )
    );
  }, [filtroProduto, todosOsProdutos]);

  const handleInputChange = (e) => {
    setFiltroProduto(e.target.value);
    setMostrarLista(true);
  };

  const [inputSelecionarQuantidade, setInputSelecionarQuantidade] = useState(false)

  const handleOptionClick = (produto) => {
    setFiltroProduto("");
    setValorProdutoSelecionado(produto.valor)
    setNomeProdutoSelecionado(produto.produto)
    setMostrarLista(false);
    setInputSelecionarQuantidade(true)
  };

  const handleInputFocus = () => {
    setMostrarLista(true);
  };

  const [quantidadeProduto, setQuantidadeProduto] = useState(1)

  function setarOValorConformeAQuantidae (quantidade) {
    const valorNumerico = quantidade.replace(/[^\d]/g, '');
    setQuantidadeProduto(valorNumerico);
  }

  const valorNumerico = parseFloat(valorProdutoSelecionado.replace(",", "."));

  const valorTotal = (quantidadeProduto * valorNumerico).toFixed(2);

  const [carrinhoDeCompras, setCarrinhoDeCompras] = useState([])
  const [exibirCarrinho, setExibirCarrinho] = useState(false)

  function AdicionarProdutoAoCarrinho (e) {
    e.preventDefault()
    setCarrinhoDeCompras([...carrinhoDeCompras, {
      produto: nomeProdutoSelecionado,
      quantidade: quantidadeProduto,
      precoTotal: valorTotal,
      precoUnitario: valorProdutoSelecionado
    }])
    setExibirCarrinho(true)
    setInputSelecionarQuantidade(false)
    setQuantidadeProduto(1)
  }

  const [esconderCaixa, setEsconderCaixa] = useState(false)

  function mostrarFormaDePagamento (e) {
    e.preventDefault()
    setMostrarLista(false)
    setEsconderCaixa(true)
  }

  const [totalDoCarrinho, setTotalDoCarrinho] = useState("")

  const [todasAsVendas, setTodasAsVendas] = useState([])

  const db2 = getFirestore(FirebaseApp) 
  const userCollectionRef2 = collection(db2, "Caixa") 

  const [pixVendas, setPixVendas] = useState([]);
  const [cartaoCreditoVendas, setCartaoCreditoVendas] = useState([]);
  const [cartaoDebitoVendas, setCartaoDebitoVendas] = useState([]);
  const [dinheiroVendas, setDinheiroVendas] = useState([]);

useEffect(() => {
	const getUsers = async () => {
		const data = await getDocs(userCollectionRef2)
		setTodasAsVendas(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }
   getUsers()
}, [])

useEffect(() => {
  const hoje = new Date();

    
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth() + 1; 
    const dia = hoje.getDate();

    const today = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;

    const pixVendasFiltradas = todasAsVendas.filter(
      (venda) => venda.formaDePagamento === 'pix' && venda.dia.includes(today)
    );
    
    const cartaoCreditoVendasFiltradas = todasAsVendas.filter(
      (venda) => venda.formaDePagamento === 'cartaoCredito' && venda.dia.includes(today)
    );
    
    const cartaoDebitoVendasFiltradas = todasAsVendas.filter(
      (venda) => venda.formaDePagamento === 'cartoDebito' && venda.dia.includes(today)
    );
    
    const dinheiroVendasFiltradas = todasAsVendas.filter(
      (venda) => venda.formaDePagamento === 'dinheiro' && venda.dia.includes(today)
    );

  setPixVendas(pixVendasFiltradas);
  setCartaoCreditoVendas(cartaoCreditoVendasFiltradas);
  setCartaoDebitoVendas(cartaoDebitoVendasFiltradas);
  setDinheiroVendas(dinheiroVendasFiltradas);

}, [todasAsVendas]);

const calcularTotalVendas = (vendas) => {
  const total = vendas.reduce((total, venda) => total + parseFloat(venda.valorTotal), 0);
  return typeof total === 'number' ? total.toFixed(2) : total
};

  return (
    <>
      <FormEstilizado>
        {!esconderCaixa &&
          <>
            <h2>Insira o produto</h2> 
            <input
              type="text"
              name="produtos"
              value={filtroProduto}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="Digite o nome do produto..."
            />
          </>
        }
        {mostrarLista && opcoesFiltradas.length > 0 && (
          <div>
            {opcoesFiltradas.map((produto) => (
              <section key={produto.id} onClick={() => handleOptionClick(produto)}>
                <label>{produto.produto}</label>
                <label>R${produto.valor}</label>
              </section>
            ))}
          </div>
        )}

        {inputSelecionarQuantidade && 
        <>
          <HeaderEstilizado>
            <section>
              <h2>Produto</h2>
              <span>
                <h3>{nomeProdutoSelecionado}</h3>
              </span>
            </section>

            <section>
              <h2>Quantidade</h2>
              <input type="text" value={quantidadeProduto} onChange={(e) => setarOValorConformeAQuantidae(e.target.value)} />
            </section>

            <section>
              <h2>Valor total</h2>
              <span>
                <h2>R${valorTotal}</h2>
              </span>
            </section>
            
          </HeaderEstilizado>
          
          <BotaoAdicionarAoCarrinho onClick={(e) => AdicionarProdutoAoCarrinho(e)}>Adicionar ao carrinho</BotaoAdicionarAoCarrinho>
        </>
        }

        {exibirCarrinho && !esconderCaixa &&
          <CarrinhoDeCompras carrinhoDeCompras={carrinhoDeCompras} setTotalDoCarrinho={setTotalDoCarrinho} mostrarFormaDePagamento={mostrarFormaDePagamento} />
        }

        {esconderCaixa && 
          <FormaDePagamento carrinhoDeCompras={carrinhoDeCompras}  totalDoCarrinho={totalDoCarrinho}/>
        }
      </FormEstilizado>

      <TotalDeVendas>
      <h2>Total de vendas do dia</h2>
      <section>
      <span>
        <h2>Pix</h2>
        <footer>R${calcularTotalVendas(pixVendas)}</footer>
      </span>

      <span>
        <h2>Dinheiro</h2>
        <footer>R${calcularTotalVendas(dinheiroVendas)}</footer>
      </span>

      <span>
        <h2>Cartão de crédito</h2>
        <footer>R${calcularTotalVendas(cartaoCreditoVendas)}</footer>
      </span>

      <span>
        <h2>Cartão de débito</h2>
        <footer>R${calcularTotalVendas(cartaoDebitoVendas)}</footer>
      </span>

      <span>
        <h2>Total de vendas</h2>
        <footer>R${calcularTotalVendas([...pixVendas, ...dinheiroVendas, ...cartaoCreditoVendas, ...cartaoDebitoVendas])}</footer>
      </span>
    </section>
</TotalDeVendas>
    </>
  );
};

const FormEstilizado = styled.form`
    width: 100%;
    border: 1px solid #DAA520;
    background-color: white;
    padding: 50px;
    border-radius: 15px;
    h2 {
        width: 100%;
        margin: 0;
        text-align: center;
        color: #DAA520;
    }
    input {
        width: 100%;
        
        border: 1px solid #DAA520;
        border-radius: 10px;
        padding: 15px;
        box-sizing: border-box;
        background-color: #F0F0F0;
    }
    div {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 15px;
        section {
            width: 100%;
            padding: 15px;
            border-radius: 10px;
            box-sizing: border-box;
            cursor: pointer;
            display: flex;
            background-color: #F0F0F0;
            justify-content: space-between;
        }
    }
`

const HeaderEstilizado = styled.main`
    width: 100%;
    display: flex;
    margin-top: 60px;
    gap: 30px;
    section {
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 1px;
        h2 {
            color: #DAA520;
            margin: 0;
        }
        span {
            border: 1px solid #DAA520;
            padding: 15px;
            border-radius: 10px;
            h3 {
                margin: 0;
            }
        }
    }
  :nth-child(3) {
    margin-left: 200px;
  }
  :nth-child(1) {
    span {
      width: 300px;
    }
  }
  :nth-child(2) {
    input {
      background-color: #FFF;
    }
  }
`

const CorpoEstilizado = styled.main`
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    h3 {
        text-align: center;
        margin: 10px 0;
        color: #DAA420;
    }
    :nth-child(2) {
        width: 150px;
        margin: 0;
        background-color: #FFF;
        text-align: center;
    }
`
const BotaoAdicionarAoCarrinho = styled.button`
  padding: 15px;
  border-radius: 10px;
  background-color: #DAA420;
  color: white;
  font-size: 18px;
  border: none;
  margin: 50px 0 0 325px;
  cursor: pointer;
`

const TotalDeVendas = styled.footer`
  width: 900px;
  height: 10px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
    color: #DAA520;
    margin: 0;
  }
  section {
    margin-top: 45px;
    display: flex;
    justify-content: space-around;
    span {
      display: flex;
      flex-direction: column;
      
      h3 {
        margin: 0;
        color: #DAA520;
        text-align: center;
      }
      footer {
        border: 1px solid #DAA520;
        padding: 15px;
        border-radius: 10px;
        background-color: #FFF;
      }
    }
  }
`

export default Caixa;
