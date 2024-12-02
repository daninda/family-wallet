import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Auth: FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Auth;
