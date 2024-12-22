import styled from '@emotion/styled';
import { FC } from 'react';
import { Link as ReactLink } from 'react-router-dom';

const Wrapper = styled.div`
    margin-top: 16px;
    text-align: center;
`;

const Description = styled.span`
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 14px;
`;

const StyledLink = styled(ReactLink)`
    color: ${({ theme }) => theme.colors.primaryText};
    text-decoration: none;
    font-weight: bold;
    margin-left: 4px;

    &:hover {
        text-decoration: underline;
    }
`;

interface Props {
    to: string;
    text: string;
    description?: string;
}

const Link: FC<Props> = ({ to, text, description }) => {
    return (
        <Wrapper>
            <Description>
                {description}
                <StyledLink to={to}>{text}</StyledLink>
            </Description>
        </Wrapper>
    );
};

export default Link;
