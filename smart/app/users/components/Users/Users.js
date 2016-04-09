import React, { PropTypes, Component } from 'react';
// import User from './../User/User';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

// import Table from 'material-ui/lib/table/table';
// import TableHeader from 'material-ui/lib/table/table-header';
// import TableBody from 'material-ui/lib/table/table-body';
// import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
// import TableRow from 'material-ui/lib/table/table-row';
// import TableRowColumn from 'material-ui/lib/table/table-row-column';

import style from './Users.scss';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    // width: 1024,
    // height: 400,
    overflowY: 'auto',
    marginBottom: 24,
  },
};


class Users extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    }).isRequired).isRequired,
    focused: PropTypes.object.isRequired,
    focusInstance: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onRead: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
    this.navigable = this.props.list.map((item) => item.id);
  }

  isFocused(id) {
    const { listId, itemId } = this.props.focused;
    return listId === this.props.focusInstance.listId && itemId === id ? style.focused : '';
  }

  render() {
    const { list, isFetching, focusInstance } = this.props;

    return (
      <div data-fm-list
           data-fm-id={focusInstance.listId}
           data-fm-parent-id={focusInstance.parentId}
      >
        {isFetching ? '...loading' : ''}
        <div style={styles.root}>
        <GridList
          cols={5}
          cellHeight={200}
          style={styles.gridList}
        >
            {list.map(tile => (
              <GridTile
                data-fm-parent-id={focusInstance.listId}
                data-fm-id={tile.id}
                key={tile.id}
                className={this.isFocused(tile.id)}
              >
                <img src="http://www.material-ui.com/images/grid-list/camera-813814_640.jpg" />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default Users;
