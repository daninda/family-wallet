import { useState } from 'react';
import styled from '@emotion/styled';
import Input from '../../components/inputs/Input';
import Switch from '../../components/switches/Switch';
import Button from '../../components/buttons/Button';
import Link from '../../components/links/Link';
import Auth from '../../services/auth';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [familyCode, setFamilyCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegister = () => {
    Auth.register({
      name,
      email,
      password,
      isAdmin,
      householdId: Number.parseInt(familyCode),
    }).then((res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      window.location.reload();
    });
  };

  return (
    <PageContainer>
      <FormContainer>
        <Header>Регистрация</Header>
        <AnotherContainer>
          <Input
            isWide
            label="Имя"
            type="text"
            placeholder="Введите ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Switch
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
            label="Администратор"
          />
          <Input
            isDisabled={isAdmin}
            isWide
            label="Код семьи"
            type="text"
            placeholder="Введите код семьи"
            value={familyCode}
            onChange={(e) => setFamilyCode(e.target.value)}
          />
          <Button
            width="wide"
            onClick={() => {
              handleRegister();
            }}
            title="Зарегистрироваться"
          />
          <Link to="/signin" description="Уже есть аккаунт?" text="Войти" />
        </AnotherContainer>
      </FormContainer>
    </PageContainer>
  );
};

export default Registration;
