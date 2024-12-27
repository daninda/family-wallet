import { FC, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import styled from '@emotion/styled';

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
    height: 40px;
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

const Error = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.error};
`;

interface Item {
    id: number;
    name: string;
}

interface Props {
    items: Item[];
    onSelectId: (id: number) => void;
    selectedId: number;
    placeholder?: string;
    width?: 'content' | 'medium' | 'wide';
    error?: string;
}

const Dropdown: FC<Props> = ({
    items = [],
    onSelectId,
    selectedId = -1,
    placeholder,
    width = 'medium',
    error,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <DropdownContainer width={width}>
            <DropdownButton onClick={toggleDropdown} type="button">
                {items.find((item) => item.id === selectedId)?.name ||
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
                                onSelectId(-1);
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
                                onSelectId(item.id);
                            }}
                        >
                            {item.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
            {error && <Error>{error}</Error>}
        </DropdownContainer>
    );
};

export default Dropdown;
