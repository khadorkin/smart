import React from 'react';

class RightArrow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = require('./RightArrow.scss');
    return (
      <div {...this.props} className={styles.btn}>
        <span className={styles.text}>Next</span>
      </div>
    );
  }
}

export default RightArrow;
