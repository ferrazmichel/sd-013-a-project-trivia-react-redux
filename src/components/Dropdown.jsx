import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.filterEntertainment = this.filterEntertainment.bind(this);
  }

  filterEntertainment = (categoryOption) => {
    const regex = /(?<=\: ).*/g;
    if (regex.test(categoryOption)) {
      const simplifyCategoryOption = categoryOption.match(regex);
      return simplifyCategoryOption;
    }
    return categoryOption;
  }

  render() {
    const { options, title, nameBtn, onClick } = this.props;
    // console.log(options);
    return (
      <div className="dropdown">
        <h2>{ title }</h2>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          { nameBtn }
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          { options.map((option, index) => (
            <li key={ option.id || option }>
              <button
                id= { option.id || index }
                className="dropdown-item"
                type="button"
                // value={ option.name || option }
                value= { option.name ? this.filterEntertainment(option.name) : option  }
                onClick={ onClick }
                name={ title.toLowerCase() }
              >
                { option.name ? this.filterEntertainment(option.name) : option }
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
