import React from 'react';

class LeftArrow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = require('./LeftArrow.scss');
    return (
        <div {...this.props} className={styles.btn}>
          <span className={styles.text}>Prev</span>
        </div>
    );
  }
}

export default LeftArrow;
