import React  from 'react';
import { AppBar, Toolbar } from "@material-ui/core";
import { LogoH } from '../index';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakPoints, colorsByRole, colors, noSelect} from '../../config';
import { twitter_url } from "../../common/constants";
import { useAuth0 } from "../../react-auth0-spa";

const headerBorderColors = {
    "/": colorsByRole.feed,
    "/search": colorsByRole.search,
    "/new": colorsByRole.new,
    "/alerts": colorsByRole.alerts,
    "/profile": colorsByRole.profile,
};
const StyledAppBar = styled(AppBar)`
    box-shadow: 0 4px 30px rgba(0,0,0,.4)!important;
`;
const StyledToolbar = styled(Toolbar)`
        padding:0 30px;
        background-color: ${colorsByRole.header};
        border-bottom:10px solid ${props => headerBorderColors[props.currentpage]};
        @media (max-width: ${breakPoints.header}px) {
            padding:0;
            flex-direction: column;
        }
`;
const ButtonWrap = styled.div`
        flex: 1;
        display: flex;
        height:80px;
        justify-content: flex-end;
        @media (max-width: ${breakPoints.header}px) {
            flex: 0;
        }
    `;
// background-color: ${colors.black};
const buttonActive = `
        &:after{
            left:0;
            width:100%;
        }
`;
const mmButtonStyled = `
        height:100%;
        background-color: red;
        width:80px;
        cursor: pointer;
        margin-left:30px;
        position:relative;
        position:relative;
        &:after{
            content: ' ';
            display:block;
            width: 0%;
            height:10px;
            position:absolute;
            bottom:-10px;
            left: 50%;
            background-color: white;
            transition: .2s all ease-out;        
        }
        @media (max-width: ${breakPoints.header}px) {
            margin-left:0;
            width: calc(100vw / 6);
        }
`;
const MmButtonTwitter = styled.a`
    ${mmButtonStyled}
    background-color: ${colorsByRole.twitter};
`;
const MmButtonNoLink = styled.div`
    ${mmButtonStyled}
    ${props => props.menuPage === props.currentpage && buttonActive}
`;
const MmButton = styled(Link)`
    ${mmButtonStyled}
    ${props => props.to === props.currentpage && buttonActive}
`;
const MmBtnImgWrap = styled.div`
    overflow-x:hidden;
    overflow-y:hidden;
    width:80px;
    height:100%;
    position:absolute;
    top:0;left:0;
    @media (max-width: ${breakPoints.header}px) {
    width:100%;
    }
`;
const MmBtnImg = styled.img`
    ${noSelect}
    position:absolute;
    transform: scale(1) rotate(0deg);
    transition: 0.3s transform ease-out;
    &:hover{
        transform: scale(1.25) rotate(-5deg);
    }
`;
const MmBtnImgFeed = styled(MmBtnImg)`
    top:-20px;
    left:-20px;
    width:120px;
    height:120px;
    transform-origin: 50% 50%;
`;
const MmBtnImgMessages = styled(MmBtnImg)`
    top:-5px;
    left:5px;
    width:110px;
    height:110px;
    transform-origin: 20% 60%;
`;
const MmBtnImgNew = styled(MmBtnImg)`
    top:6px;
    left:-6px;
    width:90px;
    height:90px;
    transform-origin: 90% 10%;
`;
const MmBtnImgAlerts = styled(MmBtnImg)`
    top:-22px;
    left:0px;
    width:100px;
    height:100px;
    transform-origin: 30% 100%;
`;
const MmBtnImgTwitter = styled(MmBtnImg)`
    top:10px;
    left:-25px;
    width:100px;
    height:100px;
    transform-origin: 80% 50%;
`;
const MmBtnImgProfile = styled(MmBtnImg)`
    top:0;
    left:0;
    width:80px;
    height:80px;
    transform-origin: 50% 50%;
`;
const MmBtnImgLogin = styled(MmBtnImg)`
    top:-14px;
    left:-12px;
    width:110px;
    height:110px;
    transform-origin: 50% 50%;
`;

const MmButtonFeed = styled(MmButton)`
    background-color: ${colorsByRole.feed};
`;
const MmButtonMessages = styled(MmButton)`
    background-color: ${colorsByRole.messages};
`;
const MmButtonNew = styled(MmButton)`
    background-color: ${colorsByRole.new};
`;
const MmButtonAlerts = styled(MmButton)`
    background-color: ${colorsByRole.alerts};
`;
const MmButtonProfileNoLink = styled(MmButtonNoLink)`
    background-color: ${colorsByRole.profile};
`;
const MmButtonProfile = styled(MmButton)`
    background-color: ${colorsByRole.profile};
`;
const WDNNSBadge = styled.div`
    position: absolute;
    top:-1px;
    right:-8px;
    width:26px;
    height:26px;
    border-radius:50%;
    background-color: ${colors.red};
    display:flex;
    color: white;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border:2px solid white;
    pointer-events: none;
`;


