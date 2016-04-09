import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { updateUsers, createUsers } from '../../actions/users';
import UserViewComponent from '../../components/UserView/UserView';


const mapStateToProps = (state) => {
  return {
    form: state.form,
    item: state.users.item,
    isFetching: state.users.isFetching,
    canUpdate: false
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (item) => {
      if (item.id === 0) {
        dispatch(createUsers({entity: item}, (data) => dispatch(push(`/users/${data.id}`))));
      } else {
        dispatch(updateUsers(item.id, {entity: item}, () => dispatch(push(`/users`))));
      }
    }
  };
};

const UserView = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserViewComponent);

export default UserView;
