import React from 'react';

const Button = React.createClass({

  propTypes: {
    active: React.PropTypes.bool,
    children: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      active: false,
      onClick: this.onClick,
      text: 'A button'
    };
  },

  onClick(e) {
    e.preventDefault();
  },

  render() {
    const styles = require('./Button.scss');
    return (
      <button className={styles.button + ' ' + (this.props.active ? styles.buttonActive : '')} onClick={this.props.onClick} href="#" >
          {this.props.children}
      </button>
    );
  }

});

export default Button;
