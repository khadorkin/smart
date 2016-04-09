## 1. 

Currently the localization files are bundled into the bundle.js file instead of being taken from the server. As the package is going to be installed on the device,
and the size of the localization files will be small, this seems to be reasonable.

All the localization files (including actions, reducers, data files, etc) are in /locales folder.

Currently the language is defined in the initialState of /locales/reducers/lang (defaulting to 'en').
 Later on it may be taken from and saved to localStorage, settings file, cookies, etc.

Language is taken by the App.js file from initialState:
```function mapStateToProps(state) {
     return {
       lang: state.lang.lang
     };
   }
```
 
 and written to the context there:
```getChildContext() {
        return {
          currentLanguage: this.props.lang
        };
      }
```
 
From the context the currentLanguage is passed to the locales/translate function,
which makes a wrapper around a React.Component to be translated and passes the filtered translations as 'locales' property, together with the
...this.props and ...this.state:

```export default function translate(keys) {
  return Component => {
    const combinedObject = {};
    class TranslationComponent extends React.Component {
      render() {
        keys.forEach(key => {combinedObject[key] = languages[this.context.currentLanguage][key];});
        return <Component {...this.props} {...this.state} locales={combinedObject} />;
      }
    }

    TranslationComponent.contextTypes = {
      currentLanguage: React.PropTypes.string
    };

    return TranslationComponent;
  };
}
```


## 2. Usage

To use it in a component do the following:

```
import translate from '../../../../locales/translate';
```

in the render function do
```
title={ this.props.locales.app.title }
```
where locales is the /locales/en or /locales/ru etc. file returning object. and 'app.title' are nested layers of the object

and finally do
```
export default translate(['app'])(Component);
```


To ensure dispatch, see below the working example with REDUX connect:
```
import { default as React, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';

import translate from '../../../../locales/translate';

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
```

