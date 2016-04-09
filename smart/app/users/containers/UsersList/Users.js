import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/lib/raised-button';

import UsersList from './UsersList';
import UsersGrid from './UsersGrid';

import Dispatcher from 'services/keyMap/helpers/Dispatcher';
import { focusedChange } from 'services/focusMap/actions';

const remoteDispatcher = Dispatcher.getInstance();

const focusKey = 'someContainer';

class UsersCont extends Component {

  static propTypes = {
    focusInstance: PropTypes.object.isRequired,
    fmParentId: PropTypes.string.isRequired,
    focused: PropTypes.object.isRequired
  }

  render() {
    const { focusInstance, focused } = this.props;

    return (
      <div data-fm-list
           data-fm-id={focusInstance.listId}
      >
        <RaisedButton secondary
                      disabled={focused.listId !== focusInstance.listId || focused.itemId !== 'create-button'}
                      label="Create"
                      containerElement={<Link to="/users/create"/>}
                      data-fm-parent-id={focusInstance.listId}
                      data-fm-id="create-button"
        />
        <UsersList />
        <UsersGrid />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    focused: state.focusMap.focused,
    focusInstance: state.focusMap.instances[focusKey]
  };
};

const mapDispatchToProps = (dispatch) => {
  remoteDispatcher.on('UP', () => dispatch(focusedChange('up', focusKey)));
  remoteDispatcher.on('DOWN', () => dispatch(focusedChange('down', focusKey)));
  remoteDispatcher.on('LEFT', () => dispatch(focusedChange('left', focusKey)));
  remoteDispatcher.on('RIGHT', () => dispatch(focusedChange('right', focusKey)));

  return {};
};

const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersCont);

export default Users;
