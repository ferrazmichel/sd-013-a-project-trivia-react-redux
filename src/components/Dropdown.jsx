import React, { Component } from 'react';
import { DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Dropdown extends Component {
  render() {
    return (
      <DropdownButton id="dropdown-basic-button" title="...">
        <Link to="/ranking" className="text-decoration-none">
          <p className="text-center mt-2">
            Ver Ranking
          </p>
        </Link>
        <a href="https://pt.gravatar.com/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
          <p className="text-center">
            Criar Avatar
          </p>
        </a>
      </DropdownButton>
    );
  }
}

export default Dropdown;
