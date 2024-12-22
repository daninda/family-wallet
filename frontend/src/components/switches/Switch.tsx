import { FC } from 'react';
import styled from '@emotion/styled';

const SwitchContainer = styled.label<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const SwitchTrack = styled.div<{ checked: boolean }>`
    width: 32px;
    height: 20px;
    background-color: ${({ checked, theme }) =>
        checked ? theme.colors.primary : theme.colors.divider};
    border-radius: 50vh;
    position: relative;
    transition: background-color 0.1s ease;
`;

const SwitchThumb = styled.div<{ checked: boolean }>`
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: ${({ checked }) => (checked ? '14px' : '2px')};
    transform: translateY(-50%);
    transition: left 0.1s ease;
`;

const HiddenCheckbox = styled.input`
    position: absolute;
    opacity: 0;
    pointer-events: none;
`;

const Label = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primaryText};
`;

interface Props {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
    label?: string;
}

const Switch: FC<Props> = ({ checked, onChange, disabled = false, label }) => {
    const handleToggle = () => {
        if (!disabled) {
            onChange();
        }
    };

    return (
        <SwitchContainer disabled={disabled}>
            <HiddenCheckbox
                type="checkbox"
                checked={checked}
                onChange={handleToggle}
                disabled={disabled}
            />
            <SwitchTrack checked={checked}>
                <SwitchThumb checked={checked} />
            </SwitchTrack>
            {label && <Label>{label}</Label>}
        </SwitchContainer>
    );
};

export default Switch;
