import { User } from '@prisma/client';
import { Link, useParams } from 'react-router-dom';

interface Props {
  name: string | null;
  users: User[];
  conversationId: string;
}

export default function GroupChat(props: Props) {
  const { conversationId, users, name, ...rest } = props;
  const { conversationId: paramId } = useParams<{
    conversationId: string;
  }>();
  const activeStyle = 'bg-darkest rounded-md';

  return (
    <Link
      {...rest}
      to={conversationId}
      className={`${
        paramId === conversationId ? activeStyle : ''
      } p-4 hover:bg-darkest hover:rounded-md transition-all duration-300 ease-in-out cursor-pointer`}
    >
      <p className={'text-primary'}>{name || 'Group Chat'}</p>
    </Link>
  );
}
