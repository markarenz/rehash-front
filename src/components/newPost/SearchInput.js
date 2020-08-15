import React from 'react';
import styled from "styled-components";
import {
    InputAdornment,
    TextField,
} from "@material-ui/core";
import {
    Search as IconSearch,
    Close as IconClose,
} from "@material-ui/icons";
import PropTypes from 'prop-types';

const StyledSearch = styled(TextField)`
    color:white;
    width:100%;
`;

const StyledCloseIcon = styled(IconClose)`
    color:white!important;
    cursor: pointer;
`;
const StyledSearchIcon = styled(IconSearch)`
    color:white!important;
`;

const SearchInput = ({ sourceSearch, handleSourceSearchChange, handleClearSourceSearch }) => <StyledSearch
    className="searchFieldTheme"
    id="input-source-search"
    // type="search"
    variant="outlined"
    value={sourceSearch}
    onChange={handleSourceSearchChange}
    color="primary"
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                {
                    sourceSearch !== '' && <StyledCloseIcon onClick={handleClearSourceSearch}/>
                }
            </InputAdornment>
        ),
        startAdornment: (
            <InputAdornment position="start">
                <StyledSearchIcon />
            </InputAdornment>
        )
    }}
/>;

SearchInput.propTypes = {
    sourceSearch: PropTypes.string.isRequired,
    handleSourceSearchChange: PropTypes.func.isRequired,
    handleClearSourceSearch: PropTypes.func.isRequired,
};
export default SearchInput;
