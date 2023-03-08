import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import Meta from "../components/Meta";
import shipping from "../untils/sevices";
import ImageSlider, { Slide } from "react-auto-image-slider";

import brand01 from "../images/brands/brand-01.png";
import brand02 from "../images/brands/brand-02.png";
import brand03 from "../images/brands/brand-03.png";
import brand04 from "../images/brands/brand-04.png";
import brand05 from "../images/brands/brand-05.png";

import famous01 from "../images/product/famous/famous-01.png";
import famous02 from "../images/product/famous/famous-02.png";
import famous03 from "../images/product/famous/famous-03.png";
import famous04 from "../images/product/famous/famous-04.png";

import catbanner01 from "../images/banner/catbanner-01.png";
import catbanner02 from "../images/banner/catbanner-02.jpg";
import catbanner03 from "../images/banner/catbanner-03.jpg";
import catbanner04 from "../images/banner/catbanner-04.jpg";

import banner01 from "../images/banner/banner-01.jpg";
import banner02 from "../images/banner/banner-02.jpg";
import banner03 from "../images/banner/banner-03.jpg";
import banner04 from "../images/banner/banner-04.png";
import banner05 from "../images/banner/banner-05.jpg";

import cate01 from "../images/categories/cate01.png";
import cate02 from "../images/categories/cate02.png";
import cate03 from "../images/categories/cate03.png";
import cate04 from "../images/categories/cate04.png";
import cate05 from "../images/categories/cate05.png";
import cate06 from "../images/categories/cate06.png";
import cate07 from "../images/categories/cate07.png";
import cate08 from "../images/categories/cate08.png";

import { useSelector } from "react-redux";
import { getProductsSelector } from "../store/shop_order/selector2";

const Home = () => {
  //cuộn trang
  useEffect(() => {
    window.scrollTo(0, 300);
  }, []);
  const listProducts = useSelector(getProductsSelector);

  return (
    <>
      <Meta title={"Cougar Shop"} />

      <Container class1="home-wrapper-1 py-4">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <ImageSlider effectDelay={2000} autoPlayDelay={2000}>
              <Slide>
                <div className="main-banner position-relative ">
                  <img
                    src={banner01}
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="main-banner-content position-absolute">
                    <h4>Vintage Womens Tops</h4>
                    <h5>Boollili Real Silk Shirt Blouse Men</h5>
                    <p>From $88.00 to $90.00</p>
                    <Link className="button">BUY NOW</Link>
                  </div>
                </div>
              </Slide>
              <Slide>
                <div className="main-banner position-relative ">
                  <img
                    src={banner02}
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="main-banner-content position-absolute">
                    <h4>Autumn Winter T Shirt Solid Warm</h4>
                    <h5>Tops Slim Men's Turtleneck Black T-shirts</h5>
                    <p>From $199.00 to $200.00</p>
                    <Link className="button">BUY NOW</Link>
                  </div>
                </div>
              </Slide>
              <Slide>
                <div className="main-banner position-relative ">
                  <img
                    src={banner03}
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="main-banner-content position-absolute">
                    <h4>Selling New Hot Fashion 2023</h4>
                    <h5>Men's Winter Duck Down Coat Long Jacket</h5>
                    <p>From $50.00 to $100.62</p>
                    <Link className="button">BUY NOW</Link>
                  </div>
                </div>
              </Slide>
              <Slide>
                <div className="main-banner position-relative">
                  <img
                    src={banner04}
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="main-banner-content position-absolute">
                    <h4>Femme Boollili Autumn Winter T Shirt</h4>
                    <h5>Cotton Tshirts Women Summer</h5>
                    <p>From $30.00 to $41.62</p>
                    <Link className="button">BUY NOW</Link>
                  </div>
                </div>
              </Slide>
              <Slide>
                <div className="main-banner position-relative">
                  <img
                    src={banner05}
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="main-banner-content position-absolute">
                    <h4>Femme Boollili Autumn Winter T Shirt</h4>
                    <h5>Cotton Tshirts Women Summer</h5>
                    <p>From $30.00 to $41.62</p>
                    <Link className="button">BUY NOW</Link>
                  </div>
                </div>
              </Slide>
            </ImageSlider>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="row gap-10">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 small-banner position-relative px-0">
                <img
                  src={catbanner01}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Bag</h4>
                  <h5>Louis Vuitton</h5>
                  <p>
                    From $999.00 <br /> to $1000.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 small-banner position-relative px-0">
                <img
                  src={catbanner02}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Uniqlo Denim Trucker Jacket</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 small-banner position-relative px-0">
                <img
                  src={catbanner03}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Croptop</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 small-banner position-relative px-0">
                <img
                  src={catbanner04}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Leather Jacket</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12">
            <div className="row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2 servies d-flex align-items-center justify-content-between">
              {shipping.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12">
            <div className="row categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex gap align-items-center">
                <div>
                  <h6>Skirt</h6>
                  <p>657 Items</p>
                </div>
                <img src={cate01} alt="cate" />
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex gap align-items-center">
                <div>
                  <h6>Jacket</h6>
                  <p>1004 Items</p>
                </div>
                <img src={cate02} alt="cate" />
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex gap align-items-center">
                <div>
                  <h6>T-Shirt</h6>
                  <p>309 Items</p>
                </div>
                <img src={cate03} alt="cate" />
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex gap align-items-center">
                <div>
                  <h6>Jeans</h6>
                  <p>453 Items</p>
                </div>
                <img src={cate04} alt="cate" />
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex gap align-items-center">
                <div>
                  <h6>Shoes</h6>
                  <p>180 Items</p>
                </div>
                <img src={cate05} alt="cate" />
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex gap align-items-center">
                <div>
                  <h6>Watch</h6>
                  <p>65 Items</p>
                </div>
                <img src={cate06} alt="cate" />
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex gap align-items-center">
                <div>
                  <h6>Hat</h6>
                  <p>671 Items</p>
                </div>
                <img src={cate07} alt="cate" />
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex gap align-items-center">
                <div>
                  <h6>Jeans</h6>
                  <p>453 Items</p>
                </div>
                <img src={cate08} alt="cate" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {listProducts.map((prI) => (
            <ProductCard key={prI.id} productItem={prI} />
          ))}
        </div>
      </Container>

      <Container class1="famous-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Famous Products</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className="famous-card position-relative">
              <img src={famous01} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5>Big Jean</h5>
                <h6>Kane Brown Trending Shirt</h6>
                <p>From $199 to $400</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className="famous-card position-relative">
              <img src={famous02} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark"> Our Fashion Passion</h5>
                <h6 className="text-dark">Runway Luxury famous</h6>
                <p className="text-dark">Cotton</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className="famous-card position-relative">
              <img src={famous03} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Watch</h5>
                <h6 className="text-dark">
                  Watch Famous Luxury Brands Elegant
                </h6>
                <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className="famous-card position-relative">
              <img src={famous04} className="img-fluid" alt="famous" />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">
                  Vest Sexy Sleeveless V-neck Pullover Tank Summer
                </h5>
                <h6 className="text-dark">
                  Top Clothes for Women's Satin T-shirt
                </h6>
                <p className="text-dark">From $699 to $500*</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="popular-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {listProducts.map((prI) => (
            <ProductCard key={prI.id} productItem={prI} />
          ))}
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src={brand01} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand02} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand03} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand04} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand05} alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="blog-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <BlogCard />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <BlogCard />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <BlogCard />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <BlogCard />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
