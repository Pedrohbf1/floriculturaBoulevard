import { useState } from "react";
import styled from "styled-components";
import FormaDePagamento from "../FormaDePagamento";
import { useEffect } from "react";

const CarrinhoDeCompras = ({ carrinhoDeCompras, mostrarFormaDePagamento, setTotalDoCarrinho}) => {

  useEffect(() => {
    setTotalDoCarrinho(calcularTotal(carrinhoDeCompras));
  }, [carrinhoDeCompras]);

    const calcularTotal = (carrinhoDeCompras) => {

      return carrinhoDeCompras.reduce(
        (total, item) => total + parseFloat(item.precoTotal.replace("R$", "")),
        0
      ).toFixed(2);
    };

  return (
    <>
        <CarrinhoEstilizado>
        <h2>Carrinho de Compras</h2>
        <ListaProdutos>
            {carrinhoDeCompras.map((item, index) => (
            <ProdutoCarrinho key={index}>
                <InfoProduto>
                <h3>{item.produto}</h3>
                <p>Quantidade: {item.quantidade}</p>
                <p>Preço Unitário: R${item.precoUnitario}</p>
                </InfoProduto>
                <PrecoTotal><h3>R${item.precoTotal}</h3></PrecoTotal>
            </ProdutoCarrinho>
            ))}
        </ListaProdutos>
        <TotalCarrinho>
            <h3>Total: R${calcularTotal(carrinhoDeCompras)}</h3>
            <BotaoFinalizarCompra onClick={(e) => mostrarFormaDePagamento(e)}>Finalizar Compra</BotaoFinalizarCompra>
        </TotalCarrinho>
        </CarrinhoEstilizado>
        </>
  );
};

const CarrinhoEstilizado = styled.main`
  border: 1px solid #DAA520;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  margin-top: 50px;
  h2 {
    color: #DAA520;
    text-align: center;
  }
`;

const ListaProdutos = styled.div`
  margin-top: 15px;
`;

const ProdutoCarrinho = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #DAA520;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #F0F0F0;
`;

const InfoProduto = styled.div`
  flex: 2;
  h3 {
    margin: 0;
  }
  p {
    margin: 0;
  }
`;

const PrecoTotal = styled.div`
  flex: 1;
  text-align: center;
  padding-left: 15px;
  h3 {
    margin: 0;
    color: #DAA420;
  }
`;

const TotalCarrinho = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const BotaoFinalizarCompra = styled.button`
  padding: 10px;
  border-radius: 5px;
  background-color: #DAA520;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

export default CarrinhoDeCompras;
