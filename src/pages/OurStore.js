import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";

import {
  availabilitySelector,
  categoriesList,
  categoriesSelector,
  colorList,
  headerSelector,
  listProductItems,
  productTagChooseSelector,
  productTagsSelector,
  sizeList,
  sizeSelector,
  subCategoriesList,
} from "../store/filtersStore/filtersSelector";

import product05 from "../images/product/product-05.png";
import product06 from "../images/product/product-06.png";

import { useSelector, useDispatch } from "react-redux";
import filtersSlice from "../store/filtersStore/filtersSlice";
import { getFilterSelector } from "../store/filtersStore/filtersSelector";
import { getColorAndSize, getCategories } from "../store/filtersStore/api";
import { useEffect } from "react";

const OurStore = () => {
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterAvailability, setFilterAvailability] = useState([]);
  const [filterPriceFrom, setFilterPriceFrom] = useState(0);
  const [filterPriceTo, setFilterPriceTo] = useState(9999);
  const [filterColor, setFilterColor] = useState("");
  const [page, setPage] = useState(1);
  const [filterSize, setFilterSize] = useState([]);

  const dispatch = useDispatch();

  const listProductItem = useSelector(getFilterSelector);
  const listProductItemsDefault = useSelector(listProductItems);
  const categories = useSelector(categoriesList);
  const listCheckedCategories = useSelector(categoriesSelector);
  const listCheckedSize = useSelector(sizeSelector);
  const listCheckedInStock = useSelector(availabilitySelector);
  const listSubCategories = useSelector(subCategoriesList);
  const listCheckedProductTag = useSelector(productTagsSelector);
  const productTagChoose = useSelector(productTagChooseSelector);

  const listSubCate = [];
  listSubCategories.map((subCate) => {
    return listSubCate.includes(subCate.name)
      ? ""
      : listSubCate.push(subCate.name);
  });
  // list color of product
  const list = [];
  const headerCategories = useSelector(headerSelector);
  useSelector(colorList).map((todo) => {
    return list.includes(todo.value) ? "" : list.push(todo.value);
  });

  const temp = useSelector(listProductItems);
  const result = temp.reduce((acc, sizeItem) => {
    const size = sizeItem.size;
    const index = acc.findIndex((obj) => obj.size === size);
    if (index !== -1) {
      acc[index].count++;
    } else {
      acc.push({ size, count: 1 });
    }
    return acc;
  }, []);
  // length paginationSize
  const paginationSize = (listProductItem.length / 9).toFixed();

  var countInStock = 0;
  var countOutStock = 0;
  listProductItemsDefault.map((todo) => {
    todo.productItem.product.qtyInStock != 0 ? countInStock++ : countOutStock++;
  });

  const handleFiltersGender = (gender) => {
    setPage(1);
    dispatch(filtersSlice.actions.pageChange(1));
    setFilterCategory(gender.target.value);
    dispatch(filtersSlice.actions.genderFilterChange(gender.target.value));
    dispatch(filtersSlice.actions.categoryHeaderChange(""));
  };

  const handleFilersAvailability = (value) => {
    setPage(1);
    dispatch(filtersSlice.actions.pageChange(1));
    setFilterAvailability(value.target.value);
    dispatch(filtersSlice.actions.availabilityFilterChange(value.target.value));
  };

  const handleFiltersPriceFrom = (price) => {
    setPage(1);
    dispatch(filtersSlice.actions.pageChange(1));
    setFilterPriceFrom(price.target.value);
    dispatch(filtersSlice.actions.priceFromFilterChange(price.target.value));
  };

  const handleFiltersPriceTo = (price) => {
    setFilterPriceTo(price.target.value);
    setPage(1);
    dispatch(filtersSlice.actions.pageChange(1));
    dispatch(filtersSlice.actions.priceToFilterChange(price.target.value));
  };

  const handleFilersProductTags = (tag) => {
    setPage(1);
    dispatch(filtersSlice.actions.pageChange(1));
    dispatch(filtersSlice.actions.productTagsFilterChange(tag.target.value));
  };
  const handleFiltersColor = (c) => {
    setPage(1);
    dispatch(filtersSlice.actions.pageChange(1));
    setFilterColor(c.target.id);
    dispatch(filtersSlice.actions.colorFilterClick(c.target.id));
  };

  const handleFiltersSize = (s) => {
    setPage(1);
    dispatch(filtersSlice.actions.pageChange(1));
    setFilterSize(s.target.value);
    dispatch(filtersSlice.actions.sizeFilterChange(s.target.value));
  };

  //pagination
  const handlePage = (page) => {
    setPage(parseInt(page.target.id) + 0);
    dispatch(filtersSlice.actions.pageChange(parseInt(page.target.id) + 0));
  };

  const handlePrev = () => {
    if (page != 1) {
      setPage(page - 1);
      dispatch(filtersSlice.actions.pageChange(page - 1));
    }
  };

  const handleNext = () => {
    if (page < paginationSize) {
      setPage(page + 1);
      dispatch(filtersSlice.actions.pageChange(page + 1));
    }
  };

  useEffect(() => {
    dispatch(getColorAndSize());
    dispatch(getCategories());
    // Availability
    if (categories.length) {
      if (headerCategories === "") {
        categories.map((cate) => {
          const found = listCheckedCategories.find((s) => s === cate.name);
          if (!found) {
            setFilterCategory(cate.name);
            dispatch(filtersSlice.actions.genderFilterChange(cate.name));
          }
        });
      } else {
        categories.map((cate) => {
          const found = listCheckedCategories.find((s) => s === cate.name);
          if (cate.name === headerCategories) {
            if (!found) {
              setFilterCategory(cate.name);
              dispatch(filtersSlice.actions.genderFilterChange(cate.name));
            }
          } else {
            if (found) {
              setFilterCategory(cate.name);
              dispatch(filtersSlice.actions.genderFilterChange(cate.name));
            }
          }
        });
      }
    }

    // inStock
    const foundIn = listCheckedInStock.find((s) => s === "inStock");
    const foundOut = listCheckedInStock.find((s) => s === "outStock");
    if (!foundIn) {
      setFilterAvailability("inStock");
      dispatch(filtersSlice.actions.availabilityFilterChange("inStock"));
    }
    if (!foundOut) {
      setFilterAvailability("outStock");
      dispatch(filtersSlice.actions.availabilityFilterChange("outStock"));
    }
    // price From
    setFilterPriceFrom(0);
    dispatch(filtersSlice.actions.priceFromFilterChange(0));
    // price To
    setFilterPriceTo(9999);
    dispatch(filtersSlice.actions.priceToFilterChange(9999));
    // color
    setFilterColor("");
    dispatch(filtersSlice.actions.colorFilterClick(""));
    // size
    if (result.length) {
      result.map((s) => {
        const found = listCheckedSize.find((size) => size === s.size);
        if (!found) {
          setFilterSize(s.size);
          dispatch(filtersSlice.actions.sizeFilterChange(s.size));
        }
      });
    }
    // productTag
    if (productTagChoose === "") {
      if (listSubCate.length) {
        listSubCate.map((subCate) => {
          const found = listCheckedProductTag.find((tag) => tag === subCate);
          if (!found) {
            dispatch(filtersSlice.actions.productTagsFilterChange(subCate));
          }
        });
      }
    } else {
      if (listSubCate.length) {
        listSubCate.map((subCate) => {
          const found = listCheckedProductTag.find((tag) => tag === subCate);
          if (productTagChoose === subCate) {
            if (!found) {
              dispatch(filtersSlice.actions.productTagsFilterChange(subCate));
            }
          } else {
            if (found) {
              dispatch(filtersSlice.actions.productTagsFilterChange(subCate));
            }
          }
        });
      }
    }

    // page
    setPage(1);
    dispatch(filtersSlice.actions.pageChange(1));
  }, [
    dispatch,
    headerCategories,
    categories.length > 0,
    result.length > 0,
    listSubCate.length > 0,
    productTagChoose,
  ]);

  const [grid, setGrid] = useState(4);

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  {categories.map((cate) => (
                    <li key={cate.id}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={cate.name}
                          id=""
                          onChange={handleFiltersGender}
                          checked={
                            listCheckedCategories.find(
                              (todo) => todo === cate.name
                            )
                              ? "checked"
                              : ""
                          }
                        />
                        <label className="form-check-label" htmlFor="">
                          {cate.name} (
                          {
                            listProductItemsDefault.filter((value) =>
                              value.productItem.product.subcategory.category
                                .name === cate.name
                                ? value
                                : ""
                            ).length
                          }
                          )
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Availability</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="inStock"
                      id=""
                      onChange={handleFilersAvailability}
                      checked={
                        listCheckedInStock.find((todo) => todo === "inStock")
                          ? "checked"
                          : ""
                      }
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock ({countInStock})
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="outStock"
                      id=""
                      onChange={handleFilersAvailability}
                      checked={
                        listCheckedInStock.find((todo) => todo === "outStock")
                          ? "checked"
                          : ""
                      }
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock ({countOutStock})
                    </label>
                  </div>
                </div>
                <h5 className="sub-title">
                  Price : {filterPriceFrom} - {filterPriceTo} $
                </h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      min={0}
                      placeholder="From"
                      value={filterPriceFrom}
                      onChange={handleFiltersPriceFrom}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      min={filterPriceFrom}
                      value={filterPriceTo}
                      onChange={handleFiltersPriceTo}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                <h5 className="sub-title">Colors</h5>
                <div>
                  <ul className="colors ps-0">
                    <button
                      className="btn btn-warning py-0"
                      style={{ height: "20px", textAlign: "center" }}
                      id={""}
                      onClick={handleFiltersColor}
                    >
                      All
                    </button>
                    {list.map((color, index) => (
                      <li
                        key={index}
                        style={{ backgroundColor: `${color}`, color: "black" }}
                        id={color}
                        onClick={handleFiltersColor}
                      ></li>
                    ))}
                  </ul>
                </div>
                <h5 className="sub-title">Size</h5>
                <div>
                  {result.map((todo, index) => (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={todo.size}
                        id="color-1"
                        onChange={handleFiltersSize}
                        checked={
                          listCheckedSize.find((s) => s === todo.size)
                            ? "checked"
                            : ""
                        }
                      />
                      <label className="form-check-label" htmlFor="color-1">
                        {todo.size} ({todo.count})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Categories</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {listSubCate.map((subCate, index) => (
                    <span key={index}>
                      <button
                        className={
                          listCheckedProductTag.find((tag) => tag === subCate)
                            ? "badge bg-warning text-secondary rounded-3 py-2 px-3 btn btn-warning"
                            : "badge bg-light text-secondary rounded-3 py-2 px-3 btn"
                        }
                        value={subCate}
                        onClick={handleFilersProductTags}
                      >
                        {subCate}
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Random Product</h3>
              <div>
                <div className="random-products mb-3 d-flex">
                  <div className="w-50">
                    <img src={product05} className="img-fluid" alt="watch" />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div>
                <div className="random-products d-flex">
                  <div className="w-50">
                    <img src={product06} className="img-fluid" alt="watch" />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10"></div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">
                    {listProductItem.length} Products
                  </p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                {listProductItem.map((prI, index) =>
                  index < 9 * page && index >= 9 * (page - 1) ? (
                    <ProductCard key={prI.id} productItem={prI} grid={grid} />
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
            <div className="">
              <nav className="pagination-outer" aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item" onClick={handlePrev}>
                    <a href="#" className="page-link" aria-label="Previous">
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  {listProductItem.map((prI, index) =>
                    paginationSize > 4 ? (
                      page <= paginationSize - 4 ? (
                        index < 4 ? (
                          index + 1 === page ? (
                            <li
                              key={page + index}
                              className="page-item active"
                              onClick={handlePage}
                            >
                              <a
                                id={page + index}
                                className="page-link"
                                href="#"
                              >
                                {page + index}
                              </a>
                            </li>
                          ) : (
                            <li
                              key={page + index}
                              className="page-item"
                              onClick={handlePage}
                            >
                              <a
                                id={page + index}
                                className="page-link"
                                href="#"
                              >
                                {page + index}
                              </a>
                            </li>
                          )
                        ) : (
                          ""
                        )
                      ) : index < 4 ? (
                        index + 1 === page ? (
                          <li
                            key={index + (paginationSize + 1 - 4)}
                            className="page-item active"
                            onClick={handlePage}
                          >
                            <a
                              id={index + (paginationSize + 1 - 4)}
                              className="page-link"
                              href="#"
                            >
                              {index + (paginationSize + 1 - 4)}
                            </a>
                          </li>
                        ) : (
                          <li
                            key={index + (paginationSize + 1 - 4)}
                            className="page-item"
                            onClick={handlePage}
                          >
                            <a
                              id={index + (paginationSize + 1 - 4)}
                              className="page-link"
                              href="#"
                            >
                              {index + (paginationSize + 1 - 4)}
                            </a>
                          </li>
                        )
                      ) : (
                        ""
                      )
                    ) : index < paginationSize ? (
                      index + 1 === page ? (
                        <li
                          key={index + 1}
                          className="page-item active"
                          onClick={handlePage}
                        >
                          <a id={index + 1} className="page-link" href="#">
                            {index + 1}
                          </a>
                        </li>
                      ) : (
                        <li
                          key={index + 1}
                          className="page-item"
                          onClick={handlePage}
                        >
                          <a id={index + 1} className="page-link" href="#">
                            {index + 1}
                          </a>
                        </li>
                      )
                    ) : (
                      ""
                    )
                  )}
                  <li className="page-item" onClick={handleNext}>
                    <a href="#" className="page-link" aria-label="Next">
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
