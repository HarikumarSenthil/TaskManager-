import React from 'react';
import Error from 'next/error';

const ErrorBoundary = (props: Record<any, any>): JSX.Element => {
    try {
        const Component = props.children;
        const renderTestObj = <Component />;
        if (renderTestObj) {
            return Component;
        }
        return <Error statusCode={500} />;
    } catch (e) {
        return <Error statusCode={500} />;
    }
};

export default ErrorBoundary;
