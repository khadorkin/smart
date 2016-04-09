import React from 'react';
import ReactDOM from 'react-dom';
import {default as Video, Controls, Overlay} from 'react-html5video';
import Button from '../../components/button/button';
import ProgressBar from '../../components/progressBar/progressBar';
import VideoDescription from '../../../text/components/Text/Text';
import { connect } from 'react-redux';
import translate from 'services/locales/translate';
import autoBind from 'services/helpers/autoBind';

function mapStateToProps(state) {
  return {
    locales: state.locales,
    dispatch: state.dispatch,
    videoRoute: state.videoPlayer.videoRoute,
    videoType: state.videoPlayer.videoType,
    videoId: state.videoPlayer.videoId
  };
}

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.videoRoute !== this.props.videoRoute;
  }

  componentDidUpdate() {
    this.reloadVideo();
  }

  onProgress() {
    const el = ReactDOM.findDOMNode(this.refs.video).getElementsByTagName('video')[0];
    this.props.dispatch({
      type: 'percentageLoaded',
      percentageLoaded: el.buffered.length && el.buffered.end(el.buffered.length - 1) / el.duration * 100
    });
  }

  setVolume() {
    this.refs.video.setVolume(this._volumeInput.valueAsNumber);
  }

  play() {
    this.refs.video.play();
  }

  pause() {
    this.refs.video.pause();
  }

  unmute() {
    this.refs.video.unmute();
  }

  mute() {
    this.refs.video.mute();
  }

  seek() {
    this.refs.video.seek(this._seekInput.valueAsNumber);
  }

  load() {
    this.refs.video.load();
  }

  fullscreen() {
    this.refs.video.fullscreen();
  }

  toggleMute() {
    this.refs.video.toggleMute();
  }

  togglePlay() {
    this.refs.video.togglePlay();
  }

  reloadVideo() {
    // When changing a HTML5 video, you have to reload it.
    this.refs.video.load();
    this.refs.video.play();
  }

  render() {
    const styles = require('./VideoPlayer.scss');
    return (
      <div className={styles.main} >
        <h1 className={styles.mainTitle} >
          <img className={styles.mainLogo} src={"http://cdn-lc.gcdn.co/uploads/public/layouts/2015_08_27__12_06_56_WoTX-Xboxlight2-preload-RU/variative_content/RU/header/elements/wot360logo/elements/logo/164296/world-of-tanks-360-edition_1400250758.png"} alt={"World of Tanks"} />
        </h1>
        <div className={styles.mainVideo} >
          <Video loop mute ref={"video"} onProgress={this.onProgress}>
            <source src={this.props.videoRoute} type={'video/' + this.props.videoType} />
            <Overlay />
            <Controls />
          </Video>
          <div className={styles.description}>
            <VideoDescription />
          </div>
        </div>
        <div className={styles.mainCols} >
          <div className={styles.mainCol1} >
            <ProgressBar />
          </div>
          <div className={styles.mainCol2} >
            <h2 className={styles.mainH2} >Video API</h2>
            <ul className={styles.mainUl} >
              <li>
                <Button onClick={this.play}>play</Button>
              </li>
              <li>
                <Button onClick={this.pause}>pause</Button>
              </li>
              <li>
                <Button onClick={this.togglePlay}>togglePlay</Button>
              </li>
              <li>
                <Button onClick={this.toggleMute}>toggleMute</Button>
              </li>
              <li>
                <Button onClick={this.setVolume}>setVolume</Button>
                <input className={styles.mainInput} defaultValue={"1"} ref={(c) => this._volumeInput = c} type={"number"} min={"0"} max={"1"} step={"0.1"} />
              </li>
              <li>
                <Button onClick={this.fullscreen}>fullscreen</Button>
              </li>
              <li>
                <Button onClick={this.mute}>mute</Button>
              </li>
              <li>
                <Button onClick={this.unmute}>unmute</Button>
              </li>
              <li>
                <Button onClick={this.seek}>seek</Button>
                <input className={styles.mainInput} defaultValue={"30"} ref={(c) => this._seekInput = c} type={"number"} min={"0"} max={"30"} step={"1"} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  videoRoute: React.PropTypes.string,
  videoType: React.PropTypes.string,
  videoId: React.PropTypes.number,
  locales: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

const translatedVideoPlayer = translate(['app'])(VideoPlayer);
export default connect(mapStateToProps)(translatedVideoPlayer);
