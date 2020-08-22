import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import { useParams } from 'react-router-dom';
import { colors } from "../config";
import {
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    Switch,
    Avatar,
    Chip,
} from '@material-ui/core';
import {
    Search as IconSearch,
    ArrowBack as IconPrev,
    ArrowForward as IconNext,
    Mail as IconSendMessage,
    ContactSupport as IconContact,
} from '@material-ui/icons';
import {
    MPlagDisplay,
    LoadingDialog,
    useDebounce,
    PButton
} from '../components';
import { pageStyle } from "../config";
import { GET_POSTS, FAV_POST, GET_USER_BY_ID } from "../queries";
import PropTypes from 'prop-types';
import {levelLabels} from "../common/constants";
import moment from "moment";
import history from "../utils/history";

const StyledPage = styled.div`${pageStyle}`;
const StyledMain = styled.div`
    background-color: #bbb;
    min-height: calc(100vh - 90px);
    background-image: url(/images/mosaic-bg-${props => props.mode === 'home' ? 'purple' : 'blue'}.gif);
    background-size: 1024px;
    background-repeat:repeat;
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    color:white;
`;
const StyledTextField = styled(TextField)`
    width:100%;
`;
const StyledHr = styled.hr`
    height:1px;
    background:${colors.greyLight};
    border:none;
    margin:20px 0;
`;
const NewsContent = styled.div`
    p{
        font-size: 16px;
    }
`;
const TagChip = styled(Chip)`
    background-color: red;
    color: white;
    margin: 5px;
    font-size: 16px!important;
`;
const FavsRow = styled(Grid)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const GhostBox = styled.div`
    border:1px dashed white;
    border-radius: 6px;
    background-color: transparent;
    padding:30px;
`;
const SidebarCard = styled(Card)`
    margin-bottom:30px;
    margin-top:60px;
`;
const StyledSeparator = styled.div`
    margin:30px 0;
    height:1px;
    width:100%;
    border-bottom:1px dashed #555;
`;
const AvatarWrap = styled.div`
    display:flex;
    justify-content: center;
    position:relative;

    width:80%;
    max-width:120px;
    height:auto;
    margin:0 auto;
`;
const StyledAvatar = styled(Avatar)`
    &.MuiAvatar-root{
        width:100%;
        height:auto;
    }
`;

