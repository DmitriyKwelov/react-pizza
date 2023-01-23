import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type ISort = {
    name: 'популярности (DESC)' | 'популярности (ASC)' | 'цене (DESC)' | 'цене (ASC)' | 'алфавиту (DESC)' | 'алфавиту (ASC)';
    sortProperty: 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title';
}

interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    sort: ISort;
}

const initialState = {
    searchValue: '',
    categoryId: 0,
    sort: {
        name: 'популярности (DESC)',
        sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId =  action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue =  action.payload;
        },
        setSort(state, action: PayloadAction<ISort>) {
            state.sort =  action.payload;
        },
        setFilters(state, action: PayloadAction<{categoryId: number, sort: any}>) {
            state.sort =  action.payload.sort;
            state.categoryId =  Number(action.payload.categoryId);
        },

    },
})

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;