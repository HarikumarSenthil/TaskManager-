import React from 'react';

type FormLayoutProps = {
    children: React.ReactNode;
};

const formLayout = ({ children }: FormLayoutProps): JSX.Element => {
    return (
        <>
            <div className="flex w-full lg:w-8/12">
                <div className="bg-white w-full  rounded px-8 pt-6 mb-4 ">{children}</div>
            </div>
        </>
    );
};

export default formLayout;
