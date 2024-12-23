import styled from '@emotion/styled';
import Input from '../../components/inputs/Input';
import Switch from '../../components/switches/Switch';
import Button from '../../components/buttons/Button';
import Link from '../../components/links/Link';
import { network } from '../../services/network/network';
import { useForm } from 'react-hook-form';

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

type RegistrationForm = {
    name: string;
    email: string;
    password: string;
    familyCode: string;
    isAdmin: boolean;
};

const Registration: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegistrationForm>();

    const form = watch();
    const isAdmin = form.isAdmin;
    const handleRegister = (form: RegistrationForm) => {
        network.auth
            .register({
                name: form.name,
                email: form.email,
                password: form.password,
                isAdmin: form.isAdmin,
                householdId: Number.parseInt(form.familyCode),
            })
            .then((res) => {
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify(res.user));
                window.location.reload();
            });
    };

    return (
        <PageContainer>
            <FormContainer>
                <Header>Регистрация</Header>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <AnotherContainer>
                        <Input
                            isWide
                            label="Имя"
                            type="text"
                            placeholder="Введите ваше имя"
                            {...register('name', {
                                required: 'Обязательно для заполнения',
                                minLength: {
                                    value: 4,
                                    message: 'Минимум 4 символа',
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'Максимум 10 символов',
                                },
                            })}
                            error={errors.name?.message}
                        />
                        <Input
                            isWide
                            label="Эл. почта"
                            type="email"
                            placeholder="Введите вашу эл. почту"
                            {...register('email', {
                                required: 'Обязательно для заполнения',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Почта несоотвествует формату',
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
                        <Switch
                            checked={isAdmin}
                            label="Администратор"
                            {...register('isAdmin')}
                        />
                        <Input
                            isDisabled={isAdmin}
                            isWide
                            label="Код семьи"
                            type="text"
                            placeholder="Введите код семьи"
                            {...register('familyCode')}
                        />
                        <Button
                            width="wide"
                            type="submit"
                            title="Зарегистрироваться"
                        />
                        <Link
                            to="/signin"
                            description="Уже есть аккаунт?"
                            text="Войти"
                        />
                    </AnotherContainer>
                </form>
            </FormContainer>
        </PageContainer>
    );
};

export default Registration;
