import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../../header/components/Header/Header';

function mapStateToProps(state) {
  return {
    lang: state.lang.lang
  };
}

class App extends React.Component {

  getChildContext() {
    return {
      currentLanguage: this.props.lang
    };
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }

}

App.propTypes = {
  children: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};

App.childContextTypes = {
  currentLanguage: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(App);
