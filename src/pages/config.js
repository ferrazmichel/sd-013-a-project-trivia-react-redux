import React, { Component } from 'react';

class ConfigScreen extends Component {
  render() {
    return (
      <div className="App">
        <div className="game">
          <h1 className="setingsinfo" data-testid="settings-title">{' < bico de pato />'}</h1>
          <p className="setingsinfo">Hubs</p>
          <a className="setingsinfo" href="https://github.com/PadawanFK">{'João Victor <PadawanFK />'}</a>
          <a className="setingsinfo" href="https://github.com/RoyMusthang">{'Josué <RoyMusthang /> Lobo'}</a>
          <a className="setingsinfo" href="https://github.com/MatheusXI">{'<MatheusXI /> Macedo'}</a>
          <a className="setingsinfo" href="https://github.com/HajimeSonkai">{'Mauro <HajimeSonkai /> filho'}</a>
        </div>
      </div>
    );
  }
}

export default ConfigScreen;
