import { FC, useState, forwardRef } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import styled from '@emotion/styled';
import {
    Controller,
    Control,
    Path,
    FieldValues,
    PathValue,
} from 'react-hook-form';

const DropdownButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    font-size: 14px;
    font-weight: 400;
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    height: 40px;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-top: 8px;
    min-width: 100%;
    z-index: 10;
`;

const DropdownItem = styled.div`
    padding: 12px;
    font-size: 14px;
    color: #333333;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const DropdownContainer = styled.div<{ width?: 'content' | 'medium' | 'wide' }>`
    position: relative;
    display: inline-block;
    width: ${({ width }) =>
        width === 'content'
            ? 'min-content'
            : width === 'medium'
              ? '280px'
              : '100%'};
`;

const DropdownIcon = styled.span`
    color: ${({ theme }) => theme.colors.divider};
    width: 16px;
    height: 16px;
    font-size: 16px;
`;

interface Item {
    id: number;
    name: string;
}

interface Props {
    items: Item[];
    value: number;
    onChange: ({ id }: { id: number }) => void;
    error?: string;
    placeholder?: string;
    width?: 'content' | 'medium' | 'wide';
}

const DropdownForm: FC<Props> = forwardRef<HTMLDivElement, Props>(
    (
        { items = [], placeholder, width = 'medium', value, onChange, error },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleDropdown = () => setIsOpen(!isOpen);

        return (
            <DropdownContainer width={width} ref={ref}>
                {error && <p>{error}</p>}
                <DropdownButton onClick={toggleDropdown} type="button">
                    {items.find((item) => item.id === value)?.name ||
                        placeholder}
                    <DropdownIcon>
                        <AiOutlineDown />
                    </DropdownIcon>
                </DropdownButton>
                {isOpen && (
                    <DropdownMenu>
                        {placeholder && (
                            <DropdownItem
                                onClick={() => {
                                    setIsOpen(false);
                                    onChange({ id: -1 });
                                }}
                            >
                                {placeholder}
                            </DropdownItem>
                        )}
                        {items.map((item, index) => (
                            <DropdownItem
                                key={index}
                                onClick={() => {
                                    setIsOpen(false);
                                    onChange({ id: item.id });
                                }}
                            >
                                {item.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                )}
            </DropdownContainer>
        );
    }
);

export const RHFDropdown = <TFieldValues extends FieldValues>({
    name,
    control,
    items,
    placeholder,
    width,
    rules,
    defaultValue = -1 as PathValue<TFieldValues, Path<TFieldValues>>,
}: {
    name: Path<TFieldValues>;
    control: Control<TFieldValues>;
    items: Item[];
    placeholder?: string;
    width?: 'content' | 'medium' | 'wide';
    rules?: Partial<Record<string, unknown>>;
    defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={
                defaultValue as PathValue<TFieldValues, Path<TFieldValues>>
            }
            rules={rules}
            render={({ field, fieldState }) => (
                <DropdownForm
                    items={items}
                    placeholder={placeholder}
                    width={width}
                    value={field.value}
                    onChange={({ id }) => field.onChange(id)}
                    error={fieldState.error?.message}
                />
            )}
        />
    );
};

export default DropdownForm;
