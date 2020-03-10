import React, {useEffect, useRef} from 'react';
import SearchInput from './components/SearchInput';
import PopupList from './components/PopupList';
import './index.css';
import SearchBoxActions from './actions/index';
import {connect} from 'react-redux';

function App({closePopupList}) {
    const refContainer = useRef();
    useEffect(addClickOutsideListener, []);

    function handleClickOutside(e) {
        if (!refContainer.current.contains(e.target)) {
            closePopupList();
        }
    }

    function addClickOutsideListener() {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }

    return (
        <div className='search-box-container'
             ref={refContainer}>
            <h1>The Star Wars Planets</h1>
            <SearchInput/>
            <PopupList/>
        </div>
    );
}

const mapDispatchToProps = {
    closePopupList: SearchBoxActions.actions.closePopupList
};

App = connect(null, mapDispatchToProps)(App);

export default App;
