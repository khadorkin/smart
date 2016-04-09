import React, {Component, PropTypes} from 'react';

class UserForm extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  render() {
    const {
      fields: {firstName, lastName, age},
      type,
      invalid,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <div>
            <input type="text" placeholder="First Name" {...firstName}/>
          </div>
          {firstName.error && <div>{firstName.error}</div>}
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <input type="text" placeholder="Last Name" {...lastName}/>
          </div>
          {lastName.error && <div>{lastName.error}</div>}
        </div>
        <div>
          <label>Age</label>
          <div>
            <input type="number" placeholder="age" {...age}/>
          </div>
          {age.error && <div>{age.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting || invalid}>
            {submitting ? <i/> : <i/>} {type === 'create' ? 'Create' : 'Edit'}
          </button>
        </div>
      </form>
    );
  }
}

export default UserForm;
