import React from 'react';
import { action } from '@storybook/addon-actions';

// Export the original react-router
module.exports = require('react-router-original');

// Set the custom link component.
module.exports.Link = class Link extends React.Component {
  handleClick(e) {
    e.preventDefault();
    const { to } = this.props;
    action('Link')(to);
  }

  render() {
    const { children, style, to } = this.props;

    return (
      <a
        style={style}
        href={to}
        onClick={(e) => this.handleClick(e)}
      >
        {children}
      </a>
    );
  }
};
