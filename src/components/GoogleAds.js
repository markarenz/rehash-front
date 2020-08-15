import React, { Component } from 'react';

class GoogleAds extends Component {

    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <ins className='adsbygoogle'
                 style={{ display: 'block' }}
                 data-ad-client={process.env.REACT_APP_GOOGLE_ADSENSE_PUBLISHER}
                 data-ad-slot={this.props.slot}
                 data-ad-format= 'auto'
                 data-full-width-responsive="true"
            >
            </ins>
        );
    }
}

export default GoogleAds;
