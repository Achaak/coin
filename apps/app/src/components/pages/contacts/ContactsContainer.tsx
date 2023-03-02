import { styled } from '@my-coin/ui';
import { Button } from '@my-coin/ui/dist/components/inputs/button/index';
import { Textfield } from '@my-coin/ui/dist/components/inputs/textfield/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { SearchIcon } from '@my-coin/ui/dist/icons/Search';
import { FC, useMemo, useState } from 'react';
import { useStore } from 'zustand';
import { contactStore } from '../../../store/contact';
import { User } from '../../global/User';

const Contacts = styled('ul', {
  display: 'flex',
  columnGap: '$24',
  overflowX: 'auto',
  width: '100%',
  paddingBottom: '$8',
  position: 'relative',
});

export const ContactsContainer: FC = () => {
  const [search, setSearch] = useState('');
  const { contacts } = useStore(contactStore);

  const contactsFormatted = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.userContact.name?.toLowerCase().includes(search.toLowerCase())
      ),
    [contacts, search]
  );

  return (
    <>
      <Title as="h2">Contacts</Title>
      <Textfield
        placeholder="Search contacts"
        backgroundColorName="gray"
        width={300}
        maxWidth="100%"
        RightIcon={SearchIcon}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Contacts>
        {contactsFormatted.map((contact) => (
          <User
            id={contact.id}
            name={contact.userContact.name}
            image={contact.userContact.image}
            key={contact.id}
            as="li"
            bottomChildren={
              <Button padding="sm" fontSize="em-small">
                Message
              </Button>
            }
          />
        ))}
      </Contacts>
    </>
  );
};
