import React from 'react';
import './loading.css'

const LoadingIcon = ({show}) => (
    show
        ? (<div className='loading-icon'>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>)
        : ''
);

export default LoadingIcon;