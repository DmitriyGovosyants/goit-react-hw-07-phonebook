import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  ContactFormStyled,
  ContactInput,
  ContactLabel,
  SubmitBtn,
} from './ContactForm.styled.js';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contacts/contactsApi';
import { toast } from 'react-toastify';
import { ThreeCircles } from 'react-loader-spinner';

const nameRegExp = "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
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

export const ContactForm = () => {
  const [updatePost, { isLoading }] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const onSubmit = ({ name, phone }) => {
    if (contacts.find(e => e.name === name)) {
      return toast.warn(`${name} is already in contacts`);
    }

    updatePost({ name, phone });
    toast.info(`${name} is added to contacts`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input {...register('name')} />
      <p>{errors.name?.message}</p>

      <label htmlFor="phone">Phone</label>
      <input {...register('phone')} />
      <p>{errors.phone?.message}</p>

      <button type="submit" disabled={isLoading}>
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
      </button>
    </form>
  );
};
