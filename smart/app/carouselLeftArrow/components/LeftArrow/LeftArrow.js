import React from 'react';
import { connect } from 'react-redux';
import translate from 'services/locales/translate';
import autoBind from 'services/helpers/autoBind';

function mapStateToProps(state) {
  return {
    locales: state.locales,
    dispatch: state.dispatch
  };
}

class LeftArrow extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  dispatchSelectedCarouselIndex() {
    console.log(this.props.index);
    this.props.dispatch({type: 'videoRoute', selectedCarouselIndex: this.props.index});
  }

  extendFunctionality(e) {
    e.preventDefault();
    this.dispatchSelectedCarouselIndex();
    this.props.onClick(e);
  }

  render() {
    const styles = require('./LeftArrow.scss');
    return (
        <div {...this.props} className={styles.btn}><span className={styles.text}>Prev</span>
          <button className={styles.btn + ' slick-prev'} component={'DIV'} onClick={this.extendFunctionality} ></button>
        </div>
    );
  }
}

LeftArrow.propTypes = {
  locales: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  index: React.PropTypes.number,
  onClick: React.PropTypes.func
};

const translatedLeftArrow = translate(['app'])(LeftArrow);
export default connect(mapStateToProps)(translatedLeftArrow);
