import styled from '@emotion/styled';
import Input from '../../components/inputs/Input';
import Button from '../../components/buttons/Button';
import Link from '../../components/links/Link';
import { network } from '../../services/network/network';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { showErrorToast } from '../../utils/utils';

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

interface LoginForm {
    email: string;
    password: string;
}

const Authorization: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const handleLogin = (form: LoginForm) => {
        network.auth
            .login({
                email: form.email,
                password: form.password,
            })
            .then((res) => {
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify(res.user));
                window.location.reload();
            })
            .catch(() => {
                showErrorToast('Неправильный логин или пароль');
            });
    };

    return (
        <PageContainer>
            <FormContainer>
                <Header>Вход в аккаунт</Header>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <AnotherContainer>
                        <Input
                            isWide
                            label="Эл. почта"
                            type="email"
                            placeholder="Введите вашу эл. почту"
                            {...register('email', {
                                required: 'Обязательно для заполнения',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Почта не соотвествует формату',
                                },
                            })}
                            error={errors.email?.message}
                        />
                        <Input
                            isWide
                            label="Пароль"
                            type="password"
                            placeholder="Введите ваш пароль"
                            {...register('password', {
                                required: 'Обязательно для заполнения',
                                minLength: {
                                    value: 8,
                                    message: 'Минимум 8 символа',
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'Максимум 16 символов',
                                },
                            })}
                            error={errors.password?.message}
                        />
                        <Button width="wide" type="submit" title="Войти" />
                        <Link
                            to="/signup"
                            description="Еще нет аккаунта?"
                            text="Зарегистрироваться"
                        />
                    </AnotherContainer>
                </form>
            </FormContainer>
            <ToastContainer />
        </PageContainer>
    );
};

export default Authorization;
