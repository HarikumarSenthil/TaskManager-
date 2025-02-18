'use client'
import { Icon } from '@/lib/svg';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type SideBarMainLayoutProps = {
    children: React.ReactNode;
    heading: string;
    showHeader?: boolean;
    inputComplete: boolean;
};

const SideBarMainLayout = ({
    children,
    heading,
    showHeader = true,
    inputComplete,
}: SideBarMainLayoutProps): JSX.Element => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const router = useRouter();

    const goBack = (): void => {
        if (showPopup) {
            closePopup();
        }
        router.back();
    };
    const displayPopup = (): void => {
        setShowPopup(true);
    };
    const closePopup = (): void => {
        setShowPopup(false);
    };
    return (
        <>
            <main className="absolute bg-white inset-0 p-4 sm:relative mainContainer">
                <div className="w-full flex">
                    <div className="w-full sm:w-3/5">
                        {showHeader && (
                            <div className="flex align-center">
                                <a
                                    role="button"
                                    className="outline-none"
                                    tabIndex={0}
                                    onClick={inputComplete ? displayPopup : goBack}
                                    onKeyDown={inputComplete ? displayPopup : goBack}
                                >
                                    <Icon
                                        width="100%"
                                        height="100%"
                                        className="w-8 mr-6"
                                        type="arrow-left"
                                    />
                                </a>
                                <h1 className="text-lg font-bold">{heading}</h1>
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </main>
            <style jsx>{`
                .mainContainer {
                    min-height: calc(100vh - 13.3125rem);
                    @apply flex justify-center py-10 px-5;
                }
            `}</style>
        </>
    );
};

export default SideBarMainLayout;
