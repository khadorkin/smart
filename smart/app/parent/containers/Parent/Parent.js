import React, {Component} from 'react';
import Child from '../../../child/components/Child/Child';
import { connect } from 'react-redux';
import GridList from 'material-ui/lib/grid-list/grid-list';
import autoBind from 'services/helpers/autoBind';
import ReactDom from 'react-dom';

function mapStateToProps(state) {
  return {
    ...state
  };
}

class Parent extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleClick(ref) {
    if ( this.prevFocusedElem ) {
      this.prevFocusedElem.style.outline = '';
    }
    const currentFocusedElem = ReactDom.findDOMNode(this.refs[ref]);
    currentFocusedElem.style.outline = '1px solid red';
    this.prevFocusedElem = currentFocusedElem;
  }

  renderVideoId(videoId, index) {
    return (
      <Child key={videoId}
             videoId={videoId}
             ref={ index + '-' + videoId }
             copiedRef={ index + '-' + videoId }
             handleClick={ this.handleClick } />
    );
  }

  render() {
    return (
      <div>
        <GridList
          cellHeight={250}
          padding={20}
          cols={5}
          >
          {this.props.videoIds.map(this.renderVideoId)}
        </GridList>
      </div>
    );
  }
}

Parent.propTypes = {
  videoIds: React.PropTypes.arrayOf(
    React.PropTypes.string
  ).isRequired
};

export default connect(mapStateToProps)(Parent);
