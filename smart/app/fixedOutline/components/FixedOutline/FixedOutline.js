import React from 'react';

class FixedOutline extends React.Component {

  render() {
    return (
      <div style={{
        position: 'absolute',
        top: this.props.params.top,
        left: this.props.params.left,
        width: this.props.params.width,
        height: this.props.params.height,
        backgroundColor: 'transparent',
        outline: this.props.params.thickness + ' solid rgba(0, 120, 201, 0.4)'
      }} >
      </div>
    );
  }
}


FixedOutline.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default FixedOutline;
