import React from 'react';
import styled from 'styled-components';
import {
    Select,
    MenuItem,
    FormControl,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const StyledSelect = styled(Select)`
    width:100%;
`;
const StyledFormControl = styled(FormControl)`
    width:100%;
`;

const InputSelect = ({ value, handleChange, label, options, placeholder }) => <StyledFormControl variant="outlined">
    <StyledSelect
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': placeholder }}
    >
        {
            options.map((item, idx) => <MenuItem
                value={item.value}
                key={idx}
                disabled={item.disabled}
            >
                { item.disabled ? <em>{item.label}</em> : <span>{item.label}</span>}
            </MenuItem>)
        }
    </StyledSelect>
</StyledFormControl>;

InputSelect.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.any),
    placeholder: PropTypes.string,
};

export default InputSelect;
