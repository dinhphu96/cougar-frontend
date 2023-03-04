import React from "react";

function CheckOutItem(props) {
    const { item } = props;

  const size  = item.size;
  const color = item.color;
  const name = item.productItem.product.name;
  const quantity = item.qty;
  const total = item.total;
  const image = item.productItem.image;

  return (
    <>
      <div className="border-bottom" style={{ paddingTop: "1.5rem" }}>
        <div className="d-flex gap-10 mb-2 align-align-items-center">
          <div className="w-75 d-flex gap-10">
            <div className="w-25 position-relative">
              <span
                style={{ top: "-10px", right: "2px" }}
                className="badge bg-info text-white rounded-circle p-2 position-absolute"
              >
                {quantity}
              </span>
              <img
                className="img-fluid"
                src={`https://res.cloudinary.com/dmjh7imwd/image/upload/${image}`}
                alt="product"
              />
            </div>
            <div>
              <h5 className="total-price">{name}</h5>
              <p className="total-price">{`${size} / #${color}`}</p>
            </div>
          </div>
          <div className="flex-grow-1">
            <h5 className="total">$ {total}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOutItem;
