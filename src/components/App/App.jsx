import { Container, ContactForm, Filter, ContactList } from 'components';
import { Section, MainTitle, Title } from './App.styled';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const App = () => {
  return (
    <Section>
      <Container>
        {/* <Stack spacing={2} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack> */}
        <MainTitle>Phonebook</MainTitle>
        <ContactForm />
        <Title>Contacts</Title>
        <Filter />
        <ContactList />
      </Container>
    </Section>
  );
};
