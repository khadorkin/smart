import { Component, PropTypes, Children } from 'react';
import { connect } from 'react-redux';
import storeShape from 'react-redux/lib/utils/storeShape';
import config from '../../../../config/LG.json';
import Dispatcher from '../helpers/Dispatcher';
// import actions from '../actions';

const remoteDispatcher = Dispatcher.getInstance();

remoteDispatcher.setKeyMap(config.input);

class KeyMap extends Component {

  static propTypes = {
    store: storeShape.isRequired,
    focused: PropTypes.object,
    children: PropTypes.element.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const { store } = this.props;

    window.addEventListener('keydown', (event) => {
      const type = remoteDispatcher.getKeyMap()[event.keyCode];

      if (type) {
        // store.dispatch(actions[type]());
        remoteDispatcher.trigger(type);
      }
    }, false);
  }

  render() {
    const { children } = this.props;

    return Children.only(children);
  }
}

// const mapStateToProps = (state) => {
//   return {
//     focused: state.focusMap
//   };
// };

export default connect()(KeyMap);
