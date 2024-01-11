import React, { useState, useEffect } from "react";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import FirebaseApp from "../../../firebase";
import styled from "styled-components";
import CadaVenda from "../../CadaVendaFluxoCaixa";

const FluxoCaixa = () => {
  const db = getFirestore(FirebaseApp);
  const userCollectionRef = collection(db, "Caixa");

  const [todasAsVendas, setTodasAsVendas] = useState([]);
  const [selecionarDia, setSelecionarDia] = useState("hoje");
  const [intervaloDeDias, setIntervaloDeDias] = useState("");

  const [valorTotalVendas, setValorTotalVendas] = useState(0);

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth() + 1;
  const dia = hoje.getDate();
  const dataFormatada = `${dia < 10 ? "0" + dia : dia}/${mes < 10 ? "0" + mes : mes}/${ano}`;

  const calcularIntervalo = (opcao) => {
    const dataSelecionada = new Date(hoje);
  
    if (opcao === "semana") {
      dataSelecionada.setDate(hoje.getDate() - 7);
    } else if (opcao === "mes") {
      dataSelecionada.setMonth(hoje.getMonth() - 1);
      dataSelecionada.setDate(1); // Começa do primeiro dia do mês anterior
    } else if (opcao === "ano") {
      dataSelecionada.setFullYear(hoje.getFullYear() - 1);
      dataSelecionada.setMonth(0); // Começa do primeiro dia do ano anterior
      dataSelecionada.setDate(1);
    }
  
    const anoSelecionado = dataSelecionada.getFullYear();
    const mesSelecionado =
      dataSelecionada.getMonth() + 1 < 10
        ? "0" + (dataSelecionada.getMonth() + 1)
        : dataSelecionada.getMonth() + 1;
  
    const diaSelecionado =
      dataSelecionada.getDate() < 10
        ? "0" + dataSelecionada.getDate()
        : dataSelecionada.getDate();
  
    return `${diaSelecionado}/${mesSelecionado}/${anoSelecionado}`;
  };

  useEffect(() => {
    const getUsers = async () => {
      if (selecionarDia === "hoje") {
        setIntervaloDeDias(dataFormatada);
      } else {
        const dataCalculada = calcularIntervalo(selecionarDia);
        setIntervaloDeDias(dataCalculada);
      }

      const q = query(userCollectionRef, where("dia", ">=", intervaloDeDias));
      let data = await getDocs(q);

      const vendasOrdenadas = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => new Date(b.dia) - new Date(a.dia));

      setTodasAsVendas(vendasOrdenadas);
      const total = vendasOrdenadas.reduce((acc, venda) => acc + parseFloat(venda.valorTotal), 0);
      setValorTotalVendas(total);

    };

    getUsers();
  }, [selecionarDia, dataFormatada, userCollectionRef, intervaloDeDias]);

  return (
    <FluxoCaixaContainer>
      <h2>Fluxo de Caixa</h2>
      <SelecionarDia>
        <h3>Selecione o dia:</h3>
        <SelectStyled onChange={(e) => setSelecionarDia(e.target.value)}>
          <option value="hoje">Hoje</option>
          <option value="semana">Últimos 7 dias</option>
          <option value="mes">Último mês</option>
          <option value="ano">Último ano</option>
        </SelectStyled>
      </SelecionarDia>
      <TotalVendas>
        <strong>Total de Vendas:</strong> R${valorTotalVendas.toFixed(2)}
      </TotalVendas>

      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>Data</th>
              <th>Forma de Pagamento</th>
              <th>Parcelas</th>
              <th>Desconto</th>
              <th>Valor Total</th>
              <th>Venda</th>
            </tr>
          </thead>
          <tbody>
            {todasAsVendas.map((venda) => (
              <CadaVenda key={venda.id} valorTotal={venda.valorTotal} venda={venda.venda} dia={venda.dia} formaDePagamento={venda.formaDePagamento} parcelas={venda.parcelas} desconto={venda.desconto} />
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </FluxoCaixaContainer>
  );
};

const FluxoCaixaContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const SelecionarDia = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  h3 {
    color: #DAA520;
    margin: 0;
  }

  select {
    margin-top: 5px;
    padding: 5px;
    font-size: 18px;
    border: 1px solid #DAA420;
    border-radius: 3px;
  }
`;

const TableContainer = styled.div`
  margin-top: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #DAA420;
    color: #fff;
  }

  tbody {
    background-color: #fff;
  }

  th,
  td {
    padding: 12px;
    text-align: left;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  button {
    background-color: #DAA520;
    color: #fff;
    padding: 8px 12px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }
`;

const SelectStyled = styled.select`
  margin-top: 5px;
  padding: 5px;
  font-size: 18px;
  border: 1px solid #DAA420;
  border-radius: 3px;
`;

const TotalVendas = styled.div`
  margin-top: 20px;
  strong {
    color: #DAA520;
  }
`;

export default FluxoCaixa;
