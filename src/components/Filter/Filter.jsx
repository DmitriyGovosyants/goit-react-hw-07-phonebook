import * as contactsActions from 'redux/contacts/contactsActions';
import { useDispatch, useSelector } from 'react-redux';
import { FilterContainer, Label, Input } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(({ contacts }) => contacts.filter);

  return (
    <FilterContainer>
      <Label htmlFor="filter">Find contacts by name</Label>
      <Input
        type="text"
        id="filter"
        name="filter"
        value={filter}
        onChange={e =>
          dispatch(contactsActions.filterContacts(e.currentTarget.value))
        }
      />
    </FilterContainer>
  );
};
