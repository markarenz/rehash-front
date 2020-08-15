import React from 'react';
import styled, {keyframes} from 'styled-components';
import { Chip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { colors } from '../config';

const chipAnimIn = keyframes`
        0% {
            transform: scale(0.0, 0.0);
        }
        50% {
            transform: scale(1.2, 1.2);
        }
        100% {
            transform: scale(1.0, 1.0);
        }
    `;

const StyledChip = styled(Chip)`
    margin: 2px 4px;
    animation-name: ${chipAnimIn};
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    &.MuiChip-root{
        background-color: ${colors.greenDark};
        color: white;
        &:focus {
            background-color: ${colors.greyDark};
            color: white;
        }
        .MuiChip-deleteIcon{
            color: white;
        }
    }
`;
const ProfileTag = ({ itemLabel, handleDelete }) => <StyledChip
    label={itemLabel}
    onDelete={handleDelete}
/>;

ProfileTag.propTypes = {
  itemLabel: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ProfileTag;
