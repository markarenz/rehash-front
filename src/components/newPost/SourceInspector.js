import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Avatar,
} from "@material-ui/core";
import { Close as IconClose } from '@material-ui/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../config';

const SrcInspContent = styled(CardContent)`
  font-size:20px;
  line-height:1.3;
`;

const sourceSpanSelectedStyle = `
      background-color: #ffcc00;
      color:#222;
      padding: 5px;
`;
const SourceSpan = styled.div`
    display:inline;
    line-height: 1.8;
    position:relative;
    color: #444;
    cursor: pointer;
    transition: 0.2s all ease-out;
    padding: 5px 0;
    transition: .25s all ease-out;
    &:hover{
      background-color: ${colors.yellow};
    }
    ${props => props.idx === props.selectedLine && sourceSpanSelectedStyle}
`;
const SourceInspectorCard = styled(Card)`
    width:100%;
    position:relative;
`;
const SourceClose = styled(IconButton)`
    &.MuiButtonBase-root{
        position:absolute;
        right:5px;
        top:5px;
        border:1px solid #bbb;
        color: white;
    }
`;
const SourceCardHeader = styled(CardHeader)`
    .MuiCardHeader-title{
        font-size:24px;
        line-height:1.1;
    }
`;

const SourceInspector = ({ source, isOpen, handleClose, insertSnippet }) => {
    const [selectedLine, setSelectedLine] = React.useState(-1);
    React.useEffect(() => {
        setSelectedLine(-1);
    }, [isOpen]);
    if (!source.title) {
        return null;
    }
    const handleSelectSpan = (idx) => {
        insertSnippet(idx);
        setSelectedLine(idx);
    };
    // const handleInsert = () => {
    //     insertSnippet(selectedLine);
    // };
    return (
        <SourceInspectorCard>
            <SourceClose onClick={handleClose} variant="outlined">
                <IconClose />
            </SourceClose>
            <SourceCardHeader
                className="cardHeaderWithClose"
                title={`"${source.title}" by ${source.author}`}
                avatar={<Avatar
                    aria-label={source.author}
                    src={`/images/authors/${source.author_img}`}
                />}
            />
            <SrcInspContent>
                <div>
                    {
                        source.lines.map((line, idx) => {
                            return <React.Fragment key={idx}>
                                <SourceSpan
                                    selectedLine={selectedLine}
                                    id={idx}
                                    onClick={() => handleSelectSpan(idx)}
                                >
                                    {line.t}
                                </SourceSpan>
                                <span>{" "}</span>
                                {
                                    line.nl > 0 && <br />
                                }
                                {
                                    line.nl > 1 && <br />
                                }
                            </React.Fragment>
                        })
                    }
                </div>
            </SrcInspContent>
        </SourceInspectorCard>
    )
};

SourceInspector.propTypes = {
    source: PropTypes.objectOf(PropTypes.any),
    handleClose: PropTypes.func.isRequired,
    insertSnippet: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default SourceInspector;
