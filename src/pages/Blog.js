import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";

const Blog = () => {
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 py-4">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Men</li>
                  <li>Women</li>
                  <li>Kids</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                <BlogCard />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                <BlogCard />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                <BlogCard />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                <BlogCard />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
