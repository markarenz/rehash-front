import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
    Container,
    Grid,
    IconButton,
} from '@material-ui/core';
import {
    Close as IconClose,
    Check as IconPublish,
    Replay as IconClear,
    ArrowForward as IconNewline0,
    SubdirectoryArrowRight as IconNewline1,
    ArrowDownward as IconNewline2,
} from '@material-ui/icons';
import { pageStyle } from "../config";
import { removePunctuation } from "../common/helpers";
import {
    Headline2,
    PButton,
    MPlagDisplay,
    LoadingDialog,
    SourcesPanel,
    NewPostLoginWarning,
} from '../components';
import { sources } from '../data';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { useMutation } from "@apollo/react-hooks";
import { CREATE_POST } from "../queries";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";
import history from "../utils/history";

const StyledPage = styled.div`${pageStyle}`;

const StyledMain = styled.div`
    background-color: #bbb;
    min-height: calc(100vh - 90px);
    background-image: url(/images/mosaic-bg-green.gif);
    background-size: 1024px;
    background-repeat:repeat;
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    color:white;
`;
const PlagLine = styled.div`
    display:block;
    cursor: pointer;
    z-index:4;    
    margin-top:${(props) => props.newline === 0 && '-5px'}${(props) => props.newline === 1 && '10px'}${(props) => props.newline === 2 && '30px'};
`;
const PlagLineInner = styled.div`
    border-radius:20px;
    display:inline-block;
    font-size: 16px;
    line-height: 1;
    padding:5px;
    margin: 5px 3px;
    color: #333;
    background-color: #fff;
    box-shadow: 2px 2px 10px rgba(0,0,0,.5);
    /* DISABLE TEXT SELECTION */
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently */
`;
const PlagLineBtn = styled(IconButton)`
    padding:4px!important;
`;
const PlagLineBtnIcon = styled(IconClose)`
      width: 12px;
      height: 12px;
`;


const EditPanelWrap = styled.div`
    min-height:500px;
`;

