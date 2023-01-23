import {createAsyncThunk, createSlice, isAllOf, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";
import {ICartItem} from "./cartSlice";

type FetchPizzaArgs = {
    order: string;
    sortBy: string;
    category: string;
}

type PizzaItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: PizzaItem[];
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaArgs>('pizzas/fetchPizzasStatus',
    async (params: FetchPizzaArgs,  thunkAPI) => {
        const {order, sortBy, category} = params
        const {data} = await axios.get<ICartItem[]>(
            `https://63c8e85d320a0c4c953cd10d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
        )
        return data;
    }
)

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.items = [];
            })
    }
})

export const selectPizzaData = (state: RootState) => state.pizzas;

export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;