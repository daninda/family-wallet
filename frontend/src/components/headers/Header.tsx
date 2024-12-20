import styled from '@emotion/styled';
import { FC } from 'react';
import { Wrapper } from '../wrappers/Wrapper';
import Button from '../buttons/Button';
import { AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const HeaderWrapper = styled.header`
  display: flex;
  height: 64px;
  justify-content: space-between;
  align-items: center;
`;

const BorderWrapper = styled.div`
  outline: 1px solid ${({ theme }) => theme.colors.divider};
  height: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  column-gap: 32px;
`;

const User = styled.p`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const AdminButtons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

interface Props {
  isAdmin?: boolean;
  username?: string;
}

const Header: FC<Props> = ({ isAdmin = false, username }) => {
  const navigate = useNavigate();

  return (
    <BorderWrapper>
      <Wrapper>
        <HeaderWrapper>
          <Title>Семейная копилка</Title>
          <Info>
            {isAdmin && (
              <AdminButtons>
                <Button
                  height="small"
                  title="Категории"
                  color="yellow"
                  onClick={() => navigate('/categories')}
                />
                <Button
                  height="small"
                  title="Участники"
                  color="yellow"
                  onClick={() => navigate('/members')}
                />
              </AdminButtons>
            )}
            <User>
              <AiOutlineUser size={24} />
              {username}
            </User>
            <Button height="small" title="Выйти" />
          </Info>
        </HeaderWrapper>
      </Wrapper>
    </BorderWrapper>
  );
};

export default Header;
