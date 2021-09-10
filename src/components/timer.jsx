// import PropTypes from 'prop-types';
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { addCurrentCount } from '../redux/actions/fetchActions';

// class Clock extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { };
//   }

//   componentDidMount() {
//     const { timer } = this.props;
//     const SECOND_1 = 1000;
//     this.intervalId = setInterval(timer(), SECOND_1);
//   }

//   // timer() {
//   //   const { currentCount } = this.state;
//   //   const { shoudStop, verifyClock, timer } = this.props;
//   //   if (currentCount < 1 || shoudStop) {
//   //     timer(currentCount);
//   //     verifyClock();
//   //     clearInterval(this.intervalId);
//   //   } else {
//   //     this.setState({
//   //       currentCount: currentCount - 1,
//   //     });
//   //   }
//   // }

//   render() {
//     const { currentCount } = this.props;

//     return (
//       <p>
//         {currentCount}
//       </p>
//     );
//   }
// }

// const { bool, func, number } = PropTypes;

// Clock.propTypes = {
//   shoudStop: bool,
//   verifyClock: func,
//   timer: func,
//   currentCount: number,
// }.isRequired;

// const mapDispatchToProps = (dispatch) => ({
//   timer: (payload) => dispatch(addCurrentCount(payload)),
// });

// export default connect(null, mapDispatchToProps)(Clock);
