import React from 'react';

import "./rastreio.css";

const Rastreio = () => {
  return (
    <>
      <div className="frame-rastreio">
        <iframe className="frame" src="https://rastreio.elevage.com.br"/>
      </div>
    </>
  )
}
  
export default Rastreio