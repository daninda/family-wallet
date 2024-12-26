import { useForm } from 'react-hook-form';
import { Paper, TextField } from '@mui/material';
import { Column, Txt } from '../../components/Common';
import Button from '../../components/buttons/Button';

type CategoryForm = {
    name: string;
};

type Props = {
    onSubmit: (form: CategoryForm) => void;
};

export function CategoryModal(props: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryForm>({
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = (form: CategoryForm) => {
        props.onSubmit(form);
    };

    return (
        <Paper sx={{ padding: 5 }} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Column>
                    <Txt variant="h4">Добавить категорию</Txt>
                    <TextField
                        placeholder="Введите название категории"
                        {...register('name', {
                            required: 'Обязательное поле',
                            minLength: {
                                value: 1,
                                message: 'Минимум 1 символ',
                            },
                            maxLength: {
                                value: 64,
                                message: 'Максимум 64 символа',
                            },
                        })}
                    ></TextField>
                    {errors.name && (
                        <Txt color="error">{errors.name.message}</Txt>
                    )}
                    <Button type="submit" title="Добавить"></Button>
                </Column>
            </form>
        </Paper>
    );
}
