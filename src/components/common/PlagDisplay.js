import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { uppercaseFirst, lowercaseFirst } from '../../common/helpers';
import { dateDisplayFormat } from '../../common/constants';
import { breakPoints, colors } from '../../config';
import {
    Card,
    CardContent,
    CardActions,
    Avatar,
    Grid
} from "@material-ui/core";
import PlagLike from './PlagLike';
import moment from 'moment';

const PlagCard = styled(Card)`
    &.MuiCard-root{
        background-color: #eee;
        border: 1px solid #888;
        border-radius:10px;
        margin-bottom:30px;
    }
`;
const Citations = styled.div`
  margin: 0;
  padding: 20px 0;
  font-size:14px;
  line-height:1.2;
  a{
    font-weight:normal;
  }
`;
const PlagCitationNum = styled.sup`
    font-size: 12px;
    text-decoration:none;
`;
const PlagFooter = styled(CardActions)`
  border-top: 1px dashed #555;
  background: #ddd;
  div{
    padding:10px;
  }  
`;
const FooterGridL = styled(Grid)`
    display:flex;
    align-items:center;
    a{
        text-decoration:none;
        font-weight:bold;
    }
    @media (max-width: ${breakPoints.header}px) {
        display:block;
        text-align:center;
        line-height: 2.0;
        padding:0 12px!important;
    }
`;

const FooterGridR = styled(Grid)`
    display:flex;
    align-items:center;
    justify-content: flex-end;
    @media (max-width: ${breakPoints.header}px) {
        display:block;
        text-align:center;
        padding:0 12px!important;
    }
`;
const FooterAvatar = styled(Avatar)`
    &.MuiAvatar-root{
        padding:0;
        width:50px;
        height:50px;
        margin-right:10px;
        background-color:${colors.greyDark};
        @media (max-width: ${breakPoints.header}px) {
            margin:0 auto 10px auto!important
        }
    }
`;
const CitationItem = styled.span`
    display:inline;
`;
const CitationLink = styled.a`
    text-decoration:none;
    margin-left:8px;
    font-style:italic;
    &:hover{
        background-color:${colors.yellow};
    }
`;

const PlagDisplay = ({ plag, user, preview, postDate, isFaved, numLikes, idx, handleLikeClick, isLoggedIn }) => {
    const groupedCitations = plag.filter((v,i,a)=>a.findIndex(t=>(`${t.title} ${t.author}` === `${v.title} ${v.author}`))===i)
    // const [likes, setLikes] = useState(numLikes ? numLikes : 0);
    // set from
    // const [userLikes, setUserLikes] = useState(isLiked ? isLiked : isFaved);
    const [likeInitted, setLikeInitted] = useState('n');

    const date = (!preview) ? moment(postDate, `x`).format(dateDisplayFormat) : moment().format(dateDisplayFormat);
    const handleLikeToggle = async (idx) => {
        // you can only like if you're logged in
        if (!isLoggedIn){
            return
        }
        if (likeInitted !== 'y'){
            setLikeInitted('y');
        }
        if (!preview){
            // E.T. phone home... (only if not preview)
            handleLikeClick(idx);
        }
    };
    return (
        <PlagCard>
            <CardContent>
                {plag.map((item, idx) => {
                    const citationIndex = groupedCitations.findIndex((cit) => cit.title === item.title && cit.author === item.author);
                    const itemText = (idx === 0 || item.newline > 0 || item.text.substr(0,2).toLowerCase() === 'i ') ? uppercaseFirst(item.text) : lowercaseFirst(item.text);
                    return (
                        <React.Fragment key={item.id}>
                            { item.newline === 2 && <br /> }
                            { item.newline > 0 && <br /> }
                            <span>
                            {itemText}
                        </span>
                            <PlagCitationNum>
                                [{(citationIndex + 1)}]
                            </PlagCitationNum>
                            <span>
                            {" "}
                        </span>
                        </React.Fragment>
                    );
                })}
                <Citations>
                    Citations:
                    {
                        groupedCitations.map((item, idx) => <CitationItem key={idx}>
                            <CitationLink href={item.link} target="_blank" rel="noopener noreferrer">
                                <sup>[{(idx + 1)}]</sup>
                                {" "}
                                "{item.title}" by {item.author}
                            </CitationLink>
                        </CitationItem>)
                    }
                </Citations>
            </CardContent>
            <PlagFooter>
                <Grid container spacing={3}>
                    <FooterGridL item xs={12} sm={8} align="left">
                        <Link to={`/user/${user._id}`}>
                            <FooterAvatar
                                alt={user.username}
                                src={user.avatar}
                                variant="circle"
                            />
                        </Link>
                        <span>
                            Remixed by
                        </span>
                        &nbsp;
                        <Link to={`/user/${user._id}`}>
                            {user.name}
                        </Link>
                        &nbsp;
                        {`on ${date}`}
                    </FooterGridL>
                    <FooterGridR item xs={12} sm={4} align="right">
                        <PlagLike
                            user={user}
                            numLikes={numLikes}
                            idx={idx}
                            handleLikeToggle={handleLikeToggle}
                            isFaved={isFaved}
                            likeInitted={likeInitted}
                        />
                    </FooterGridR>
                </Grid>
            </PlagFooter>
        </PlagCard>


    )
};

PlagDisplay.propTypes = {
    plag: PropTypes.arrayOf(PropTypes.any).isRequired,
    user: PropTypes.objectOf(PropTypes.any).isRequired,
    preview: PropTypes.bool,
    postDate: PropTypes.string,
    isFaved: PropTypes.bool,
    numLikes: PropTypes.number,
    handleLikeClick: PropTypes.func,
    idx: PropTypes.number,
    isLoggedIn: PropTypes.bool.isRequired,
};

// export default PlagDisplay;
const MPlagDisplay = React.memo(PlagDisplay);
export default MPlagDisplay;
