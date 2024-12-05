import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Auth: FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Auth;