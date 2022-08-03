import { useSelector } from 'react-redux';
import { ContactItem } from 'components';

export const ContactList = () => {
  const items = useSelector(({ contacts }) => contacts.items);
  const filter = useSelector(({ contacts }) => contacts.filter.toLowerCase());

  const filterContacts = items.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <ul>
      {filterContacts.map(({ name, number, id }) => {
        return <ContactItem key={id} id={id} name={name} number={number} />;
      })}
    </ul>
  );
};
