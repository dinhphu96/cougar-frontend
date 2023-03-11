import { createSlice } from "@reduxjs/toolkit";
import { getColorAndSize } from './api';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        categories: [],
        availability: [],
        priceFrom: 0,
        priceTo: 100000,
        color: '',
        size: [],
        productTags: [],
        options: [],
        status: '',
        error: '',
    },
    reducers: {
        genderFilterChange: (state, action) => {
            const currentTodo = state.categories.find(todo => todo === action.payload)

            if (currentTodo) {
                state.categories = state.categories.filter(todo => todo !== action.payload)
            } else {
                state.categories.push(action.payload)
            }
        },
        availabilityFilterChange: (state, action) => {
            const currentTodo = state.availability.find(todo => todo === action.payload)

            if (currentTodo) {
                state.availability = state.availability.filter(todo => todo !== action.payload)
            } else {
                state.availability.push(action.payload)
            }
        },
        priceFromFilterChange: (state, action) => {
            state.priceFrom = action.payload;
        },
        priceToFilterChange: (state, action) => {
            state.priceTo = action.payload;
        },
        productTagsFilterChange: (state, action) => {
            const currentTodo = state.productTags.find(todo => todo === action.payload)

            if (currentTodo) {
                state.productTags = state.productTags.filter(todo => todo !== action.payload)
            } else {
                state.productTags.push(action.payload)
            }
        },
        colorFilterClick: (state, action) => {
            state.color = action.payload;
        },
        sizeFilterChange: (state,action) =>{
            const currentTodo = state.size.find(todo => todo === action.payload)

            if (currentTodo) {
                state.size = state.size.filter(todo => todo !== action.payload)
            } else {
                state.size.push(action.payload)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getColorAndSize.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getColorAndSize.fulfilled, (state, action) => {
                state.options = action.payload;
                state.status = 'success';
            })
    }
});

export default filtersSlice;