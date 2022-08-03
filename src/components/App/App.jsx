import { Container, ContactForm, Filter, ContactList } from 'components';
import { Section, MainTitle, Title } from './App.styled';

export const App = () => {
  return (
    <Section>
      <Container>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm />
        <Title>Contacts</Title>
        <Filter />
        <ContactList />
      </Container>
    </Section>
  );
};
