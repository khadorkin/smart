import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    added: state.videoPlayer.added
  };
}

class ContentAddRemove extends React.Component {
  render() {
    const styles = require('./RollUp.scss');
    const className = 'roll-up-height';

    return (
      <div>
        <ReactCSSTransitionReplace className={styles[className]} {...this.props} >
          {this.props.added ? this.props.children : null}
        </ReactCSSTransitionReplace>
      </div>
    );
  }
}

ContentAddRemove.propTypes = {
  children: React.PropTypes.object,
  added: React.PropTypes.bool
};

export default connect(mapStateToProps)(ContentAddRemove);
