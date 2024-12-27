import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../pages/loader';
import Auth from '../layouts/Auth';
import Main from '../layouts/Main';
import Registration from '../pages/registration';
import Authorization from '../pages/authorization';
import Home from '../pages/home/Home';
import Members from '../pages/members/Members';
import Categories from '../pages/categories/Categories';
import Statistics from '../pages/statistics/Statistics';
import { User } from '../models/auth';
import Wait from '../pages/Wait';

interface Props {
    isAuth: boolean;
    isLoading: boolean;
    user: User | null;
}

const Router: FC<Props> = ({ isAuth, isLoading, user }) => {
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
    } else if (!user?.accepted && !user?.isAdmin) {
        return (
            <Routes>
                <Route element={<Main user={user} />}>
                    <Route path="/" element={<Wait />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route element={<Main user={user} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/statistics" element={<Statistics />} />
                    {user?.isAdmin && (
                        <>
                            <Route path="/members" element={<Members />} />
                            <Route
                                path="/categories"
                                element={<Categories />}
                            />
                        </>
                    )}
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        );
    }
};

export default Router;
