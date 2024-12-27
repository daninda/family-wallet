import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/headers/Header';
import Footer from '../components/footer/Footer';
import styled from '@emotion/styled';
import { User } from '../models/auth';

const MainWrapper = styled.main`
    min-height: calc(100vh - 128px - 64px);
`;

interface Props {
    user: User | null;
}

const Main: FC<Props> = ({ user }) => {
    return (
        <>
            <Header username={user?.name} isAdmin={user?.isAdmin} />
            <MainWrapper>
                <Outlet />
            </MainWrapper>
            <Footer />
        </>
    );
};

export default Main;
