import { FC } from 'react';
import styled from '@emotion/styled';

const PageWrapper = styled.div`
    height: calc(100vh - 196px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 32px;
    font-weight: 600;
    text-align: center;
    color: ${({ theme }) => theme.colors.primaryText};
`;

const Wait: FC = () => {
    return (
        <PageWrapper>
            Ваша заявка на вступление в данный момент находится в обработке
        </PageWrapper>
    );
};

export default Wait;
