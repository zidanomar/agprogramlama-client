import { Link, useParams } from 'react-router-dom';

interface Props {
  conversationId: string;
  isOnline: boolean;
  name?: string;
}

export default function PersonalChat(props: Props) {
  const { conversationId, isOnline, name, ...rest } = props;
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
      <h3 className={isOnline ? 'text-primary' : 'text-gray-500'}>
        {name || 'user'}
      </h3>
    </Link>
  );
}
