import {reduxForm} from 'redux-form';
import UserForm from '../../components/UserForm/UserForm';

const fields = ['firstName', 'lastName', 'age'];

const validate = (values, props) => {
  const _default = props.initialValues;
  const errors = {};

  if (!values.firstName || values.firstName.length === 0) {
    errors.firstName = 'Required';
  }

  if (!values.lastName || values.lastName.length === 0) {
    errors.lastName = 'Required';
  }

  if (_default.firstName === values.firstName && _default.lastName === values.lastName && _default.age === values.age) {
    errors.age = 'No changes detected';
  }

  return errors;
};

export default reduxForm({
  form: 'userForm',
  fields,
  validate
})(UserForm);
