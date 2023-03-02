import { PikasColor, styled } from '@my-coin/ui';
import { FC, useMemo, useState } from 'react';
import { User } from '../../../selector/user';
import { Avatar } from '@my-coin/ui/dist/components/avatar/index';
import {
  Button,
  ButtonIcon,
} from '@my-coin/ui/dist/components/inputs/button/index';
import Link from 'next/link';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { UserPlusIcon } from '@my-coin/ui/dist/icons/UserPlus';
import { UserMinusIcon } from '@my-coin/ui/dist/icons/UserMinus';
import { getLink } from '@my-coin/router/dist/app';
import { useMediaScreen } from '@pikas-utils/screen';
import { useSession } from 'next-auth/react';
import { useStore } from 'zustand';
import { contactStore } from '../../../store/contact';
import { trpc } from '../../../utils/trpc';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  rowGap: '$16',

  '@md': {
    flexDirection: 'row',
    columnGap: '$24',
  },
});

const Start = styled('div', {
  display: 'flex',
  alignItems: 'center',
  rowGap: '$8',
  flexDirection: 'column',

  '@md': {
    flexDirection: 'row',
    columnGap: '$24',
  },
});

const End = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: '$16',
});

export type UserHeaderProps = {
  image: User['image'];
  name: User['name'];
  id: User['id'];
};

export const UserHeader: FC<UserHeaderProps> = ({ image, name, id }) => {
  const mediaScreen = useMediaScreen();
  const { data, status } = useSession();
  const [contactButtonIsHovered, setContactButtonIsHovered] = useState(false);
  const { isContact, refresh, contacts } = useStore(contactStore);

  const { mutate: addContactMutation, isLoading: addContactIsLoading } =
    trpc.contact.add.useMutation({
      onSuccess: async () => {
        await refresh();
      },
    });
  const { mutate: removeContactMutation, isLoading: removeContactIsLoading } =
    trpc.contact.remove.useMutation({
      onSuccess: async () => {
        await refresh();
      },
    });

  const avatarSize = useMemo(() => {
    switch (mediaScreen) {
      case 'xs':
        return 70;
      case 'sm':
        return 80;
      case 'md':
        return 90;
      case 'lg':
        return 100;
      case 'xl':
        return 110;
      case '2xl':
        return 120;
      default:
        return 120;
    }
  }, [mediaScreen]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isContactMemo = useMemo(() => isContact(id), [isContact, id, contacts]);

  const contactButtonColorName: PikasColor = useMemo(() => {
    if (contactButtonIsHovered) {
      return isContactMemo ? 'danger' : 'success';
    } else {
      return 'primary';
    }
  }, [contactButtonIsHovered, isContactMemo]);

  return (
    <Container>
      <Start>
        <Avatar
          alt={name ?? ''}
          borderRadius="3xl"
          fallback={name?.[0] ?? ''}
          size={avatarSize}
          src={image ?? ''}
        />
        <Link
          href={getLink('user', {
            queries: {
              userId: id,
            },
          })}
        >
          <Title as="h1">{name}</Title>
        </Link>
      </Start>
      {data?.user?.id !== id && status === 'authenticated' && (
        <End>
          <ButtonIcon
            Icon={isContactMemo ? UserMinusIcon : UserPlusIcon}
            size={20}
            colorName={contactButtonColorName}
            onMouseEnter={() => setContactButtonIsHovered(true)}
            onMouseLeave={() => setContactButtonIsHovered(false)}
            loading={addContactIsLoading || removeContactIsLoading}
            onClick={async () => {
              if (isContactMemo) {
                await removeContactMutation({ userId: id });
              } else {
                await addContactMutation({ userId: id });
              }
            }}
            css={{
              button: {
                transition: 'all 0.2s ease-in-out',
              },
            }}
          />
          <Button>Message</Button>
        </End>
      )}
    </Container>
  );
};
