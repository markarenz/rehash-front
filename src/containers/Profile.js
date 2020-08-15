import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    IconButton,
    TextField,
} from '@material-ui/core';
import {
    Edit as IconEdit,
    Replay as IconSave,
    Close as IconClose,
    ExitToApp as IconLogout,
} from '@material-ui/icons';
import { pageStyle, colors } from "../config";
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    levelLabels,
    profileTags,
    sloganNouns,
    sloganVerbs,
    sloganFinishers
} from '../common/constants';
import {
    PButton,
    LoadingDialog,
    Dropzone,
    ProfileTag,
    InputSelect,
} from '../components';
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PROFILE } from "../queries";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail } from '../common/helpers';

const StyledPage = styled.div`${pageStyle}`;
const StyledMain = styled.div`
    background-color: #bbb;
    min-height: calc(100vh - 90px);
    background-image: url(/images/mosaic-bg.gif);
    background-size: 1024px;
    background-repeat:repeat;
    image-rendering: pixelated;   
    color:white; 
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
const IconButtonFloat = `
    &.MuiButtonBase-root{
        background-color:#eee;
        border:1px solid #444;
        position:absolute;
        top:-5px;
        right:-10px;
        padding:8px;
        .MuiSvgIcon-root{
            width:18px;
            height:18px;
        }
        &:hover{
            background-color:#fff;
        }
    }
`;
const StyledIconButton = styled(IconButton)`
    ${IconButtonFloat}
`;
const StyledTextField = styled(TextField)`
    width:100%;
    .MuiOutlinedInput-notchedOutline{
        border-color: ${colors.greyDark}!important;
    }
    .MuiFormLabel-root{
        color:${colors.greyDark}!important;
    }
`;
const DropzoneWrap = styled.div`
    position:relative;
`;

const DropzoneCloseBtn = styled(IconButton)`
    ${IconButtonFloat}
    &.MuiButtonBase-root{
        top:-5px;
        right:-10px;
    }
`;
const CharsLeftWrap = styled.div`
    position: relative;
`;
const CharsLeft = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    font-weight:bold;
    font-size: 12px;
    color: ${props => props.remaining < 51 ? '#ee3333' : 'inherit'}
`;
const StyledCard = styled(Card)`
    margin-bottom:30px;
`;
const StyledCardHeaderBasic = styled(CardHeader)`
    background-color: ${colors.purple};
`;
const StyledCardHeaderTags = styled(CardHeader)`
    background-color: ${colors.greenDark};
`;
const StyledCardHeaderSlogan = styled(CardHeader)`
    background-color: ${colors.blueGrey};
`;

const SidebarCard = styled(Card)`
    margin-bottom: 30px;
`;

