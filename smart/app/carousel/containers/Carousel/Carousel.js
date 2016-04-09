import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import translate from 'services/locales/translate';
import autoBind from 'services/helpers/autoBind';
import getCoords from 'services/helpers/getCoords';
import setStyle from 'services/helpers/setStyle';
import ReactDom from 'react-dom';
import Img from '../../../img/components/Img/Img';
import PrevArrow from '../../../carouselLeftArrow/components/LeftArrow/LeftArrow';
import NextArrow from '../../../carouselRightArrow/components/RightArrow/RightArrow';

function mapStateToProps(state) {
  return {
    locales: state.locales,
    dispatch: state.dispatch
  };
}

class Carousel extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.appendOutline();
  }

  getCenterElementParams() {
    const centerElement = ReactDom.findDOMNode(this).querySelectorAll('.slick-active')[2];
    ReactDom.findDOMNode(this).querySelectorAll('.slick-active')[2].setAttribute('style', '2px solid red');
    const top = getCoords(centerElement).top;
    const left = getCoords(centerElement).left;
    const width = centerElement.clientWidth;
    const height = centerElement.clientHeight;
    return {
      top: top,
      left: left,
      width: width,
      height: height
    };
  }

  createStyles() {
    const params = this.getCenterElementParams();
    return {
      position: 'absolute',
      top: params.top + 'px',
      left: params.left + 'px',
      width: params.width + 'px',
      height: params.height + 'px',
      backgroundColor: 'transparent',
      outline: '5px solid rgba(0, 120, 201, 0.4)'
    };
  }

  appendOutline() {
    const div = document.createElement('DIV');
    setStyle( div, this.createStyles() );
    ReactDom.findDOMNode(this).appendChild(div);
  }

  handleClick(opts) {
    this.props.dispatch({
      type: 'videoRoute',
      videoRoute: opts.videoRoute,
      videoType: opts.videoType,
      description: opts.description,
      title: opts.title,
      display: opts.display,
      added: opts.added
    });
  }

  /*
  renderYouTubeVideoId(videoId, index) {
    return (
      <div key={videoId} >
        <Img videoId={videoId}
             handleClick={ this.handleClick }
             ref={ index + '-' + videoId }
             copiedRef={ index + '-' + videoId } />
      </div>
    );
  }
  */

  renderVideoId(videoSource) {
    return (
      <div key={videoSource.id} >
        <Img videoId={videoSource.id}
             handleClick={ this.handleClick }
             videoRoute={videoSource.streams[0].url}
             videoType={videoSource.streams[0].type}
             description={videoSource.description}
             title={videoSource.title}
             src={videoSource.images.cover}
             poster={videoSource.images.placeholder}
          />
      </div>
    );
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 5,
      slidesToScroll: 1,
      adaptiveHeight: true,
      arrows: true,
      // centerMode: true,
      // initialSlide: 0,
      lazyLoad: true,
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 1024, settings: { slidesToShow: 5 } }
      ],
      afterChange: () => {},
      beforeChange: () => {},
      nextArrow: NextArrow,
      prevArrow: PrevArrow
    };
    return (
      <div>
        <Slider ref={this.props.ref} {...settings}>
          {this.props.videoIds.map(this.renderVideoId)}
        </Slider>
      </div>
    );
  }
}

Carousel.propTypes = {
  locales: PropTypes.object,
  dispatch: PropTypes.func,
  videoIds: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  ref: PropTypes.string
};

const translatedCarousel = translate(['app'])(Carousel);
export default connect(mapStateToProps)(translatedCarousel);

