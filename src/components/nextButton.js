import React from 'react';

class nextButton extends React.Component {
  render() {
    // const { nextQuestionBtn } = this.props;
    return (
      <div>
        <button
        //   onClick={ nextQuestionBtn }
          data-testid="btn-next"
          type="button"
        >
          Próxima pergunta
        </button>
      </div>
    );
  }
}

// nextButton.propTypes = {
//     nextQuestionBtn:
// }

export default nextButton;
