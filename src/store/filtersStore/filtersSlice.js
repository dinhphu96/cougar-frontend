import { createSlice } from "@reduxjs/toolkit";
import { getProductItem } from "../shop_order/api";
import { getCategories, getColorAndSize, getSubCategories } from './api';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        categories: [],
        subCategories: [],
        categoriesDefault: [],
        categoryHeader: '',
        availability: [],
        priceFrom: 0,
        priceTo: 9999,
        color: '',
        size: [],
        productTags: [],
        options: [],
        status: '',
        error: '',
        productItems: [],
        productTagChoose: '',
        search:'',
        page: 1
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
        sizeFilterChange: (state, action) => {
            const currentTodo = state.size.find(todo => todo === action.payload)

            if (currentTodo) {
                state.size = state.size.filter(todo => todo !== action.payload)
            } else {
                state.size.push(action.payload)
            }
        },
        pageChange: (state, action) => {
            state.page = action.payload;
        },
        categoryHeaderChange: (state, action) => {
            state.categoryHeader = action.payload;
        },
        productTagChooseChange: (state, action) =>{
            state.productTagChoose = action.payload;
        },
        searchChange: (state, action) =>{
            state.search = action.payload;
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
            .addCase(getCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categoriesDefault = action.payload;
                state.status = 'success';
            })
            .addCase(getSubCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSubCategories.fulfilled, (state, action) => {
                state.subCategories = action.payload;
                state.status = 'success';
            }).addCase(getProductItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProductItem.fulfilled, (state, action) => {
                state.productItems = action.payload;
                state.status = 'success';
            })
    }
});

export default filtersSlice;