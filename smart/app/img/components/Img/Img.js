import React, { Component } from 'react';
// import { youtubeIdToUrl } from 'services/helpers/utils';
import RaisedButton from 'material-ui/lib/raised-button';

const materialStyles = {
  paper: {
    textAlign: 'center',
    boxSizing: 'border-box'
  }
};

class Img extends Component {
  constructor(props) {
    super(props);
  }

// TODO: I tried to pass src as routes to locally stored images, but webpack fails to load them. Failed to find a solution so far. Only remote links work.
  render() {
    const styles = require('./Img.scss');
    const playerParams = {
      videoRoute: this.props.videoRoute,
      videoType: this.props.videoType,
      description: this.props.description,
      title: this.props.title,
      display: 'block',
      added: true
    };

    return (
      <div onClick={ () => {this.props.handleClick(playerParams);} }>
        <div>
          {/* <img src={youtubeIdToUrl(this.props.videoId)} */}
          {/* <img src={this.props.videoId} */}
          <img src={this.props.src}
            className={styles.img} />
        </div>
        <div style={materialStyles.paper}>
          <RaisedButton label={'Play'} />
          <RaisedButton label={'Like'} />
        </div>
      </div>
    );
  }
}

Img.propTypes = {
  videoId: React.PropTypes.string,
  handleClick: React.PropTypes.func,
  onClick: React.PropTypes.func,
  videoRoute: React.PropTypes.string,
  videoType: React.PropTypes.string,
  description: React.PropTypes.string,
  title: React.PropTypes.string,
  src: React.PropTypes.string,
  poster: React.PropTypes.string
};

export default Img;
