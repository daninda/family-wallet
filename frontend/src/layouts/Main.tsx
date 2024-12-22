import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/headers/Header';
import Footer from '../components/footer/Footer';
import styled from '@emotion/styled';

const MainWrapper = styled.main`
    min-height: calc(100vh - 128px - 64px);
`;

const Main: FC = () => {
    return (
        <>
            <Header username="Danila" />
            <MainWrapper>
                <Outlet />
            </MainWrapper>
            <Footer />
        </>
    );
};

export default Main;
