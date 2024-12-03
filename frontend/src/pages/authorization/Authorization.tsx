import { FC, useState } from 'react';
import Input from '../../components/inputs/Input';
import Button from '../../components/buttons/Button';
import Switch from '../../components/switches/Switch';
import Link from '../../components/links/Link';

const Authorization: FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Input label="Email" placeholder="Введите эл. почту" />

      <Input label="Password" placeholder="Введите пароль" />

      <Button title="Войти в аккаунт" />

      <Switch
        label="Администратор"
        checked={checked}
        onChange={(checked) => {
          setChecked(checked);
        }}
      />

      <Link
        to="/signup"
        text="Зарегистрироваться"
        description="Еще нет аккаунта?"
      />
    </div>
  );
};

export default Authorization;