const Feed = ({ appUser, mode, isLoggedIn }) => {
    const [search, setSearch] = useState('');
    const [filterFavs, setFilterFavs] = useState(false);
    const itemsPerPage = 10;
    const [postOffset, setPostOffset] = useState(0);
    const searchSend = useDebounce(search, 500);
    const [favPostGql] = useMutation(FAV_POST);
    let { userId } = useParams();
    const [getUserById, {
        loading: getUserByIdIsLoading,
        data: userInfo,
    }] = useLazyQuery(GET_USER_BY_ID, {
        variables: {
            id: userId,
        },
    });
    const fetchUserInfo = async () => {
        await getUserById({
            variables: {
                id: userId,
            }
        });
    }
    useEffect( () => {
        if (mode === 'user'){
            fetchUserInfo();
        }
        // eslint-disable-next-line
    }, [userId]);

    const [getPosts, {
        loading: getPostsIsLoading,
        data: posts,
    }] = useLazyQuery(GET_POSTS, {
        variables: {
            offset: postOffset,
            itemsPerPage,
            search: searchSend,
            mode,
            userId,
            filterFavs,
        },
    });

    useEffect( () => {
        let isMounted = true;
        if (isMounted){
            getPostsFresh();
        }
        return () => {
            isMounted = false;
        }
        // eslint-disable-next-line
    }, [searchSend]);

    const getPostsFresh = async () => {
        if (posts && posts.getPosts.length > 0) {
            await setPostOffset(0);
        }
        await getPosts({
            variables: {
                offset: postOffset,
                itemsPerPage,
                search: searchSend,
                filterFavs,
            }
        });
    };
    const handleSearchChange = async (e) => {
        await setSearch(e.target.value);
    };
    const handleFilterFavChange = () => {
        setFilterFavs(!filterFavs);
    };
    const handlePaginationNav = (dir) => {
        // 1 = next, -1 = prev
        if (dir > 0){
            setPostOffset(postOffset + itemsPerPage);
        } else {
            let newOffset = postOffset - itemsPerPage;
            if (newOffset < 0) {
                newOffset = 0;
            }
            setPostOffset(newOffset);
        }
        getPosts();
    };
    const PaginationDisplay = () => {
        if (!posts){
            return null;
        }
        const prevEnabled = postOffset > 0;
        const nextEnabled = (posts && (posts.getPosts.length === 0 || posts.getPosts.length) === itemsPerPage);
        return (
            <Grid item xs={12} align="right">
                <span style={{ marginRight: 20 }}>
                    { (postOffset + 1) } - { (postOffset + posts.getPosts.length) }
                </span>
                {
                    prevEnabled && <span style={{ marginRight: (nextEnabled) ? 20 : 0 }}>
                        <PButton
                            label="Previous"
                            handler={() => handlePaginationNav(-1)}
                            icon={<IconPrev />}
                            disabled={false}
                        /></span>
                }
                {
                    nextEnabled && <PButton
                        label="Next"
                        handler={() => handlePaginationNav(1)}
                        icon={<IconNext />}
                        disabled={false}
                    />
                }
            </Grid>
        );
    };

    const userInfoData = userInfo && userInfo.getUserById;
    const isSameUser = appUser && userInfoData && userInfoData.auth0Id === appUser.auth0Id;
    const handleLikeClick = async (idx) => {
        if (posts.getPosts[idx]){
            const isFaved = !posts.getPosts[idx].isFaved;
            posts.getPosts[idx].isFaved = !posts.getPosts[idx].isFaved;
            posts.getPosts[idx].likes = (posts.getPosts[idx].isFaved) ? posts.getPosts[idx].likes + 1 : posts.getPosts[idx].likes - 1;
            await favPostGql({
                variables: {
                    isFav: isFaved,
                    favUser: appUser._id,
                    favPost: posts.getPosts[idx]._id,
                },
            });
        }
    };
    const handleSendMessage = () => {
        if (userId) {
            history.push(`/new-message/${userId}`);
        }
    };
    const handleContactBtnClick = () => {
        history.push('/contact');
    }
    const favoritesOnlyTest = false;
    return (
        <StyledMain mode={mode}>
            <StyledPage>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <SidebarCard>
                                {
                                    mode === 'user' && <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                {
                                                    getUserByIdIsLoading && <div>LOADING</div>
                                                }
                                                {
                                                    (!getUserByIdIsLoading && userInfoData) && <div>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} align="center">
                                                                <h2>{userInfoData.name}</h2>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <AvatarWrap>
                                                                    <StyledAvatar src={userInfoData.avatar} alt={userInfoData.name} />
                                                                </AvatarWrap>
                                                            </Grid>
                                                            <Grid item xs={12} align="center">
                                                                <i>
                                                                    "{userInfoData.slogan.join(' ')}"
                                                                </i>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <b>Level:</b>{" "}{userInfoData.level} - {levelLabels[userInfoData.level]}<br />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <b>Score:</b>{" "}{userInfoData.score}<br />
                                                            </Grid>
                                                            {/*<Grid item xs={12}>*/}
                                                            {/*    <b># Posts:</b>{" "}{userInfoData.numPosts}<br />*/}
                                                            {/*</Grid>*/}
                                                            {/*<Grid item xs={12}>*/}
                                                            {/*    <b># Posts:</b>{" "}{userInfoData.numLikes}<br />*/}
                                                            {/*</Grid>*/}

                                                            {/*<Grid item xs={12}>*/}
                                                            {/*    <b># Followers:</b>{" "}{userInfoData.numFollowers}<br />*/}
                                                            {/*</Grid>*/}

                                                            <Grid item xs={12}>
                                                                <b>Joined:</b>{" "}{moment(parseInt(userInfoData.createdAt, 10)).format('LLL')}<br />
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <b>Bio:</b>{" "}<span style={{ lineHeight:1.5 }}>{userInfoData.bio}</span><br />
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <b>Tags:</b>{" "}
                                                                {
                                                                    userInfoData.tags.map((tag, idx) => <TagChip key={idx} label={tag} />)
                                                                }<br />
                                                            </Grid>

                                                            {
                                                                !isSameUser && isLoggedIn && <Grid item xs={12} align="center">
                                                                    <PButton
                                                                        label="Send Message"
                                                                        handler={handleSendMessage}
                                                                        icon={<IconSendMessage />}
                                                                        disabled={false}
                                                                        overWhite={true}
                                                                    />
                                                                </Grid>
                                                            }
                                                        </Grid>
                                                    </div>
                                                }
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                }
                                {
                                    mode === 'home' && <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <StyledTextField
                                                    name="search"
                                                    type="search"
                                                    value={search}
                                                    variant="outlined"
                                                    onChange={handleSearchChange}
                                                    label="Search"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <IconSearch />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                                {/*<div>Search: {search} </div>*/}
                                                {/*<div>searchSend: {searchSend}</div>*/}
                                                {/*<div>Offset: {postOffset}</div>*/}
                                            </Grid>
                                            {
                                                favoritesOnlyTest && <Grid item xs={12}>
                                                    <FavsRow>
                                                        <div>
                                                            Favorites Only
                                                        </div>
                                                        <Switch
                                                            value={filterFavs}
                                                            onChange={handleFilterFavChange}
                                                        />
                                                    </FavsRow>
                                                </Grid>
                                            }
                                        </Grid>

                                        <StyledSeparator />

                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <h2>News</h2>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <NewsContent>
                                                    <p>
                                                        <b>Q:</b> What is Re:hash?
                                                    </p>
                                                    <p>
                                                        <b>A:</b> Think magnetic poetry on "hard" mode, a self-expression platform based on strict limitations.
                                                    </p>
                                                    <p>
                                                        <b>Q:</b> So, why do I feel compelled to remix classic literature into new bite-sized word-nuggets?
                                                    </p>
                                                    <p>
                                                        <b>A:</b> Now you're getting the idea. Click on the "new post" button thingy to get started. Select a source and click on some phrases to get started. Rearrange them into something cool. Click Publish.
                                                    </p>
                                                    <StyledHr />
                                                    <h3 style={{ marginBottom:10 }}>New Snippets Coming</h3>
                                                    <p>
                                                        We'll keep adding sources for you to Re:hash to your little heart's delight. So, keep smashing that refresh button!
                                                    </p>
                                                </NewsContent>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} align="center">
                                                <div
                                                    style={{ marginTop: 20 }}
                                                >
                                                    <PButton
                                                        label="Contact Us"
                                                        handler={handleContactBtnClick}
                                                        icon={<IconContact />}
                                                        disabled={false}
                                                        overWhite={true}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                }
                            </SidebarCard>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Grid container spacing={3}>
                                <PaginationDisplay />

                                {
                                    posts?.getPosts?.length === 0 && <Grid container spacing={3}>
                                        <Grid item xs={12} align="center">
                                            <div style={{ padding: 10 }}>
                                                <GhostBox>
                                                    <h2>Oh, no! There are no re:hashes left to show. Sad, I know.</h2>
                                                </GhostBox>
                                            </div>
                                        </Grid>
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                    { posts && posts.getPosts && posts.getPosts.map((post, idx) => <MPlagDisplay
                                        key={post._id}
                                        plag={JSON.parse(post.content)}
                                        user={post.postAuthor}
                                        idx={idx}
                                        postDate={post.createdAt}
                                        isFaved={post.isFaved}
                                        numLikes={post.likes}
                                        handleLikeClick={handleLikeClick}
                                        isLoggedIn={isLoggedIn}
                                    />) }
                                </Grid>

                                <PaginationDisplay />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </StyledPage>
            <LoadingDialog
                isLoading={getPostsIsLoading}
            />
        </StyledMain>
    )
};
Feed.propTypes = {
    appUser: PropTypes.objectOf(PropTypes.any),
    isLoggedIn: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
};
export default Feed;
