import { default as React, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';

import translate from 'services/locales/translate';

function mapStateToProps(state) {
  return {
    locales: state.locales
  };
}

class Header extends React.Component {

  render() {
    return (
      <div>
        <AppBar
          title={ this.props.locales.app.title }
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          >
          <RaisedButton secondary
                        label="Users"
                        containerElement={<Link to="/users"/>} />
          <RaisedButton secondary
                        label={ this.props.locales.app.nav.home }
                        containerElement={<Link to="/home"/>} />
          <RaisedButton secondary
                        label="Test Grid"
                        containerElement={<Link to="/parent"/>} />
          <RaisedButton secondary
                        label="Test Carousel"
                        containerElement={<Link to="/carousel"/>} />
          <RaisedButton secondary
                        label={ this.props.locales.app.lang.ru }
                        onClick={() => { this.props.dispatch({type: 'RU'}); } } />
          <RaisedButton secondary
                        label={ this.props.locales.app.lang.en }
                        onClick={() => { this.props.dispatch({type: 'EN'}); } } />
        </AppBar>
      </div>
    );
  }

}

Header.propTypes = {
  locales: PropTypes.object,
  dispatch: PropTypes.func
};

const translatedHeader = translate(['app'])(Header);
export default connect(mapStateToProps)(translatedHeader);
