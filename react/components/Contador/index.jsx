import React, { useState, useEffect } from 'react';
import "./contador.css";

const Contador = ({ children, linkPromocao, dataFinal, textoPromocao, textoPromocaoDestaque, textoBotao, textoBotaoDestaque, textoContador }) => {
  const [tempoRestante, setTempoRestante] = useState(calculaTempoRestante());

  useEffect(() => {
    const interval = setInterval(() => {
      setTempoRestante(calculaTempoRestante());
    }, 1000);

    return () => clearInterval(interval);
  }, []); 

  function calculaTempoRestante() {
    const dataAtual = new Date();
    const dataFinalDate = new Date(dataFinal);
    const diferenca = dataFinalDate - dataAtual;

    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    return {
      horas: padZero(horas),
      minutos: padZero(minutos),
      segundos: padZero(segundos),
    };
  }

  function padZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  return (
    <>
      <div className="contador">
      <div className="bg">{children}</div>
        <a href={linkPromocao} alt="Link Promoção">
          <div className="left-contador">
            <div className="text-contador">
              <p>{textoPromocao}<br></br><strong>{textoPromocaoDestaque}</strong></p>
            </div>
          </div>
          <div className="center-contador">
            <div className="text-contador">
              <p>{textoContador}<br></br><span>{`${tempoRestante.horas}:${tempoRestante.minutos}:${tempoRestante.segundos}`}</span></p>
            </div>
          </div>
          <div className="right-contador">
            <div className="text-contador">
              <p>{textoBotao}<br></br><strong>{textoBotaoDestaque}</strong></p>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}

Contador.schema = {
  title: "Contador de Promoções",
  description: "Informações Contador",
  type: "object",
  properties: {
    textoPromocao: {
      title: "Chamada de Promoção",
      description: "Insira a Chamada de Promoção",
      type: "string",
      default: null,
    },
    textoPromocaoDestaque: {
      title: "Destaque da Promoção",
      description: "Insira a Palavra de Destaque da Chamada de Promoção",
      type: "string",
      default: null,
    },
    textoContador: {
      title: "Texto do Contador",
      description: "Insira o texto que ficará acima do contador",
      type: "string",
      default: null,
    },
    dataFinal: {
      title: "Data Final",
      description: "Insira a Data que a promoção se encerra no formato: 2023-11-13T22:00:00",
      type: "string",
      default: null,
    },
    textoBotao: {
      title: "Chamada CTA",
      description: "Insira a chamada que ficará dentro da CTA em destaque",
      type: "string",
      default: null,
    },
    textoBotaoDestaque: {
      title: "Destaque CTA",
      description: "Insira o texto de destaque da chamada que ficará dentro da CTA em destaque",
      type: "string",
      default: null,
    },
    linkPromocao: {
      title: "Link",
      description: "Insira o link de redirecionamento",
      type: "string",
      default: null,
    }
  }
}


export default Contador;
