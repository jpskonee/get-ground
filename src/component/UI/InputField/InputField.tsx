import React from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

interface InputFieldProps {
    value: string;
    onChange: (e: any) => void;
    loading?: boolean;
    showClearIcon?: boolean;
    onClearClick?: () => void;
    placeholder?: string;
    style?: object
    label?: string;
    variant?: 'outlined' | 'filled' | 'standard';
    [others: string]: any
}

const InputField = ({ variant = 'standard', loading = false, showClearIcon = false, onClearClick = () => { }, style, ...res }: InputFieldProps) => {
    return (
        <TextField
            sx={{ padding: '10px 20px', ...style }}
            InputProps={{
                startAdornment: loading ? (
                    <InputAdornment position="start">
                        <CircularProgress size={20} />
                    </InputAdornment>
                ) : null,
                endAdornment: showClearIcon ? (
                    <IconButton onClick={onClearClick}>
                        <CancelIcon />
                    </IconButton>
                ) : null
            }}
            variant={variant}
            {...res}
        />
    )
}

export default InputField