import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  render() {
    const { options, nameBtn, onClick } = this.props;
    console.log(options);
    return (
      <div className="dropdown">
        <h2>{ nameBtn }</h2>
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          { nameBtn }
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          { options.map((option) => (
            <li key={ option.id || option }>
              <button
                className="dropdown-item"
                type="button"
                name={ option.name || option }
                onClick={ onClick }
              >
                { option.name }
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  nameBtn: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  // options: PropTypes.ArrayOf(PropTypes.object).isRequired,
};

export default Dropdown;
