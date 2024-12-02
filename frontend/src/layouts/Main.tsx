import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/headers/Header';

const Main: FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
