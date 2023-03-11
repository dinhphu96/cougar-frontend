import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";

import { colorList, sizeList } from "../store/filtersStore/filtersSelector";

import product05 from "../images/product/product-05.png";
import product06 from "../images/product/product-06.png";

// import { getPrISelector } from "../store/shop_order/selectors";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import filtersSlice from "../store/filtersStore/filtersSlice";
import { getFilterSelector } from '../store/filtersStore/filtersSelector';
import { getColorAndSize } from "../store/filtersStore/api";
import { useEffect } from "react";

const OurStore = () => {
  // const productItems = useSelector(getPrISelector);
  const productItems = useSelector(getFilterSelector);

  const dispatch = useDispatch();

  const [filterCategory, setFilterCategory] = useState([]);
  const [filterAvailability, setFilterAvailability] = useState([]);
  const [filterPriceFrom, setFilterPriceFrom] = useState(0);
  const [filterPriceTo, setFilterPriceTo] = useState(9999);
  const [filterProductTags, setFilterProductTags] = useState([]);
  const [filterColor, setFilterColor] = useState('');
  const [filterSize, setFilterSize] = useState([]);

  const handleFiltersGender = (gender) => {
    setFilterCategory(gender.target.value);
    dispatch(filtersSlice.actions.genderFilterChange(gender.target.value));
  }

  const handleFilersAvailability = (value) => {
    setFilterAvailability(value.target.value);
    dispatch(filtersSlice.actions.availabilityFilterChange(value.target.value));
  }

  const handleFiltersPriceFrom = (price) => {
    setFilterPriceFrom(price.target.value);
    dispatch(filtersSlice.actions.priceFromFilterChange(price.target.value));
  }

  const handleFiltersPriceTo = (price) => {
    setFilterPriceTo(price.target.value);
    dispatch(filtersSlice.actions.priceToFilterChange(price.target.value));
  }

  const handleFilersProductTags = (tag) => {
    if (tag.target.className === 'badge bg-light text-secondary rounded-3 py-2 px-3 btn') {
      tag.target.className = 'badge bg-warning text-secondary rounded-3 py-2 px-3 btn btn-warning';
    } else {
      tag.target.className = 'badge bg-light text-secondary rounded-3 py-2 px-3 btn';
    }
    dispatch(filtersSlice.actions.productTagsFilterChange(tag.target.value));
  }
  const handleFiltersColor = (c) => {
    setFilterColor(c.target.id);
    dispatch(filtersSlice.actions.colorFilterClick(c.target.id));
  }

  const handleFiltersSize = (s) =>{
    console.log(s.target.value);
    setFilterSize(s.target.value);
    dispatch(filtersSlice.actions.sizeFilterChange(s.target.value));  
  }

  useEffect(() => {
    dispatch(getColorAndSize());
  }, [dispatch]);
  const list = [];
  const listSizes = [];
  const listSize = useSelector(sizeList).map((todo) => {
    return listSizes.includes(todo.value) ? '' : listSizes.push(todo.value);
  });;
  const listColor = useSelector(colorList).map((todo) => {
    return list.includes(todo.value) ? '' : list.push(todo.value);
  });

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
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value='Men'
                        id=""
                        onChange={handleFiltersGender}
                      />
                      <label className="form-check-label" htmlFor="">
                        Men (1)
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value='Women'
                        id=""
                        onChange={handleFiltersGender}
                      />
                      <label className="form-check-label" htmlFor="">
                        Women (1)
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value='Kids'
                        id=""
                        onChange={handleFiltersGender}
                      />
                      <label className="form-check-label" htmlFor="">
                        Kids (1)
                      </label>
                    </div>
                  </li>
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
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="outStock"
                      id=""
                      onChange={handleFilersAvailability}
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock(0)
                    </label>
                  </div>
                </div>
                <h5 className="sub-title">Price</h5>
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
                    <button className="btn btn-warning py-0" style={{ height: '20px', textAlign: 'center' }} id={''} onClick={handleFiltersColor}>All</button>
                    {list.map((color, index) => (
                      <li key={index} style={{ backgroundColor: `${color}`, color: 'black' }} id={color} onClick={handleFiltersColor}>
                      </li>
                    ))}
                  </ul>

                </div>
                <h5 className="sub-title">Size</h5>
                <div>
                  {
                    listSizes.map((todo,index) => (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={todo}
                          id="color-1"
                          onChange={handleFiltersSize}
                        />
                        <label className="form-check-label" htmlFor="color-1">
                          {todo} (2)
                        </label>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  <span>
                    <button className="badge bg-light text-secondary rounded-3 py-2 px-3 btn"
                      value='T-Shirt'
                      onClick={handleFilersProductTags}>T-Shirt</button>
                  </span>
                  <span>
                    <button className="badge bg-light text-secondary rounded-3 py-2 px-3 btn"
                      value='Skurt'
                      onClick={handleFilersProductTags}>Skurt</button>
                  </span>
                  <span>
                    <button className="badge bg-light text-secondary rounded-3 py-2 px-3 btn"
                      value='Shirt'
                      onClick={handleFilersProductTags}>Shirt</button>
                  </span>
                  <span>
                    <button className="badge bg-light text-secondary rounded-3 py-2 px-3 btn"
                      value='Jacket'
                      onClick={handleFilersProductTags}>Jacket</button>
                  </span>
                  <span>
                    <button className="badge bg-light text-secondary rounded-3 py-2 px-3 btn"
                      value='Shoes'
                      onClick={handleFilersProductTags}>Shoes</button>
                  </span>
                  <span>
                    <button className="badge bg-light text-secondary rounded-3 py-2 px-3 btn"
                      value='Watches'
                      onClick={handleFilersProductTags}>Watches</button>
                  </span>
                  <span>
                    <button className="badge bg-light text-secondary rounded-3 py-2 px-3 btn"
                      value='Jean'
                      onClick={handleFilersProductTags}>Jean</button>
                  </span>
                  <span>
                    <button className="badge bg-light text-secondary rounded-3 py-2 px-3 btn"
                      value='short'
                      onClick={handleFilersProductTags}>Short</button>
                  </span>
                  <span>
                    <button className="badge bg-light text-secondary rounded-3 py-2 px-3 btn"
                      value='Pants'
                      onClick={handleFilersProductTags}>Pants</button>
                  </span>
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
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={"manula"}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="manual">Featured</option>
                    <option value="best-selling">Best selling</option>
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">
                      Alphabetically, Z-A
                    </option>
                    <option value="price-ascending">Price, low to high</option>
                    <option value="price-descending">Price, high to low</option>
                    <option value="created-ascending">Date, old to new</option>
                    <option value="created-descending">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">21 Products</p>
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
                {productItems.map((prI) => (
                  <ProductCard key={prI.id} productItem={prI} grid={grid} />
                ))}

              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
