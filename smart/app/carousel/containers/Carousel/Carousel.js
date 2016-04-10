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
    dispatch: state.dispatch,
    selectedCarouselIndex: state.videoPlayer.selectedCarouselIndex
  };
}

class Carousel extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidUpdate(prevProps) {
    if (!(prevProps.index === this.props.index && prevProps.selectedCarouselIndex === this.props.selectedCarouselIndex)) {
      this.highlightCenteredItem();
    }
  }

  getCenterElementParams() {
    const centerElement = ReactDom.findDOMNode(this).querySelectorAll('.slick-active')[2];
    const width = centerElement.offsetWidth;
    const height = centerElement.offsetHeight;
    const left = getCoords(centerElement).left;
    return {
      left: left,
      width: width,
      height: height
    };
  }

  createStyles() {
    const params = this.getCenterElementParams();
    return {
      position: 'absolute',
      top: 0,
      left: params.left + 'px',
      width: params.width + 'px',
      height: params.height + 'px',
      backgroundColor: 'rgba(0, 120, 201, 0.07)',
      pointerEvents: 'none',
      display: this.props.index === this.props.selectedCarouselIndex ? 'block' : 'none'
    };
  }

  highlightCenteredItem() {
    if (this.highlighted) { ReactDom.findDOMNode(this.highlighted).remove(); }
    const slickList = ReactDom.findDOMNode(this).querySelector('.slick-list');
    slickList.style.position = 'relative';
    const div = document.createElement('DIV');
    setStyle( div, this.createStyles() );
    this.highlighted = div;
    ReactDom.findDOMNode(slickList).appendChild(this.highlighted);
  }

  handleClick(opts) {
    this.props.dispatch({
      type: 'videoRoute',
      videoRoute: opts.videoRoute,
      videoType: opts.videoType,
      description: opts.description,
      title: opts.title,
      display: opts.display,
      added: opts.added,
      selectedCarouselIndex: this.props.index
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
      <div key={videoSource.id}>
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
    const styles = require('./Carousel.scss');
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
      afterChange: () => {this.highlightCenteredItem();},
      beforeChange: () => {},
      nextArrow: NextArrow,
      prevArrow: PrevArrow
    };
    return (
      <div className={styles.root} >
        <Slider ref={this.props.ref} key={this.props.ref} {...settings}>
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
  ref: PropTypes.string,
  index: PropTypes.number,
  selectedCarouselIndex: PropTypes.number
};

const translatedCarousel = translate(['app'])(Carousel);
export default connect(mapStateToProps)(translatedCarousel);

