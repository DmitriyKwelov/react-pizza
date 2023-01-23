import React from 'react';
import ContentLoader from "react-content-loader"

const Skeleton = () => {
    return (
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={500}
            viewBox="0 0 280 500"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="131" cy="125" r="125" />
            <rect x="0" y="270" rx="10" ry="10" width="280" height="23" />
            <rect x="0" y="318" rx="10" ry="10" width="280" height="88" />
            <rect x="0" y="427" rx="10" ry="10" width="95" height="30" />
            <rect x="125" y="417" rx="25" ry="25" width="152" height="45" />
        </ContentLoader>
    );
};

export default Skeleton;