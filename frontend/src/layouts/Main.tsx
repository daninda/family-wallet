import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/headers/Header';

const Main: FC = () => {
  return (
    <div>
      <Header username="Danila" />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
