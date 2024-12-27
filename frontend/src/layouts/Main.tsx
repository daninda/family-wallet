import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/headers/Header';
import Footer from '../components/footer/Footer';
import styled from '@emotion/styled';

const MainWrapper = styled.main`
    min-height: calc(100vh - 128px - 64px);
`;

interface Props {
    isAdmin: boolean;
    username: string;
}

const Main: FC<Props> = ({ isAdmin, username }) => {
    return (
        <>
            <Header username={username} isAdmin={isAdmin} />
            <MainWrapper>
                <Outlet />
            </MainWrapper>
            <Footer />
        </>
    );
};

export default Main;
