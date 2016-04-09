import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import translate from 'services/locales/translate';
import autoBind from 'services/helpers/autoBind';
// import ReactDom from 'react-dom';
import Img from '../../../img/components/Img/Img';
import PrevArrow from '../../../carouselLeftArrow/components/LeftArrow/LeftArrow';
import NextArrow from '../../../carouselRightArrow/components/RightArrow/RightArrow';

const settings = {
  dots: false,
  infinite: true,
  speed: 400,
  slidesToShow: 5,
  slidesToScroll: 1,
  adaptiveHeight: true,
  arrows: true,
  centerMode: false,
  // initialSlide: 1,
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
    console.log(videoSource);
    return (
      <div key={videoSource.id} >
        <Img videoId={videoSource.id}
             handleClick={ this.handleClick }
             videoRoute={videoSource.streams[0].url}
             videoType={videoSource.streams[0].type}
             description={videoSource.description}
             title={videoSource.title}
             src={videoSource.images.cover}
          />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Slider {...settings}>
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
  ).isRequired
};

const translatedCarousel = translate(['app'])(Carousel);
export default connect(mapStateToProps)(translatedCarousel);

