import React, { Component } from 'react';
import { youtubeIdToUrl } from 'services/helpers/utils';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  root: {
    margin: 20,
    cursor: 'pointer'
  },
  gridTile: {
    height: 200
  },
  paper: {
    textAlign: 'center',
    boxSizing: 'border-box'
  }
};

class Child extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.root} onClick={ () => {this.props.handleClick(this.props.copiedRef);} }>
        <GridTile
          style={styles.gridTile} >
          <img src={youtubeIdToUrl(this.props.videoId)} />
        </GridTile>
        <div style={styles.paper}>
          <RaisedButton label={"Play"} />
          <RaisedButton label={"Like"} />
        </div>
      </div>
    );
  }
}

Child.propTypes = {
  videoId: React.PropTypes.string,
  copiedRef: React.PropTypes.string,
  handleClick: React.PropTypes.func,
  onClick: React.PropTypes.func
};

export default Child;
