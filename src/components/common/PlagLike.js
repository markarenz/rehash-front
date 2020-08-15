import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DisplayLikeIcon from "./DisplayLikeIcon";
import ClickableElement from "./ClickableElement";

const LikesDispSup = styled.sup`
    position: relative;
    top:-10px;
    right:2px;
    line-height:1;
    font-size: 18px;
`;

const PlagLike = ({
      user,
      numLikes,
      idx,
      handleLikeToggle,
      isFaved,
      likeInitted,
  }) => {
    return (
        <div>
            <LikesDispSup>{numLikes}</LikesDispSup>
            <ClickableElement handleClick={() => handleLikeToggle(idx)}>
                <DisplayLikeIcon
                    isFaved={isFaved}
                    likeInitted={likeInitted}
                />
            </ClickableElement>
        </div>
    )
};

PlagLike.propTypes = {
    user: PropTypes.objectOf(PropTypes.any).isRequired,
    numLikes: PropTypes.number.isRequired,
    idx: PropTypes.number.isRequired,
    handleLikeToggle: PropTypes.func.isRequired,
    isFaved: PropTypes.bool,
    likeInitted: PropTypes.string,
};

export default PlagLike;
