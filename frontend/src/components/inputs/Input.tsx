import styled from '@emotion/styled';
import { FC } from 'react';

const Wrapper = styled.div<{ isWide: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: ${({ isWide }) => (isWide ? '100%' : 'min-content')};
    min-width: 20px;
`;

const Label = styled.label`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.primaryText};
`;

const Error = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.error};
`;

const StyledInput = styled.input<{
    hasError?: boolean;
    isDisabled?: boolean;
    height?: 'small' | 'medium';
}>`
    background-color: ${({ isDisabled, theme }) =>
        isDisabled ? theme.colors.secondaryGrey : theme.colors.background};
    height: ${({ height }) => (height === 'small' ? '32px' : '40px')};
    padding: 0 12px;
    border: 1px solid
        ${({ hasError, theme }) =>
            hasError ? theme.colors.error : theme.colors.divider};
    border-radius: 4px;
    font-size: 14px;
    outline: none;

    ::placeholder {
        color: ${({ theme }) => theme.colors.secondary};
    }
`;

interface Props {
    type?: string;
    label?: string;
    error?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isWide?: boolean;
    isDisabled?: boolean;
    height?: 'small' | 'medium';
}

const Input: FC<Props> = ({
    type,
    label,
    error,
    placeholder,
    value,
    onChange,
    isWide = false,
    isDisabled = false,
    height = 'medium',
}) => {
    return (
        <Wrapper isWide={isWide}>
            {label && <Label>{label}</Label>}
            <StyledInput
                disabled={isDisabled}
                isDisabled={isDisabled}
                type={type}
                hasError={!!error}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                height={height}
                min={1}
                max={100000}
            />
            {error && <Error>{error}</Error>}
        </Wrapper>
    );
};

export default Input;
