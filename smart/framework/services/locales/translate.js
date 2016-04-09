import { default as React } from 'react';
import index from './index';

const languages = index;

export default function translate(keys) {
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
