import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { Container } from './App.styled';
import { Title } from './Title';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
export const App = () => {
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidMount() {
  // const contacts = JSON.parse(localStorage.getItem('contacts'));

  // if (contacts !== null) {
  //   return this.setState({ contacts });
  // }
  // }

  // componentDidUpdate(_, prevState) {
  // if (this.state.contacts !== prevState.contacts) {
  //   localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  // }
  // }

  const addContact = ({ name, number }) => {
    const phoneNames = contacts.map(contact => contact.name);
    if (phoneNames.includes(name)) {
      return alert(`${name} is already in contacts.`);
    }
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevState => [contact, ...prevState]);
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    const normalazedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalazedFilter)
    );
  };

  const deleteContact = selectedId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== selectedId);
    });
  };

  const filteredContacts = getFilteredContacts();
  return (
    <Container>
      <Title text="Phonebook" />
      <ContactForm onSubmit={addContact} />
      <Title text="Contacts" />
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </Container>
  );
};
