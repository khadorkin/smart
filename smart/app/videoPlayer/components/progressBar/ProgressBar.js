import React, { Component } from 'react';
import { connect } from 'react-redux';
import translate from 'services/locales/translate';

function mapStateToProps(state) {
  return {
    locales: state.locales,
    dispatch: state.dispatch,
    percentageLoaded: state.videoPlayer.percentageLoaded
  };
}

class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = require('./ProgressBar.scss');
    return (
      <div>
        <h2 className={styles.mainH2} >Video Loaded</h2>
        {this.props.percentageLoaded}%
      </div>
    );
  }
}


ProgressBar.propTypes = {
  locales: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  percentageLoaded: React.PropTypes.number
};

const translatedProgressBar = translate(['app'])(ProgressBar);
export default connect(mapStateToProps)(translatedProgressBar);
