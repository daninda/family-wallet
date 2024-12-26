import { Button, MenuItem, Paper, Select, TextField } from '@mui/material';
import { Column, Txt } from '../../components/Common';
import { Category } from '../../models/categories';
import { useForm } from 'react-hook-form';

type SubcategoryForm = {
    name: string;
    id: number;
};

type Props = {
    categories: Category[];
    category: number;
    onSubmit: (form: SubcategoryForm) => void;
};

export function SubcategoryModal(props: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubcategoryForm>();

    return (
        <Paper onClick={(e) => e.stopPropagation()} sx={{ padding: 5 }}>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <Column>
                    <Txt variant="h4">Добавить подкатегорию</Txt>
                    <TextField
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
                        label="Название подкатегории"
                    ></TextField>
                    {errors.name && (
                        <Txt color="error">{errors.name.message}</Txt>
                    )}
                    <Select
                        defaultValue={props.category}
                        disabled
                        {...register('id', {
                            valueAsNumber: true,
                            required: 'Обязательное поле',
                        })}
                    >
                        {props.categories.map((category) => (
                            <MenuItem value={category.id} key={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.id && <Txt color="error">{errors.id.message}</Txt>}
                    <Button type="submit" variant="contained">
                        Добавить
                    </Button>
                </Column>
            </form>
        </Paper>
    );
}
