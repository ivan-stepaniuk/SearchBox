class SearchBoxActions {
    static GET_PLANETS = 'GET_PLANETS';
    static PLANETS_RECEIVED = 'PLANETS_RECEIVED';
    static CLOSE_POPUP_LIST = 'CLOSE_POPUP_LIST';
    static SET_SELECTED_ITEM = 'SET_SELECTED_ITEM';

    static actions = {
        getPlanets(inputText) {
            return {
                type: SearchBoxActions.GET_PLANETS,
                payload: inputText
            }
        },

        closePopupList() {
            return {
                type: SearchBoxActions.CLOSE_POPUP_LIST,
            }
        },

        setSelectedItem(selectedItem) {
            return {
                type: SearchBoxActions.SET_SELECTED_ITEM,
                payload: selectedItem
            }
        }
    }
}

export default SearchBoxActions;