import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DisplayLikeIcon from "./DisplayLikeIcon";
import ClickableElement from "./ClickableElement";
import { Tooltip } from '@material-ui/core';

const LikesDispSup = styled.sup`
    position: relative;
    top:-10px;
    right:2px;
    line-height:1;
    font-size: 18px;
`;
const StyledTooltip = styled(Tooltip)`
    .MuiTooltip-tooltip{
        font-size:20px;
    }
`;

const PlagLike = ({
      numLikes,
      idx,
      handleLikeToggle,
      isFaved,
      likeInitted,
      title,
  }) => {
    return (
        <Tooltip
            title={title}
            placement="top"
        >
            <div>
                <LikesDispSup>{numLikes}</LikesDispSup>
                <ClickableElement handleClick={() => handleLikeToggle(idx)}>
                    <DisplayLikeIcon
                        isFaved={isFaved}
                        likeInitted={likeInitted}
                    />
                </ClickableElement>
            </div>
        </Tooltip>
    )
};

PlagLike.propTypes = {
    title: PropTypes.string,
    numLikes: PropTypes.number.isRequired,
    idx: PropTypes.number.isRequired,
    handleLikeToggle: PropTypes.func.isRequired,
    isFaved: PropTypes.bool,
    likeInitted: PropTypes.string,
};

export default PlagLike;
