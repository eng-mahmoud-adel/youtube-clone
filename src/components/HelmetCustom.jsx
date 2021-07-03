import React from 'react';
import {Helmet} from 'react-helmet';

const HelmetCustom = ({ title="Youtube", description="a project made using React.js and Redux" }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:locale" content="en-US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
        </Helmet>
    )
}

export default HelmetCustom;
