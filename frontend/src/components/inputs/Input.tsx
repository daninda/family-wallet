import styled from '@emotion/styled';
import { FC } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Error = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 12px;
  border: 1px solid
    ${({ hasError, theme }) =>
      hasError ? theme.colors.error : theme.colors.darkPrimary};
  border-radius: 4px;
  font-size: 14px;
  outline: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.tertiaryText};
  }
`;

interface Props {
  label: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({ label, error, placeholder, value, onChange }) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledInput
        hasError={!!error}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

export default Input;
