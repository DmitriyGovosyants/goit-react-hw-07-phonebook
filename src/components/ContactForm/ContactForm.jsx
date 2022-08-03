import { useDispatch, useSelector } from 'react-redux';
import * as contactsActions from 'redux/contacts/contactsActions';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Label, SubmitBtn, FormikForm, Input } from './contactForm.styled';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(({ contacts }) => contacts.items);

  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = ({ name, number }, { resetForm }) => {
    if (items.find(el => el.name === name)) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(contactsActions.addContact(name, number));

    resetForm();
  };

  const nameRegExp =
    "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const schema = Yup.object({
    name: Yup.string()
      .matches(
        nameRegExp,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .min(2)
      .max(30)
      .required('Required'),
    number: Yup.string()
      .matches(
        phoneRegExp,
        'Phone number must be digits, contain 6 digits, can contain spaces, dashes, parentheses and can start with +'
      )
      .required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <Label htmlFor="name">Name</Label>
        <ErrorMessage name="name" />
        <Input type="text" name="name" />
        <Label htmlFor="number">Number</Label>
        <ErrorMessage name="number" />
        <Input type="tel" name="number" />
        <SubmitBtn type="submit">Add contact</SubmitBtn>
      </FormikForm>
    </Formik>
  );
};