const NewPost = ({ appUser, refreshAppUser, isLoggedIn }) => {
    const [sourceSearch, setSourceSearch] = useState('');
    const [createPostGql, { loading: createPostIsLoading, error: createPostError }] = useMutation(CREATE_POST);
    // const testPlag = [{"id":4,"newline":0,"text":"is there more delight","title":"Sonnet 130","author":"William Shakespeare","link":"https://www.gutenberg.org/ebooks/1105"},{"id":1,"newline":0,"text":"i have seen roses damask'd","title":"Sonnet 130","author":"William Shakespeare","link":"https://www.gutenberg.org/ebooks/1105"},{"id":2,"newline":1,"text":"That music hath","title":"Sonnet 130","author":"William Shakespeare","link":"https://www.gutenberg.org/ebooks/1105"},{"id":3,"newline":0,"text":"and yet by heaven","title":"Sonnet 130","author":"William Shakespeare","link":"https://www.gutenberg.org/ebooks/1105"},{"id":5,"newline":1,"text":"The twilight of such day","title":"Sonnet 73","author":"William Shakespeare","link":"https://www.gutenberg.org/ebooks/1105"},{"id":6,"newline":0,"text":"the glowing of such fire","title":"Sonnet 73","author":"William Shakespeare","link":"https://www.gutenberg.org/ebooks/1105"},{"id":7,"newline":1,"text":"Consum'd with that which","title":"Sonnet 73","author":"William Shakespeare","link":"https://www.gutenberg.org/ebooks/1105"},{"id":8,"newline":1,"text":"O diem praeclarum","title":"The Life and Opinions of Tristram Shandy, Gentleman","author":"Laurence Sterne","link":"https://www.gutenberg.org/ebooks/1079"}];
    const [plag, setPlag] = React.useState([]); // [] or testPlag
    const [selectedSource, setSelectedSource] = React.useState({});
    const [sourceInspectorOpen, setSourceInspectorOpen] = React.useState(false);
    const sourcesSortedFiltered = sources.sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
    }).filter((item) => (item.title.toLowerCase().includes(sourceSearch.toLowerCase()) || item.author.toLowerCase().includes(sourceSearch.toLowerCase())));
    const handlePublish = async () => {
        try {
            await createPostGql({
                variables: {
                    userId: appUser._id,
                    // TODO: ideally, we would store these as arrays of objects rather than raw JSON strings
                    content: JSON.stringify(plag),
                },
            });
            // update AppUser to update score, numPosts, etc.
            await refreshAppUser();
            // Back to the homepage you go.
            history.push('/');
        } catch(error){
            console.log('Error triggered by handlePublish', error);
        }
    };
    const handleClearPlag = () => {
        setPlag([]);
    };
    useEffect(() => {
        if (createPostError){
            toast(createPostError.message.replace('GraphQL error: ',''));
        }
    }, [createPostError]);


    const handleSourceClick = (id) => {
        setSelectedSource(sources.find((item) => item.id === id));
        setSourceInspectorOpen(true);
    };
    const handleSourceInspectorClose = () => {
        setSelectedSource({});
        setSourceInspectorOpen(false);
    };
    const handlePlagLineDelete = (id) => {
        setPlag(plag.filter(line => line.id !== id));
    };
    const getMaxIdFromPlag = () => (plag.length === 0) ? 0 : plag.reduce((max, p) => p.id > max ? p.id : max, plag[0].id);
    const handleSourceInspectorInsert = (idx) => {
        const text = removePunctuation(selectedSource.lines[idx].t);
        const citation = setSelectedSource.citation;
        const newId = (getMaxIdFromPlag() + 1);
        const newSnippet = {
            id: newId,
            newline: 0,
            x: Math.floor(Math.random()*300),
            y: Math.floor(Math.random()*300),
            text,
            title: selectedSource.title,
            author: selectedSource.author,
            link: selectedSource.link,
            font: selectedSource.font,
            citation,
        };
        setPlag([
            ...plag,
            newSnippet,
        ])
    };
    const handleSourceSearchChange = (e) => {
        setSourceSearch(e.target.value);
    }
    const handleClearSourceSearch = () => {
        setSourceSearch('');
    }

    const onSortEnd = ({ oldIndex, newIndex }, event) => {
        setPlag(arrayMove(plag, oldIndex, newIndex));
    };
    const SortableDragHandle = sortableHandle(({text}) => <span>{text}</span>);
    const SortableLinesContainer = sortableContainer(({ children }) => <div className="linesWrap">{children}</div>);
    const handleNewlineClick = (id) => {
        const newPlag = plag.map((line) => {
            if (line.id !== id){
                return line;
            }
            const editedLine = line;
            editedLine.newline = editedLine.newline + 1;
            if (editedLine.newline > 2) {
                editedLine.newline = 0;
            }
            return editedLine;
        });
        setPlag([
            ...newPlag,
        ])
    };
    const NewLineButton = ({ newline, id }) => <PlagLineBtn onClick={() => handleNewlineClick(id)}>
        { newline === 0 && <IconNewline0 /> }
        { newline === 1 && <IconNewline1 /> }
        { newline === 2 && <IconNewline2 /> }
    </PlagLineBtn>;
    const SortableLine = sortableElement(({ line }) => <PlagLine key={line.id} newline={line.newline} text={line.text}>
        <PlagLineInner>
            <NewLineButton newline={line.newline} id={line.id} />
            {" "}
            <SortableDragHandle text={line.text}/>
            {" "}
            <PlagLineBtn onClick={() => handlePlagLineDelete(line.id)}>
                <PlagLineBtnIcon />
            </PlagLineBtn>
        </PlagLineInner>
    </PlagLine>);

    const EditPanel = () => <EditPanelWrap>
        <Headline2 title="Edit" />
        <SortableLinesContainer
            onSortEnd={onSortEnd}
            useDragHandle={true}
        >
            {
                plag.map((line, idx) => <SortableLine
                    index={idx}
                    key={line.id}
                    line={line}
                    idx={idx}
                />)
            }
        </SortableLinesContainer>
    </EditPanelWrap>;
    const PreviewPanel = () => <div>
        <Headline2 title="Preview" />
        <MPlagDisplay
            plag={plag}
            user={appUser}
            preview
            isLoggedIn={isLoggedIn}
            numLikes={0}
            idx={1}
        />
    </div>;
    const plagValid = (plag.length > 0);
    return (
        <StyledMain>
            <StyledPage>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <h1>New Re:hash</h1>
                                </Grid>
                                <Grid item xs={12} sm={9} align="right">
                                    <span style={{ marginRight: 10 }}>
                                        <PButton
                                            label="Clear"
                                            icon={<IconClear />}
                                            handler={handleClearPlag}
                                            disabled={false}
                                        />
                                    </span>
                                    <PButton
                                        label="Publish"
                                        icon={<IconPublish />}
                                        handler={handlePublish}
                                        disabled={!plagValid || !appUser?._id}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                {
                                    !appUser?._id && <NewPostLoginWarning />
                                }
                                <Grid item xs={12} sm={6}>
                                    <SourcesPanel
                                        sourceInspectorOpen={sourceInspectorOpen}
                                        sourceSearch={sourceSearch}
                                        handleSourceSearchChange={handleSourceSearchChange}
                                        sourcesSortedFiltered={sourcesSortedFiltered}
                                        handleSourceClick={handleSourceClick}
                                        selectedSource={selectedSource}
                                        handleSourceInspectorClose={handleSourceInspectorClose}
                                        handleSourceInspectorInsert={handleSourceInspectorInsert}
                                        handleClearSourceSearch={handleClearSourceSearch}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <EditPanel />
                                </Grid>
                                <Grid item xs={12}>
                                    <PreviewPanel />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </StyledPage>
            <LoadingDialog
                isLoading={createPostIsLoading}
            />
        </StyledMain>
    )
};

NewPost.propTypes = {
    appUser: PropTypes.objectOf(PropTypes.any),
    refreshAppUser: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
};


export default NewPost;
