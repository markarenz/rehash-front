import React, {useState} from 'react';
import {
    Card,
    Grid,
    IconButton,
    CardContent,
} from "@material-ui/core";
import {
    Headline2,
    SearchInput,
    SourceInspector,
} from "../../components";
import styled from "styled-components";
import {
    ChevronLeft as IconPrev,
    ChevronRight as IconNext,
} from "@material-ui/icons";

const SourceButtonWrap = styled.div`
  cursor: pointer;
  transition: 0.2s all ease-out;
  transform: scale(1.0);
  &:hover{
    transform: scale(1.1);
  }
  cursor: pointer;  
  height:100%;
`;
const StyledIconButtonOutlined = styled(IconButton)`
    border: 1px solid white!important;
`;
const iconStyle = `color: white!important;`;
const StyledIconNext = styled(IconNext)`${iconStyle}`;
const StyledIconPrev = styled(IconPrev)`${iconStyle}`;
const SourceCard = styled(Card)`
    height:100%;
`;
const SourceGrid = styled(Grid)`
    height:100%;
    margin:0!important;
`;
const SourceGridLeft = styled(Grid)`
    background-image: url('/images/authors/${props => props.avatar}');
    background-repeat:no-repeat;
    background-position:center;
    background-size:cover;
`;
const SourceGridRight = styled(Grid)`
    min-height: 120px;
    display: flex;
    align-items: center;
`;
const SourceTextWrap = styled.div`
    padding:20px;
`;

const SourcesPanel = ({
                          sourceInspectorOpen,
                          sourceSearch,
                          handleSourceSearchChange,
                          sourcesSortedFiltered,
                          handleSourceClick,
                          selectedSource,
                          handleSourceInspectorClose,
                          handleSourceInspectorInsert,
                          handleClearSourceSearch,
                      }) => {

    const sourceItemsPerPage = 6;
    const [sourcePage, setSourcePage] = useState(0);
    const handleSourcePageNav = (dir) => {
      setSourcePage(sourcePage + dir);
    };
    const handleClearSearchInput = () => {
        setSourcePage(0);
        handleClearSourceSearch();
    }
    const handleSearchInputChange = (e) => {
        setSourcePage(0);
        handleSourceSearchChange(e);
    }
    // sourcesSortedFiltered.length;
    const sourcesSliceStart = sourcePage * sourceItemsPerPage;
    const sourcesSliceEnd = sourcesSliceStart + sourceItemsPerPage;
    const sourcesPaginated = sourcesSortedFiltered.slice(sourcesSliceStart, sourcesSliceEnd);
    const sourceNavPrevDisabled = (sourcePage < 1);
    const sourceNavNextDisabled = (sourcesSliceEnd > sourcesSortedFiltered.length);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Headline2 title="Sources"/>
                { !sourceInspectorOpen &&
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={9}>
                        <SearchInput
                            sourceSearch={sourceSearch}
                            handleSourceSearchChange={handleSearchInputChange}
                            handleClearSourceSearch={handleClearSearchInput}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} align="center">
                        <div className="vCenter">
                            <StyledIconButtonOutlined
                                onClick={() => handleSourcePageNav(-1)}
                                disabled={sourceNavPrevDisabled}
                                className={sourceNavPrevDisabled ? 'iconDisabled' : 'default'}
                                style={{ marginRight: 10 }}
                            >
                                <StyledIconPrev/>
                            </StyledIconButtonOutlined>

                            <StyledIconButtonOutlined
                                onClick={() => handleSourcePageNav(1)}
                                disabled={sourceNavNextDisabled}
                                className={sourceNavNextDisabled ? 'iconDisabled' : 'default'}
                            >
                                <StyledIconNext/>
                            </StyledIconButtonOutlined>
                        </div>
                    </Grid>
                </Grid>
                }
            </Grid>
            {
                !sourceInspectorOpen && sourcesPaginated.length === 0 && <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card style={{ marginTop: 20 }}>
                            <CardContent>
                                <h2>
                                    No more snippets. Change your search or navigate back.
                                </h2>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            }
            { !sourceInspectorOpen && sourcesPaginated.map((source, idx) =>
                <Grid item xs={12} sm={6} key={idx}>
                    <SourceButtonWrap>
                        <SourceCard
                            onClick={() => handleSourceClick(source.id)}
                        >
                            <SourceGrid container spacing={0}>
                                <SourceGridLeft item xs={4} avatar={source.author_img}/>
                                <SourceGridRight item xs={8} align="center">
                                    <SourceTextWrap>
                                        "{source.title}" by {source.author}
                                        {source.section_title}
                                    </SourceTextWrap>
                                </SourceGridRight>
                            </SourceGrid>
                        </SourceCard>
                    </SourceButtonWrap>
                </Grid>)
            }
            {
                sourceInspectorOpen &&
                <SourceInspector
                    source={selectedSource}
                    isOpen={sourceInspectorOpen}
                    handleClose={handleSourceInspectorClose}
                    insertSnippet={handleSourceInspectorInsert}
                />
            }
        </Grid>
    );
};

export default SourcesPanel;
