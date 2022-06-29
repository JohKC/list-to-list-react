import { createContext, useContext, useEffect, useReducer, useState } from "react";

const actionTypes = {
    ADD_TO_SELECTED: 1,
    REMOVE_FROM_SELECTED: 2,
    FILTER_AVAILABLE: 3,
    FILTER_SELECTED: 4,
    SET_INITIAL_VALUES: 5,
};

function reducer(state, action) {
    console.log(action);
    switch (action.type) {
        case actionTypes.ADD_TO_SELECTED:
            const isPayloadAddibleToFilteredSelected = action.payload.title.toLowerCase().includes(action.payload.selectedSearch.toLowerCase()) ||
                action.payload.subtitle.toLowerCase().includes(action.payload.selectedSearch.toLowerCase());
            return {
                ...state,
                available: state.available.filter(x => x.id !== action.payload.id),
                filteredAvailable: state.filteredAvailable.filter(x => x.id !== action.payload.id),
                selected: [...state.selected, action.payload],
                filteredSelected: isPayloadAddibleToFilteredSelected ? [...state.filteredSelected, action.payload] : state
            };
        case actionTypes.REMOVE_FROM_SELECTED:
            const isPayloadAddibleToFilteredAvailable = action.payload.title.toLowerCase().includes(action.payload.availableSearch.toLowerCase()) ||
                action.payload.subtitle.toLowerCase().includes(action.payload.availableSearch.toLowerCase());
            return {
                ...state,
                selected: state.selected.filter(x => x.id !== action.payload.id),
                filteredSelected: state.filteredSelected.filter(x => x.id !== action.payload.id),
                available: [...state.available, action.payload],
                filteredAvailable: isPayloadAddibleToFilteredAvailable ? [...state.filteredAvailable, action.payload] : state
            };
        case actionTypes.FILTER_AVAILABLE:
            return {
                ...state,
                filteredAvailable: state.available.filter(x => x.title.toLowerCase().includes(action.searchString.toLowerCase()) || x.subtitle.toLowerCase().includes(action.searchString.toLowerCase()))
            }
        case actionTypes.FILTER_SELECTED:
            return {
                ...state,
                filteredSelected: state.selected.filter(x => x.title.toLowerCase().includes(action.searchString.toLowerCase()) || x.subtitle.toLowerCase().includes(action.searchString.toLowerCase()))
            }
        case actionTypes.SET_INITIAL_VALUES:
            return action.payload;
        default:
            return state;
    }
}

const ListToListContext = createContext();

export const useListToList = () => useContext(ListToListContext);

const ListToListProvider = ({ children }) => {
    const [{
        available,
        selected,
        filteredAvailable,
        filteredSelected
    }, dispatch] = useReducer(reducer, {
        available: [],
        selected: [],
        filteredAvailable: [],
        filteredSelected: []
    });
    const add = (payload) => dispatch({ type: actionTypes.ADD_TO_SELECTED, payload });
    const remove = (payload) => dispatch({ type: actionTypes.REMOVE_FROM_SELECTED, payload });
    const filterAvailable = (searchString) => dispatch({ type: actionTypes.FILTER_AVAILABLE, searchString });
    const filterSelected = (searchString) => dispatch({ type: actionTypes.FILTER_SELECTED, searchString });
    const setInitialValues = (available, selected = []) => dispatch({ type: actionTypes.SET_INITIAL_VALUES, payload: { available, selected, filteredAvailable: [], filteredSelected: [] } });

    return (
        <ListToListContext.Provider value={{
            available,
            selected,
            filteredAvailable,
            filteredSelected,
            add,
            remove,
            filterAvailable,
            filterSelected,
            setInitialValues,
        }}>
            {children}
        </ListToListContext.Provider>
    );
};

export default ListToListProvider;