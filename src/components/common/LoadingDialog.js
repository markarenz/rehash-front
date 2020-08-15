import React from 'react';
import Loading from './Loading';
import { Dialog, DialogContent } from "@material-ui/core";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
    .MuiPaper-root{
        border-radius:50%;
        background-color:rgba(255,255,255,.5);
    }
`;
const LoadingDialog = ({ isLoading }) => <StyledDialog open={isLoading}>
    <DialogContent>
        <Loading
            repeatAnimation
            size="small"
        />
    </DialogContent>
</StyledDialog>;

LoadingDialog.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};
export default LoadingDialog;
