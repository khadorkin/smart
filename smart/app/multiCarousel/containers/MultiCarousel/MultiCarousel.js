import React, {Component} from 'react';
import Carousel from '../../../carousel/containers/Carousel/Carousel';
import VideoPlayer from '../../../videoPlayer/containers/VideoPlayer/VideoPlayer';
// import playlist from 'services/storage/playlist';
import playlist from 'services/storage/movies';
import { connect } from 'react-redux';
import RollUp from '../../../rollUp/components/RollUp/RollUp';

function mapStateToProps(state) {
  return {
    display: state.videoPlayer.display,
    added: state.videoPlayer.added,
    dispatch: state.dispatch
  };
}

class MultiCarousel extends Component {

  render() {
    const styles = require('./MultiCarousel.scss');

    return (
      <div>
        <RollUp transitionName={'roll-up'} component={'div'} transitionEnterTimeout={800} transitionLeaveTimeout={800}>
          <div className={styles[this.props.display]}>
              <VideoPlayer />
          </div>
        </RollUp>
        <div>
          {Object.keys(playlist).map(function getPlaylists(playlistName) {
            return (
              <Carousel videoIds={playlist[playlistName]}
                      key={playlistName} />
            );
          })}
        </div>
      </div>
    );
  }
}

MultiCarousel.propTypes = {
  display: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  added: React.PropTypes.bool
};

export default connect(mapStateToProps)(MultiCarousel);
