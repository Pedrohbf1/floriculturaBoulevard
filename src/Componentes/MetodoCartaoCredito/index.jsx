import { useState } from "react";
import styled from "styled-components";

const MetodoCartaoCredito = ({setQuantidadeVezesParcelado}) => {
  const vezesParceladas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

  const handleClick = (vezes) => {
    setOpcaoSelecionada(vezes);
    setQuantidadeVezesParcelado(vezes)
  };

  return (
    <HeaderEstilizado>
      {vezesParceladas.map((vezes) => {
        return (
          <span
            key={vezes}
            onClick={() => handleClick(vezes)}
            className={opcaoSelecionada === vezes ? "selecionado" : ""}
          >
            {vezes}x
          </span>
        );
      })}
    </HeaderEstilizado>
  );
};

const HeaderEstilizado = styled.header`
  width: 100%;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  span {
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #daa520;
    cursor: pointer;

    &.selecionado {
      background-color: #daa520;
      color: white;
    }
  }
`;

export default MetodoCartaoCredito;
