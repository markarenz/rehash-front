import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const ButtonWrap = styled.div`
    display: inline-block;
    transform: scale(1.0);
    transition: 0.25s transform ease-out;
    &:hover {
        transform: scale(1.1);
    }
`;
const overWhiteStyle = `
    &:hover{
        background-color: #333!important;
        color:white!important;
    }
`;
const StyledButton = styled(Button)`
    margin-left: 12px;
    ${props => props.overwhite === 'y' && overWhiteStyle};
`;
const Label = styled.span`
    display:inline-block;    
    ${props => props.label !== '' ? 'margin-left:10px;' : ''}
`;

const PButton = ({ label, icon, handler, disabled, overWhite }) => <ButtonWrap>
    <StyledButton
        variant="contained"
        onClick={handler}
        disabled={disabled}
        overwhite={overWhite && 'y'}
    >
        {icon}
        <Label
            label={label}
        >
            {label}
        </Label>
    </StyledButton>
</ButtonWrap>;

PButton.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.objectOf(PropTypes.any).isRequired,
    handler: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    overWhite: PropTypes.bool,
};

export default PButton;
