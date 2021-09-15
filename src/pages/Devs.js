import React from 'react';
import trybeLogo from '../images/trybeLogo.png';
import './devs.css';

class Devs extends React.Component {
  renderArthur() {
    return (
      <div className="dev d-flex flex-column align-items-center">
        <h2>Arthur Goulart</h2>
        <img className="dev-image mb-3 mt-3" src="https://ca.slack-edge.com/TMDDFEPFU-U020DAPT0BY-cc19e70522ca-512" alt="arthur" />
        <a className="btn btn-info fw-bold mb-3" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/arthur-migotto-goulart/">
          LinkedIn
        </a>
        <a className="git-btn btn btn-dark fw-bold" target="_blank" rel="noopener noreferrer" href="https://github.com/ArthurMGoulart">
          GitHub
        </a>
      </div>
    );
  }

  render() {
    return (
      <main className="dev-page text-center">
        <img className="trybe-logo mt-3" src={ trybeLogo } alt="trybe" />
        <div className="devs-box d-flex flex-collumn mt-5">
          {this.renderArthur()}
          <div className="dev d-flex flex-column align-items-center">
            <h2>João Vieira</h2>
            <img className="dev-image mb-3 mt-3" src="https://ca.slack-edge.com/TMDDFEPFU-U01T5D9TGTE-c23adfbfaccd-512" alt="João" />
            <a className="btn btn-info fw-bold mb-3" target="_blank" rel="noopener noreferrer" href="https://www.linkedIn.com/">
              LinkedIn
            </a>
            <a className="git-btn btn btn-dark fw-bold" target="_blank" rel="noopener noreferrer" href="https://github.com/jonnyvieirausa">
              GitHub
            </a>
          </div>
          <div className="dev d-flex flex-column align-items-center">
            <h2>Júlia Baptista</h2>
            <img className="dev-image mb-3 mt-3" src="https://ca.slack-edge.com/TMDDFEPFU-U0219TMN0M6-1c25db3bcf15-512" alt="Júlia" />
            <a className="btn btn-info fw-bold mb-3" target="_blank" rel="noopener noreferrer" href="https://www.linkedIn.com">
              LinkedIn
            </a>
            <a className="git-btn btn btn-dark fw-bold" target="_blank" rel="noopener noreferrer" href="https://github.com/jonnyvieirausa">
              GitHub
            </a>
          </div>
          <div className="dev-special d-flex flex-column align-items-center">
            <h2>Tatiane Chiarello</h2>
            <img className="dev-image mb-3 mt-3" src="https://ca.slack-edge.com/TMDDFEPFU-U0205AMTZ55-1ddf110f5b05-512" alt="Tatiane" />
            <a className="btn btn-info fw-bold mb-3" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/tatiane-chiarello/">
              LinkedIn
            </a>
            <a className="git-btn btn btn-dark fw-bold" target="_blank" rel="noopener noreferrer" href="https://github.com/jonnyvieirausa">
              GitHub
            </a>
          </div>
        </div>
      </main>
    );
  }
}

export default Devs;
