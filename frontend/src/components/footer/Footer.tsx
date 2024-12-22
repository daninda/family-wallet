import { FC } from 'react';
import { Wrapper } from '../wrappers/Wrapper';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const BorderWrapper = styled.div`
    outline: 1px solid ${({ theme }) => theme.colors.divider};
`;

const FooterWrapper = styled.header`
    display: flex;
    height: 128px;
    align-items: start;
    padding-top: 16px;
    justify-content: space-between;
`;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 600;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    align-items: start;
    justify-content: right;
`;

const Button = styled(Link)`
    text-decoration: underline;
    font-size: 12px;
    font-weight: 500;
`;

const Footer: FC = () => {
    return (
        <BorderWrapper>
            <Wrapper>
                <FooterWrapper>
                    <Title>Семейная копилка</Title>
                    <Buttons>
                        <Button to="/">Справка</Button>
                        <Button to="/">О разработчиках</Button>
                    </Buttons>
                </FooterWrapper>
            </Wrapper>
        </BorderWrapper>
    );
};

export default Footer;
