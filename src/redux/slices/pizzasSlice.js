import {createAsyncThunk, createSlice, isAllOf} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
        const {order, sortBy, category} = params
        const {data} = await axios.get(
            `https://63c8e85d320a0c4c953cd10d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
        )
        return data;
    }
)

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = 'error';
                state.items = [];
            })
    }
})

export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;