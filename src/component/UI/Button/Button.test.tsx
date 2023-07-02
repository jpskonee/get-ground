import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomButton, { CustomButtonProps } from './Button';

describe('CustomButton', () => {
    let onClickMock: jest.Mock = jest.fn();
    let defaultProps: CustomButtonProps = {
        text: 'Button',
        onClick: onClickMock,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the button with the correct text', () => {
        render(<CustomButton {...defaultProps} />);
        const button = screen.getByText(defaultProps.text);
        expect(button).toBeInTheDocument();
    });

    it('triggers onClick handler when clicked', () => {
        render(<CustomButton {...defaultProps} />);
        const button = screen.getByText(defaultProps.text);
        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('applies the specified variant', () => {
        render(<CustomButton {...defaultProps} variant="outlined" />);
        const button = screen.getByText(defaultProps.text);
        expect(button).toHaveClass('MuiButton-outlined');
    });

    it('applies additional custom styles', () => {
        const style = { backgroundColor: 'blue', color: 'white' };
        render(<CustomButton {...defaultProps} style={style} />);
        const button = screen.getByText(defaultProps.text);
        expect(button).toHaveStyle(`background-color: ${style.backgroundColor}`);
        expect(button).toHaveStyle(`color: ${style.color}`);
    });

    it('passes additional props to the button', () => {
        const dataTestId = 'custom-button';
        render(<CustomButton {...defaultProps} data-testid={dataTestId} />);
        const button = screen.getByTestId(dataTestId);
        expect(button).toBeInTheDocument();
    });
});
