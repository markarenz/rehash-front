import React, { useState, useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

const DropZoneWrap = styled.div`
    width:100%;
    border:1px solid #bbb;
    border-radius:10px;
    height:118px;
    display:flex;
    align-items:center;
`;
const CenteredDiv = styled.div`
    text-align:center;
    width:100%;
`;

const Dropzone = ({ auth0Id, userId, avatar, handleAvatarChange, handleAvatarUpladClose }) => {
    const [isUploading, setIsUploading] = useState(false);
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        if (acceptedFiles.length > 0){
            const image = acceptedFiles[0];
            // const bodyObj = {
            //     auth0Id,
            //     photo: image,
            // };
            var formData = new FormData();
            formData.append('photo', image);
            formData.append('auth0Id', auth0Id);
            formData.append('userId', userId);
            formData.append('oldAvatar', avatar);
            setIsUploading(true);
            fetch(`${process.env.REACT_APP_API_URL}/avatar`, {
                method: 'POST',
                headers: new Headers({
                //     'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('idToken'),
                }),
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setIsUploading(false);
                    handleAvatarChange(data.avatar);
                    handleAvatarUpladClose();
                })
                .catch((err) => {
                    console.log('err', err);
                });

        }
        // eslint-disable-next-line
    }, [auth0Id, userId, avatar]);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    const dropZoneText = isDragActive ? 'Drop an image here ...' : 'Drag an avatar image here, or click to browse';

    return (
        <DropZoneWrap {...getRootProps()}>
            {
                isUploading ? <CenteredDiv><CircularProgress /></CenteredDiv> : <CenteredDiv>{dropZoneText}</CenteredDiv>
            }
            <input {...getInputProps()} />
            {/*{*/}
            {/*    isDragActive ?*/}
            {/*        <CenteredDiv>Drop an image here ...</CenteredDiv>*/}
            {/*        :*/}
            {/*        <CenteredDiv>Drag an avatar image here, or click to browse</CenteredDiv>*/}
            {/*}*/}
        </DropZoneWrap>
    )
};

Dropzone.propTypes = {
    auth0Id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    handleAvatarChange: PropTypes.func.isRequired,
    handleAvatarUpladClose: PropTypes.func.isRequired,
};

export default Dropzone;
