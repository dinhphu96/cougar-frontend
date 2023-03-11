import { createSelector } from '@reduxjs/toolkit';

export const productItems = (state) => state.ShopOrder.productItems;
export const categoriesSelector = (state) => state.filters.categories;
export const availabilitySelector = (state) => state.filters.availability;
export const priceFromSelector = (state) => state.filters.priceFrom;
export const priceToSelector = (state) => state.filters.priceTo;
export const productTagsSelector = (state) => state.filters.productTags;
export const colorList = (state) => state.filters.options.filter((todo) =>
    todo.variation.name === 'color'
);
export const sizeList = (state) => state.filters.options.filter((todo) =>
    todo.variation.name === 'size'
);
export const colorSelector = (state) => state.filters.color;
export const sizeSelector = (state) => state.filters.size;

export const getFilterSelector = createSelector(
    productItems,
    categoriesSelector,
    availabilitySelector,
    priceFromSelector,
    priceToSelector,
    productTagsSelector,
    colorSelector,
    sizeSelector,
    (prI, categories, availability, priceF, priceT, tag, color, size) => {

        return prI.filter((todo) => {
            let name = todo.product.subcategory.category.name;
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
                                ? availability.includes(inStock) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name) &&
                                size.includes(todo.size)
                                : availability.includes(inStock) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                tag.includes(todo.product.subcategory.name)

                            : size.length
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
                                todo.color === color
                        : color === ''
                            ? size.length
                                ? availability.includes(inStock) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                size.includes(todo.size)
                                : availability.includes(inStock) &&
                                todo.price >= priceF &&
                                todo.price <= priceT
                            : size.length
                                ? availability.includes(inStock) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color &&
                                size.includes(todo.size)
                                : availability.includes(inStock) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color

                    : tag.length
                        ? color === ''
                            ? size.length
                                ? tag.includes(todo.product.subcategory.name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                size.includes(todo.size)
                                : tag.includes(todo.product.subcategory.name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT
                            : size.length
                                ? tag.includes(todo.product.subcategory.name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color &&
                                size.includes(todo.size)
                                : tag.includes(todo.product.subcategory.name) &&
                                todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color
                        : color === ''
                            ? size.length
                                ? todo.price >= priceF &&
                                todo.price <= priceT &&
                                size.includes(todo.size)
                                : todo.price >= priceF &&
                                todo.price <= priceT
                            : size.length
                                ? todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color &&
                                size.includes(todo.size)
                                : todo.price >= priceF &&
                                todo.price <= priceT &&
                                todo.color === color
            }
            return availability.length
                ? tag.length
                    ? color === ''
                        ? size.length
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
                            tag.includes(todo.product.subcategory.name)
                        : size.length
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
                            todo.color === color
                    : color === ''
                        ? size.length
                            ? availability.includes(inStock) &&
                            categories.includes(name) &&
                            todo.price >= priceF &&
                            todo.price <= priceT &&
                            size.includes(todo.size)
                            : availability.includes(inStock) &&
                            categories.includes(name) &&
                            todo.price >= priceF &&
                            todo.price <= priceT
                        : size.length
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
                            todo.color === color
                :
                tag.length
                    ? color === ''
                        ? size.length
                            ? categories.includes(name) &&
                            todo.price >= priceF &&
                            todo.price <= priceT &&
                            tag.includes(todo.product.subcategory.name) &&
                            size.includes(todo.size)
                            : categories.includes(name) &&
                            todo.price >= priceF &&
                            todo.price <= priceT &&
                            tag.includes(todo.product.subcategory.name)
                        : size.length
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
                            todo.color === color
                    : color === ''
                        ? size.length
                            ? categories.includes(name) &&
                            todo.price >= priceF &&
                            todo.price <= priceT &&
                            size.includes(todo.size)
                            : categories.includes(name) &&
                            todo.price >= priceF &&
                            todo.price <= priceT
                        : size.length
                            ? categories.includes(name) &&
                            todo.price >= priceF &&
                            todo.price <= priceT &&
                            todo.color === color &&
                            size.includes(todo.size)
                            : categories.includes(name) &&
                            todo.price >= priceF &&
                            todo.price <= priceT &&
                            todo.color === color;
        })
    })
