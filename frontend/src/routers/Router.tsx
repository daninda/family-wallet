import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../pages/loader';
import Auth from '../layouts/Auth';
import Main from '../layouts/Main';
import Registration from '../pages/registration';
import Authorization from '../pages/authorization';
import Home from '../pages/home/Home';

const Router: FC = () => {
  const isAuth = true;
  const isLoading = false;

  if (isLoading) {
    return <Loader />;
  } else if (!isAuth) {
    return (
      <Routes>
        <Route element={<Auth />}>
          <Route path="/signup" element={<Registration />} />
          <Route path="/signin" element={<Authorization />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
};

export default Router;
