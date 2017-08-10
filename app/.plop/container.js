import React from 'react';
import { connect } from 'react-redux';
import * as actionsCreators from 'Actions/ACTIONS';
import { COMPONENT } from 'Components/COMPONENT';

const mapStateToProps = ({ property }) => ({
  prop: property,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(COMPONENT);

