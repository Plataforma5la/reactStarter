import React from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from 'Actions/ACTIONS';

const mapStateToProps = ({ property }) => ({
  prop: property,
});

function mapDispatchToProps(dispatch) {
  return {
    func: () => dispatch(func()),
  };
}

class TestContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer);

