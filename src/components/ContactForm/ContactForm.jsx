import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Label, SubmitBtn, FormikForm, Input } from './ContactForm.styled';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contacts/contactsApi';
import { toast } from 'react-toastify';
import { ThreeCircles } from 'react-loader-spinner';

export const ContactForm = () => {
  const [updatePost, { isLoading }] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const initialValues = {
    name: '',
    phone: '',
  };

  const handleSubmit = ({ name, phone }, { resetForm }) => {
    if (contacts.find(e => e.name === name)) {
      return toast(`${name} is already in contacts`);
    }

    updatePost({ name, phone });
    toast(`${name} is added to contacts`);
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
    phone: Yup.string()
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
        <Label htmlFor="phone">Phone</Label>
        <ErrorMessage name="phone" />
        <Input type="tel" name="phone" />
        <SubmitBtn type="submit" disabled={isLoading}>
          {isLoading ? (
            <ThreeCircles
              height="30"
              width="30"
              color="#ffffff"
              ariaLabel="three-circles-rotating"
            />
          ) : (
            'Add contact'
          )}
        </SubmitBtn>
      </FormikForm>
    </Formik>
  );
};
