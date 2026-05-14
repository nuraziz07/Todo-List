import React from 'react';

const Skeleton = () => {
    return (
        <div className={'grid grid-cols-2 gap-4 mt-5'}>
            <div className="skeleton-row">
                <div className="skeleton-box" />
                <div className="skeleton-text" />
            </div>
            <div className="skeleton-row">
                <div className="skeleton-box" />
                <div className="skeleton-text" />
            </div>
            <div className="skeleton-row">
                <div className="skeleton-box" />
                <div className="skeleton-text" />
            </div>
            <div className="skeleton-row">
                <div className="skeleton-box" />
                <div className="skeleton-text" />
            </div>
            <div className="skeleton-row">
                <div className="skeleton-box" />
                <div className="skeleton-text" />
            </div>
            <div className="skeleton-row">
                <div className="skeleton-box" />
                <div className="skeleton-text" />
            </div>
            <div className="skeleton-row">
                <div className="skeleton-box" />
                <div className="skeleton-text" />
            </div>
            <div className="skeleton-row">
                <div className="skeleton-box" />
                <div className="skeleton-text" />
            </div>

        </div>
    );
};

export default Skeleton;