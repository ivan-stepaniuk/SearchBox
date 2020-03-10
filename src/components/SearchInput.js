import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import SearchBoxActions from '../actions';
import LoadingIcon from './LoadingIcon';
import useKeyPress from './useKeyPress';


let SearchInput = ({planets = [], getPlanets, loading, closePopupList, selectedItem, showPopupList}) => {
    const [planetsInput, setPlanets] = useState('');
    const refInput = useRef();
    const escapePress = useKeyPress('Escape');
    useEffect(handleFocus, []);
    useEffect(handleItemSelect, [selectedItem]);
    useEffect(clearText, [escapePress]);

    function handleItemSelect() {
        if (!selectedItem) {
            return
        }

        setPlanets(selectedItem.name);
        closePopupList();
        handleFocus();
    }

    function updatePlanets(e) {
        const inputText = e.target.value;
        setPlanets(inputText);
        getPlanets(inputText);
    }

    function clearText() {
        setPlanets('');
        closePopupList();
        handleFocus();
    }

    function handleFocus() {
        refInput.current.focus();
    }

    return (
        <div className={`search-input-container ${planets.length && showPopupList ? 'has-results' : ''}`}>
            <input
                ref={refInput}
                placeholder="Input Here..."
                value={planetsInput}
                onChange={updatePlanets}/>
            <LoadingIcon show={loading}/>
            {planetsInput ? (<button onClick={clearText} className='clear-button'>Clear</button>) : ''}
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.loading,
    planets: state.planets,
    selectedItem: state.selectedItem,
    showPopupList: state.showPopupList
});

const mapDispatchToProps = {
    getPlanets: SearchBoxActions.actions.getPlanets,
    closePopupList: SearchBoxActions.actions.closePopupList
};

SearchInput = connect(mapStateToProps, mapDispatchToProps)(SearchInput);
export default SearchInput;