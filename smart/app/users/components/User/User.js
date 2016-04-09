import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

class User extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  render() {
    const { item, onDelete, className } = this.props;

    return (
    <TableRow className={className}>
  		<TableRowColumn>{item.id}</TableRowColumn>
  		<TableRowColumn>{item.firstName}</TableRowColumn>
  		<TableRowColumn>{item.lastName}</TableRowColumn>
      <TableRowColumn>{item.age}</TableRowColumn>
  		<TableRowColumn><Link to={`/users/${item.id}`}>edit</Link></TableRowColumn>
  		<TableRowColumn><span onClick={onDelete}>delete</span></TableRowColumn>
  	</TableRow>
    );
  }
}

export default User;
