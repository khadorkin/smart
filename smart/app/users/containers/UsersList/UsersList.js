import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { chooseUser } from '../../actions/user';
import { deleteUsers } from '../../actions/users';
import Users from '../../components/Users/Users';
// import FocusMap from 'services/focusMap/helpers/FocusMap';
import Dispatcher from 'services/keyMap/helpers/Dispatcher';
import { focusedChange } from 'services/focusMap/actions';

const remoteDispatcher = Dispatcher.getInstance();

const focusKey = 'someList';

const mapStateToProps = (state) => {
  return {
    focused: state.focusMap.focused,
    focusInstance: state.focusMap.instances[focusKey],
    list: state.users.items,
    isFetching: state.users.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  remoteDispatcher.on('UP', () => dispatch(focusedChange('up', focusKey)));
  remoteDispatcher.on('DOWN', () => dispatch(focusedChange('down', focusKey)));
  remoteDispatcher.on('LEFT', () => dispatch(focusedChange('left', focusKey)));
  remoteDispatcher.on('RIGHT', () => dispatch(focusedChange('right', focusKey)));

  return {
    onEdit: (id) => {
      dispatch(chooseUser(id));
      dispatch(push(`/users/${id}`));
    },
    onDelete: (id) => dispatch(deleteUsers(id))
  };
};

const UsersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);

export default UsersList;
