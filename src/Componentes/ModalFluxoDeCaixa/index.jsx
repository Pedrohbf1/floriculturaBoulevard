import React from "react";
import styled from "styled-components";

const ModalFluxoCaixa = ({ venda, fecharModal }) => {
  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={fecharModal}>&times;</CloseButton>
        <ContentWrapper>
          <Title>Detalhes da Venda</Title>
          <List>
            {venda.map((item, index) => (
              <ListItem key={index}>
                <ProductInfo>
                  <strong>Produto:</strong> {item.produto}
                </ProductInfo>
                <ProductInfo>
                  <strong>Quantidade:</strong> {item.quantidade}
                </ProductInfo>
                <ProductInfo>
                  <strong>Preço Unitário:</strong> R${item.precoUnitario}
                </ProductInfo>
                <ProductInfo>
                  <strong>Preço Total:</strong> R${item.precoTotal}
                </ProductInfo>
              </ListItem>
            ))}
          </List>
        </ContentWrapper>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  color: #DAA520;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductInfo = styled.div`
  margin-bottom: 10px;

  strong {
    color: #DAA520;
    margin-right: 5px;
  }
`;

const CloseButton = styled.button`
  background-color: #DAA520;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
`;

export default ModalFluxoCaixa;
