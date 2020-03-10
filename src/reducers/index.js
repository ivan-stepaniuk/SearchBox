import SearchBoxActions from '../actions';

const initialState = {
    showPopupList: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SearchBoxActions.GET_PLANETS:
            return {
                ...state,
                showPopupList: true,
                loading: true
            };

        case SearchBoxActions.PLANETS_RECEIVED:
            return {
                ...state,
                loading: false,
                planets: action.planets,
                searchedText: action.searchedText,

            };

        case SearchBoxActions.CLOSE_POPUP_LIST:
            return {
                ...state,
                loading: false,
                showPopupList: false,
            };

        case SearchBoxActions.SET_SELECTED_ITEM:
            return {
                ...state,
                selectedItem: action.payload
            };

        default:
            return state;
    }
};
export default reducer;