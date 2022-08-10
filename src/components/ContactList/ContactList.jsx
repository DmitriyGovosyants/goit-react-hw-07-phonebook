import { useSelector } from 'react-redux';
import { ContactItem } from 'components';
import { useGetContactsQuery } from 'redux/contacts/contactsApi';

export const ContactList = () => {
  const { data, error, isLoading } = useGetContactsQuery({
    refetchOnMountOrArgChange: true,
  });

  const filter = useSelector(({ rootReducer }) =>
    rootReducer.filter.toLowerCase()
  );

  const filteredContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Missing data!</div>;

  return (
    <ul>
      {filteredContacts.map(({ name, phone, id }) => {
        return <ContactItem key={id} id={id} name={name} phone={phone} />;
      })}
    </ul>
  );
};
