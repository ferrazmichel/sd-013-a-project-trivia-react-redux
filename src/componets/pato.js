import React from 'react';
import patopng from '../patopng2.png'; // Tell webpack this JS file uses this image

function Pato() {
  // Import result is the URL of your image
  return <img className="png" src={ patopng } alt="Logo" />;
}

export default Pato;
