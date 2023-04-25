import { createSelector } from '@reduxjs/toolkit';

export const productItems = (state) => state.ShopOrder.productItems;
export const listProductItems = (state) => state.filters.productItems;
export const categoriesSelector = (state) => state.filters.categories;
export const availabilitySelector = (state) => state.filters.availability;
export const priceFromSelector = (state) => state.filters.priceFrom;
export const priceToSelector = (state) => state.filters.priceTo;
export const productTagsSelector = (state) => state.filters.productTags;
export const colorSelector = (state) => state.filters.color;
export const sizeSelector = (state) => state.filters.size;
export const headerSelector = (state) => state.filters.categoryHeader;
export const productTagChooseSelector = (state) => state.filters.productTagChoose;
export const searchSelector = (state) => state.filters.search;

export const colorList = (state) => state.filters.options.filter((todo) =>
    todo.variation.name === 'Color'
);
export const sizeList = (state) => state.filters.options.filter((todo) =>
    todo.variation.name === 'Size'
);
export const categoriesList = (state) => state.filters.categoriesDefault;
export const subCategoriesList = (state) => state.filters.subCategories;

export const getFilterSelector = createSelector(
    productItems,
    categoriesSelector,
    availabilitySelector,
    priceFromSelector,
    priceToSelector,
    productTagsSelector,
    colorSelector,
    sizeSelector,
    searchSelector,
    (prI, categories, availability, priceF, priceT, tag, color, size, search) => {
        const searchRegex = new RegExp(search, 'i');
        return prI.filter((todo) => {
            let name = todo.product.subcategory.category.name;
            let productName = todo.product.name;
            let inStock = '';
            if (todo.qtyInStock === 0) {
                inStock = 'outStock';
            } else {
                inStock = 'inStock';
            }

            if (categories.length === 0) {
                return availability.length
                    ? tag.length
                        ? color === ''
                            ? size.length
                                ? search === ''
                                    ? availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    tag.includes(todo.product.subcategory.name) &&
                                    size.includes(todo.size)
                                    : availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    tag.includes(todo.product.subcategory.name) &&
                                    size.includes(todo.size) &&
                                    searchRegex.test(productName)
                                : search === ''
                                    ? availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    tag.includes(todo.product.subcategory.name)
                                    : availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    tag.includes(todo.product.subcategory.name) &&
                                    searchRegex.test(productName)
                            : size.length
                                ? search === ''
                                    ? availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    tag.includes(todo.product.subcategory.name) &&
                                    todo.color === color &&
                                    size.includes(todo.size)
                                    : availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    tag.includes(todo.product.subcategory.name) &&
                                    todo.color === color &&
                                    size.includes(todo.size) &&
                                    searchRegex.test(productName)
                                : size.length
                                    ? availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    tag.includes(todo.product.subcategory.name) &&
                                    todo.color === color
                                    : availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    tag.includes(todo.product.subcategory.name) &&
                                    todo.color === color &&
                                    searchRegex.test(productName)
                        : color === ''
                            ? size.length
                                ? search === ''
                                    ? availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    size.includes(todo.size)
                                    : availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    size.includes(todo.size) &&
                                    searchRegex.test(productName)
                                : search === ''
                                    ? availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT
                                    : availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    searchRegex.test(productName)
                            : size.length
                                ? search === ''
                                    ? availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color &&
                                    size.includes(todo.size)
                                    : availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color &&
                                    size.includes(todo.size) &&
                                    searchRegex.test(productName)
                                : search === ''
                                    ? availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color
                                    : availability.includes(inStock) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color &&
                                    searchRegex.test(productName)
                    : tag.length
                        ? color === ''
                            ? size.length
                                ? search === ''
                                    ? tag.includes(todo.product.subcategory.name) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    size.includes(todo.size)
                                    : tag.includes(todo.product.subcategory.name) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    size.includes(todo.size) &&
                                    searchRegex.test(productName)
                                : search === ''
                                    ? tag.includes(todo.product.subcategory.name) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT
                                    : tag.includes(todo.product.subcategory.name) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    searchRegex.test(productName)
                            : size.length
                                ? search === ''
                                    ? tag.includes(todo.product.subcategory.name) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color &&
                                    size.includes(todo.size)
                                    : tag.includes(todo.product.subcategory.name) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color &&
                                    size.includes(todo.size) &&
                                    searchRegex.test(productName)
                                : search === ''
                                    ? tag.includes(todo.product.subcategory.name) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color
                                    : tag.includes(todo.product.subcategory.name) &&
                                    todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color &&
                                    searchRegex.test(productName)
                        : color === ''
                            ? size.length
                                ? search === ''
                                    ? todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    size.includes(todo.size)
                                    : todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    size.includes(todo.size) &&
                                    searchRegex.test(productName)
                                : search === ''
                                    ? todo.price >= priceF &&
                                    todo.price <= priceT
                                    : todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    searchRegex.test(productName)
                            : size.length
                                ? search === ''
                                    ? todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color &&
                                    size.includes(todo.size)
                                    : todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color &&
                                    size.includes(todo.size) &&
                                    searchRegex.test(productName)
                                : search === ''
                                    ? todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color
                                    : todo.price >= priceF &&
                                    todo.price <= priceT &&
                                    todo.color === color &&
                                    searchRegex.test(productName)
            }
            return availability.length
                ? tag.length
                    ? color === ''
                        ? size.length
                            ? search === ''
                                ? availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                size.includes(todo.size)
                                : availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                size.includes(todo.size) &&
                                searchRegex.test(productName)
                            : search === ''
                                ? availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name)
                                : availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                searchRegex.test(productName)
                        : size.length
                            ? search === ''
                                ? availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                todo.color === color &&
                                size.includes(todo.size)
                                : availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                todo.color === color &&
                                size.includes(todo.size) &&
                                searchRegex.test(productName)
                            : search === ''
                                ? availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                todo.color === color
                                : availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                todo.color === color &&
                                searchRegex.test(productName)
                    : color === ''
                        ? size.length
                            ? search === ''
                                ? availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                size.includes(todo.size)
                                : availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                size.includes(todo.size) &&
                                searchRegex.test(productName)
                            : search === ''
                                ? availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT
                                : availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                searchRegex.test(productName)
                        : size.length
                            ? search === ''
                                ? availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color &&
                                size.includes(todo.size)
                                : availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color &&
                                size.includes(todo.size) &&
                                searchRegex.test(productName)
                            : search === ''
                                ? availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color
                                : availability.includes(inStock) &&
                                categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color &&
                                searchRegex.test(productName)
                : tag.length
                    ? color === ''
                        ? size.length
                            ? search === ''
                                ? categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                size.includes(todo.size)
                                : categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                size.includes(todo.size) &&
                                searchRegex.test(productName)
                            : search === ''
                                ? categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name)
                                : categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                searchRegex.test(productName)
                        : size.length
                            ? search === ''
                                ? categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                todo.color === color &&
                                size.includes(todo.size)
                                : categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                todo.color === color &&
                                size.includes(todo.size) &&
                                searchRegex.test(productName)
                            : search === ''
                                ? categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                todo.color === color
                                : categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                todo.color === color &&
                                searchRegex.test(productName)
                    : color === ''
                        ? size.length
                            ? search === ''
                                ? categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                size.includes(todo.size)
                                : categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                size.includes(todo.size) &&
                                searchRegex.test(productName)
                            : search === ''
                                ? categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT
                                : categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                searchRegex.test(productName)
                        : size.length
                            ? search === ''
                                ? categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color &&
                                size.includes(todo.size)
                                : categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color &&
                                size.includes(todo.size) &&
                                searchRegex.test(productName)
                            : search === ''
                                ? categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color
                                : categories.includes(name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color &&
                                searchRegex.test(productName);
        })
    })
