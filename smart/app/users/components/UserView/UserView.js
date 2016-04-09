import React, { PropTypes, Component } from 'react';
import Userform from '../../containers/UserForm/UserForm';
// import style from './UserView.scss';


class UserView extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    item: PropTypes.objectOf(PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired
    }).isRequired).isRequired,
    isFetching: PropTypes.bool.isRequired,
    canUpdate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  onSubmit(data) {
    this.props.onSubmit(Object.assign({}, this.props.item, data));
  }

  _template() {
    const { item } = this.props;

    return (
      <div>
        <Userform initialValues={item} type={ item.id === 0 ? 'create' : 'edit' } onSubmit={(data) => this.onSubmit(data)}/>
      </div>
    );
  }

  render() {
    return !this.props.item ? (<div>No item choose</div>) : this._template();
  }
}

export default UserView;
