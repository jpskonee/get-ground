import React, { Component } from 'react';
import Button from '@mui/material/Button';

export interface CustomButtonProps {
    text: string;
    variant?: 'outlined' | 'contained' | 'text';
    onClick?: () => void;
    style?: object
    [others: string]: any
}

class CustomButton extends Component<CustomButtonProps> {
    render() {

        let { text, variant = 'contained', ...res } = this.props

        return (
            <Button variant={variant} {...res}>{text}</Button>
        );
    }
}

export default CustomButton;