import React, { Component } from 'react';
import { connect } from 'react-redux';
import translate from 'services/locales/translate';

function mapStateToProps(state) {
  return {
    locales: state.locales,
    dispatch: state.dispatch,
    description: state.videoPlayer.description,
    title: state.videoPlayer.title
  };
}

class Text extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <hr />
        <div>{this.props.description}</div>
      </div>
    );
  }
}


Text.propTypes = {
  locales: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  description: React.PropTypes.string,
  title: React.PropTypes.string
};

const translatedText = translate(['app'])(Text);
export default connect(mapStateToProps)(translatedText);

