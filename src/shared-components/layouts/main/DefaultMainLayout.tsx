import React from 'react';

type DefaultMainLayoutProps = {
    children: React.ReactNode;
};

const defaultMainLayout = ({ children }: DefaultMainLayoutProps): JSX.Element => {
    return (
        <>
            <main className="mainContainer">
                <div className="w-full">{children}</div>
            </main>
            <style jsx>{`
                .mainContainer {
                    min-height: calc(100vh - 13.3125rem);
                    @apply flex items-center justify-center py-10 px-5;
                }
            `}</style>
        </>
    );
};

export default defaultMainLayout;