const Profile = ({ appUser, refreshAppUser, handleLogout }) => {
    const [updateProfileGql, { loading: updateProfileIsLoading, error: updateProfileError }] = useMutation(UPDATE_PROFILE);
    const [selectedTag, setSelectedTag] = useState(0);
    const [profileUser, setProfileUser] = useState(appUser);
    const sloganLookup = (sloganIdx) => {
        if (appUser && appUser.slogan && appUser.slogan[sloganIdx]){
            return appUser.slogan[sloganIdx];
        }
        return '';
    };
    const [selectedSloganNoun, setSelectedSloganNoun] = useState(sloganLookup(0));
    const [selectedSloganVerb, setSelectedSloganVerb] = useState(sloganLookup(1));
    const [selectedSloganFinisher, setSelectedSloganFinisher] = useState(sloganLookup(2));
    const maxBioLength = 250;
    useEffect(() => {
        if (updateProfileError){
            toast(updateProfileError.message.replace('GraphQL error: ',''));
        }
    }, [updateProfileError]);

    const [isAvatarUploadOpen, setIsAvatarUploadOpen] = useState(false);

    const handleTagSelect = (e) => {
        if (!profileUser.tags.includes(profileTags[(e.target.value - 1)])){
            setSelectedTag(e.target.value);
            if (profileUser.tags.length < 3) {
                profileUser.tags.push(profileTags[(e.target.value - 1)]);
            }
        }
    };

    const handleTagDelete = (idx) => {
        const newTags = [
            ...profileUser.tags,
        ];
        newTags.splice(idx,1);
        setProfileUser({
            ...profileUser,
            tags: newTags,
        })
    };
    const handleAvatarClick = () => {
        setIsAvatarUploadOpen(true);
    };
    const handleAvatarUpladClose = () => {
        setIsAvatarUploadOpen(false);
    };

    const handleAvatarChange = (avatar) => {
        setProfileUser({
            ...profileUser,
            avatar,
        });
    };
    const handleProfileChange = (e) => {
        const field = e.target.name;
        setProfileUser({
            ...profileUser,
            [field]: e.target.value,
        });
    };

    const handleProfileSave = async () => {
        try {
            await updateProfileGql({
                variables: {
                    _id: appUser._id,
                    name: profileUser.name,
                    email: profileUser.email,
                    bio: profileUser.bio,
                    tags: profileUser.tags,
                    slogan: profileUser.slogan,
                },
            });
            refreshAppUser();
        } catch(error){
            console.log('Error triggered by HandleProfileSave', error);
        }
    };
    const emailValid = validateEmail(profileUser.email);
    const formValid = emailValid && profileUser.email !== '' && profileUser.name !== '';

    const handleSloganNounChange = (e) => {
        setSelectedSloganNoun(e.target.value);
        profileUser.slogan[0]=e.target.value;
    };
    const handleSloganVerbChange = (e) => {
        setSelectedSloganVerb(e.target.value);
        profileUser.slogan[1]=e.target.value;
    };
    const handleSloganFinisherChange = (e) => {
        setSelectedSloganFinisher(e.target.value);
        profileUser.slogan[2]=e.target.value;
    };
    const profileTagsSorted = profileTags.sort().map((item, idx) => {return {value: (idx + 1), label: item, disabled: false}});
    const profileTagOptions = [
        { value: 0, label: 'Select up to 3 tags', disabled: true},
        ...profileTagsSorted,
    ];
    const sloganNounsSorted = sloganNouns.sort().map((item, idx) => {return {value: item, label: item, disabled: false}});
    const sloganNounOptions = [
        { value: '', label: 'Select a noun', disabled: true},
        ...sloganNounsSorted,
    ];
    const sloganVerbsSorted = sloganVerbs.sort().map((item, idx) => {return {value: item, label: item, disabled: false}});
    const sloganVerbOptions = [
        { value: '', label: 'Select a verb', disabled: true},
        ...sloganVerbsSorted,
    ];
    const sloganFinishersSorted = sloganFinishers.sort().map((item, idx) => {return {value: item, label: item, disabled: false}});
    const sloganFinisherOptions = [
        { value: '', label: 'Select a finisher', disabled: true},
        ...sloganFinishersSorted,
    ];

    return (
        <StyledMain>
            <StyledPage>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>Profile: {profileUser.name}</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <SidebarCard>
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    {
                                                        isAvatarUploadOpen
                                                            ?
                                                            <DropzoneWrap>
                                                                <Dropzone
                                                                    auth0Id={appUser.auth0Id}
                                                                    userId={appUser._id}
                                                                    handleAvatarChange={handleAvatarChange}
                                                                    avatar={profileUser.avatar}
                                                                    handleAvatarUpladClose={handleAvatarUpladClose}
                                                                />
                                                                <DropzoneCloseBtn onClick={handleAvatarUpladClose}>
                                                                    <IconClose />
                                                                </DropzoneCloseBtn>
                                                            </DropzoneWrap>
                                                            :
                                                            <AvatarWrap>
                                                                <StyledAvatar src={profileUser.avatar} alt={appUser.name} />
                                                                <StyledIconButton onClick={handleAvatarClick}>
                                                                    <IconEdit />
                                                                </StyledIconButton>
                                                            </AvatarWrap>
                                                    }
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <b>Level:</b>{" "}{profileUser.level} - {levelLabels[appUser.level]}<br />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <b>Score:</b>{" "}{profileUser.score}<br />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <b># Posts:</b>{" "}{profileUser.numPosts}<br />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <b># Posts:</b>{" "}{profileUser.numLikes}<br />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <b># Followers:</b>{" "}{profileUser.numFollowers}<br />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <b>Joined:</b>{" "}{moment(parseInt(appUser.createdAt, 10)).format('LLL')}<br />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </SidebarCard>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} align="center">
                                            <PButton
                                                label="Log Out"
                                                handler={handleLogout}
                                                icon={<IconLogout />}
                                                disabled={false}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <StyledCard>
                                        <StyledCardHeaderBasic title="Basic Info" />
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <StyledTextField
                                                        name="name"
                                                        value={profileUser.name}
                                                        variant="outlined"
                                                        onChange={handleProfileChange}
                                                        label="Name"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <StyledTextField
                                                        name="email"
                                                        type="email"
                                                        value={profileUser.email}
                                                        variant="outlined"
                                                        onChange={handleProfileChange}
                                                        label="Email"
                                                        error={!emailValid}
                                                        // TODO: Update Email: Phase 2; disabled for now
                                                        disabled
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <CharsLeftWrap>
                                                        <StyledTextField
                                                            name="bio"
                                                            value={profileUser.bio}
                                                            variant="outlined"
                                                            onChange={handleProfileChange}
                                                            label="Bio"
                                                            multiline
                                                            rows={4}
                                                            inputProps={{
                                                                maxLength: maxBioLength
                                                            }}
                                                        />
                                                        <CharsLeft remaining={profileUser.bio ? (maxBioLength - profileUser.bio.length) : 0}>
                                                            { profileUser.bio && (maxBioLength - profileUser.bio.length) }
                                                        </CharsLeft>
                                                    </CharsLeftWrap>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </StyledCard>

                                    <StyledCard>
                                        <StyledCardHeaderTags title="Tags" />
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={4}>
                                                    <InputSelect
                                                        value={selectedTag}
                                                        variant="outlined"
                                                        handleChange={handleTagSelect}
                                                        placeholder="Select up to 3 tags"
                                                        options={profileTagOptions}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={8}>
                                                    {
                                                        profileUser.tags && profileUser.tags.map((item, idx) => <ProfileTag
                                                            key={item}
                                                            itemLabel={item}
                                                            handleDelete={() => handleTagDelete(idx)}
                                                        />)
                                                    }
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </StyledCard>

                                    <StyledCard>
                                        <StyledCardHeaderSlogan title="Slogan" />
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={4}>
                                                    <InputSelect
                                                        value={selectedSloganNoun}
                                                        variant="outlined"
                                                        handleChange={handleSloganNounChange}
                                                        placeholder="Select a noun"
                                                        options={sloganNounOptions}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <InputSelect
                                                        value={selectedSloganVerb}
                                                        variant="outlined"
                                                        handleChange={handleSloganVerbChange}
                                                        placeholder="Select a verb"
                                                        options={sloganVerbOptions}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <InputSelect
                                                        value={selectedSloganFinisher}
                                                        variant="outlined"
                                                        handleChange={handleSloganFinisherChange}
                                                        placeholder="Select a finisher"
                                                        options={sloganFinisherOptions}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </StyledCard>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} align="right">
                                            <PButton
                                                label="Save"
                                                icon={<IconSave />}
                                                handler={handleProfileSave}
                                                disabled={!formValid}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </StyledPage>
            <LoadingDialog
                isLoading={updateProfileIsLoading}
            />
            <ToastContainer
                position={toast.POSITION.TOP_RIGHT}
                className='toastContainer'
                bodyClassName='toastItem'
                progressClassName='toastItem'
            />
        </StyledMain>
)
};

Profile.propTypes = {
    appUser: PropTypes.objectOf(PropTypes.any),
    refreshAppUser: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default Profile;
