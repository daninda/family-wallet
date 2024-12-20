import { useState } from 'react';
import styled from '@emotion/styled';
import Input from '../../components/inputs/Input';
import Button from '../../components/buttons/Button';
import Link from '../../components/links/Link';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightPrimary};
  padding: 80px;
  border-radius: 32px;
  width: 1060px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AnotherContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 320px;
`;

const Header = styled.h2`
  margin-top: 20px;
  font-size: 48px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
`;

const Authorization: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <PageContainer>
      <FormContainer>
        <Header>Вход в аккаунт</Header>
        <AnotherContainer>
          <Input
            isWide
            label="Эл. почта"
            type="email"
            placeholder="Введите вашу эл. почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isWide
            label="Пароль"
            type="password"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button width="wide" onClick={() => {}} title="Войти" />
          <Link
            to="/signup"
            description="Еще нет аккаунта?"
            text="Зарегистрироваться"
          />
        </AnotherContainer>
      </FormContainer>
    </PageContainer>
  );
};

export default Authorization;
