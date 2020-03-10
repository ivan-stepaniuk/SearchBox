import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import ListItem from '../components/ListItem';
import SearchBoxActions from '../actions';
import useKeyPress from './useKeyPress';


let PopupList = ({planets = [], searchedText, setSelectedItem, showPopupList}) => {
    const PopupListContainerRef = useRef();
    const [cursor, setCursor] = useState(0);
    const [hovered, setHovered] = useState(undefined);
    const downPress = useKeyPress('ArrowDown');
    const upPress = useKeyPress('ArrowUp');
    const enterPress = useKeyPress('Enter');
    useEffect(handleHover, [hovered]);
    useEffect(handleKeyUpPress, [upPress]);
    useEffect(handleKeyDownPress, [downPress]);
    useEffect(handleEnterPress, [enterPress]);

    function handleEnterPress() {
        if (planets.length && enterPress) {
            setSelectedItem(planets[cursor]);
        }
    }
    function handleHover() {
        if (planets.length && hovered) {
            setCursor(planets.indexOf(hovered));
        }
    }

    function handleKeyDownPress(e) {
        if (planets.length && downPress) {
            setCursor(prevState => prevState < planets.length - 1 ? prevState + 1 : prevState);
            PopupListContainerRef.current.scroll(0, PopupListContainerRef.current.scrollTop + 46);
            setHovered(undefined);
        }
    }

    function handleKeyUpPress() {
        if (planets.length && upPress) {
            setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
            PopupListContainerRef.current.scroll(0, PopupListContainerRef.current.scrollTop - 46);
            setHovered(undefined);
        }
    }

    return (
        <div className='popup-list-container' ref={PopupListContainerRef}>
            {
                showPopupList && planets.map((planet, index) => (
                    <ListItem
                        key={index}
                        active={index === cursor}
                        item={planet}
                        setSelected={setSelectedItem}
                        setHovered={setHovered}
                        searchedText={searchedText}
                    />
                ))
            }
        </div>
    )
};


const mapStateToProps = state => ({
    planets: state.planets,
    searchedText: state.searchedText,
    showPopupList: state.showPopupList,
});

const mapDispatchToProps = {
    setSelectedItem: SearchBoxActions.actions.setSelectedItem
};
PopupList = connect(mapStateToProps, mapDispatchToProps)(PopupList);

export default PopupList;