const Header = ({ currentPage, appUser, getUnreadAlerts, unreadAlerts, unreadMessages, getUnreadMessages }) => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const [isLogoAnimating, setIsLogoAnimating] = React.useState(true);
    React.useEffect(() => {
        setIsLogoAnimating(true);
        // check on alerts
        getUnreadAlerts();
        getUnreadMessages();
        const timer = setTimeout(() => {
            setIsLogoAnimating(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, [currentPage]); // eslint-disable-line
    const numUnreadAlerts = unreadAlerts && unreadAlerts.getUnreadAlerts && unreadAlerts.getUnreadAlerts.numUnreadAlerts;
    const numUnreadMessages = unreadMessages && unreadMessages.getUnreadMessages && unreadMessages.getUnreadMessages.numUnreadMessages;
    return (
      <StyledAppBar>
          <StyledToolbar
              currentpage={currentPage}
          >
              <Link to="/">
                  <LogoH
                      isLogoAnimating={isLogoAnimating}
                  />
              </Link>
              <ButtonWrap>
                  <MmButtonFeed
                      to="/"
                      currentpage={currentPage}
                  >
                      <MmBtnImgWrap>
                          <MmBtnImgFeed src="/images/mm-btn-feed.svg" alt="Feed" />
                      </MmBtnImgWrap>
                  </MmButtonFeed>

                  <MmButtonNew
                      to="/new"
                      currentpage={currentPage}
                  >
                      <MmBtnImgWrap>
                          <MmBtnImgNew src="/images/mm-btn-new.svg" alt="New" />
                      </MmBtnImgWrap>
                  </MmButtonNew>

                  {
                      isAuthenticated &&
                      <MmButtonMessages
                          to="/messages"
                          currentpage={currentPage}
                      >
                          <MmBtnImgWrap>
                              <MmBtnImgMessages src={`/images/mm-btn-mailbox-${numUnreadMessages > 0 ? 'full' : 'empty'}.svg`} alt="Messages" />
                          </MmBtnImgWrap>
                          {
                              numUnreadMessages > 0 &&
                              <WDNNSBadge>
                                  <span>
                                      {numUnreadMessages > 9 ? `9+` : numUnreadMessages}
                                  </span>
                              </WDNNSBadge>
                          }
                      </MmButtonMessages>
                  }

                  {
                      isAuthenticated &&
                      <MmButtonAlerts
                          to="/alerts"
                          currentpage={currentPage}
                      >
                          <MmBtnImgWrap>
                              <MmBtnImgAlerts src="/images/mm-btn-alerts.svg" alt="Alerts" />
                          </MmBtnImgWrap>
                          {
                              numUnreadAlerts > 0 &&
                              <WDNNSBadge>
                                  <span>
                                      {numUnreadAlerts > 9 ? `9+` : numUnreadAlerts}
                                  </span>
                              </WDNNSBadge>
                          }

                      </MmButtonAlerts>
                  }

                  {
                      user ?
                          <MmButtonProfile
                              to="/profile"
                              currentpage={currentPage}
                          >
                              <MmBtnImgWrap>
                                  <MmBtnImgProfile
                                      src={appUser.avatar}
                                      alt={appUser.nickname}
                                  />
                              </MmBtnImgWrap>
                          </MmButtonProfile>
                          :
                          <MmButtonProfileNoLink
                              to="/login"
                              currentpage={currentPage}
                              onClick={() => loginWithRedirect({})}
                          >
                              <MmBtnImgWrap>
                                  <MmBtnImgLogin src="/images/mm-btn-login.svg" alt="Login" />
                              </MmBtnImgWrap>
                          </MmButtonProfileNoLink>
                  }

                  <MmButtonTwitter
                      href={twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      currentpage={currentPage}
                  >
                      <MmBtnImgWrap>
                          <MmBtnImgTwitter src="/images/mm-btn-tw.svg" alt="Twitter" />
                      </MmBtnImgWrap>
                  </MmButtonTwitter>

              </ButtonWrap>
          </StyledToolbar>
      </StyledAppBar>
  )
};

Header.propTypes = {
    currentPage: PropTypes.string.isRequired,
    appUser: PropTypes.objectOf(PropTypes.any),
    getUnreadAlerts: PropTypes.func,
    unreadAlerts: PropTypes.objectOf(PropTypes.any),
};

export default Header;
