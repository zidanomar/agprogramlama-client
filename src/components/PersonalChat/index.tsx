import { Link } from 'react-router-dom';

interface Props {
  conversationId: string;
  isOnline: boolean;
  name?: string;
}

export default function PersonalChat(props: Props) {
  const { conversationId, isOnline, name, ...rest } = props;
  return (
    <Link {...rest} to={conversationId}>
      <h3 className={isOnline ? 'text-primary' : 'text-gray-500'}>
        {name || 'user'}
      </h3>
    </Link>
  );
}
