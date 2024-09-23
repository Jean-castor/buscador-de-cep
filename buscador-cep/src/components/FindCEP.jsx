import { useState } from "react";
import { FiSearch, FiAlertTriangle } from "react-icons/fi";
import api from "../services/api";

import "./Cep.css";

const FindCEP = () => {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({});

  async function handleSearch() {
    if (cep === "") {
      alert("Por favor, informe um CEP.");
      return;
    }

    try {
      const resp = await api.get(`${cep}/json/`);
      setAddress(resp.data);
      console.log(resp.data);

      setCep("");
    } catch {
      alert("Erro ao buscar CEP.");
      setCep("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">
        Buscador de
        <span className="cepTitle">CEP</span>
      </h1>
      <p className="subtitle ">
        Encontre o endereço completo a partir do CEP informado.
      </p>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP..."
          required
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />

        <button className="btnSearch" onClick={handleSearch}>
          <FiSearch size={25} />
        </button>
      </div>

      {/* Condição para renderizar as informações do cep */}

      {Object.keys(address).length > 0 && (
        <main className="main">
          {address.cep ? (
            <h2>CEP: {address.cep} </h2>
          ) : (
            <h2>
              CEP: {"não encontrado "}
             <FiAlertTriangle className="FiAlertIcon" />
            </h2>
          )}

          {address.logradouro ? (
            <span className="rua">Rua: {address.logradouro} </span>
          ) : (
            <span>
              Rua: {"não encontrada "}
             <FiAlertTriangle className="FiAlertIcon" />
            </span>
          )}

          {address.complemento ? (
            <span> Complemento: {address.complemento} </span>
          ) : (
            <span>
              {" "}
              Complemento: {"nenhum "}
             <FiAlertTriangle className="FiAlertIcon" />
            </span>
          )}

          {address.bairro ? (
            <span> Bairro: {address.bairro} </span>
          ) : (
            <span>
              {" "}
              Bairro: {"sem bairro "}
             <FiAlertTriangle className="FiAlertIcon" />
            </span>
          )}

          {address.localidade ? (
            <span> Cidade: {address.localidade} </span>
          ) : (
            <span>
              {" "}
              Cidade: {"sem cidade "}
             <FiAlertTriangle className="FiAlertIcon" />
            </span>
          )}

          {address.uf ? (
            <span> Estado: {address.uf} </span>
          ) : (
            <span>
              {" "}
              Estado: {"sem estado "}
             <FiAlertTriangle className="FiAlertIcon" />
            </span>
          )}

          {address.ddd ? (
            <span> DDD: {address.ddd} </span>
          ) : (
            <span>
              {" "}
              DDD: {"sem DDD "}
              <FiAlertTriangle className="FiAlertIcon" />
            </span>
          )}
        </main>
      )}
    </div>
  );
};

export default FindCEP;
