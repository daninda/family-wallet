import { FC } from 'react';
import Input from '../../components/inputs/Input';

const Authorization: FC = () => {
  return (
    <div>
      <Input label="Email" />

      <Input label="Password" />
    </div>
  );
};

export default Authorization;
