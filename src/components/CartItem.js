import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import {
  updateOrderDetail,
  deleteOrderDetaiById,
} from "../store/shop_order/api";
import { getPrISelector } from "../store/product/selectors";
import { useSelector } from "react-redux/es/exports";

function CartItem(props) {
  const { item } = props;
  const dispatch = useDispatch();

  var size  = "size";
  var color = "color";
  
  const listProductItems = useSelector(getPrISelector);
  listProductItems.forEach(proI=>{
    if(proI.id === item.productItem.id){
      color = proI.color;
      size = proI.size;
    }
  })

  
  const name = item.productItem.product.name;
  const quantity = item.qty;
  const price = item.price;
  const total = item.total;
  const image = item.productItem.image;

  const [quaty, setQuanty] = useState(quantity);

  const handleChangeQuty = (e) => {
    setQuanty(+e.target.value);

    const { total, color, size, ...newItem } = item;
    newItem.qty = +e.target.value;

    dispatch(updateOrderDetail(newItem));
  };


  const handleDelete = () => {
    dispatch(deleteOrderDetaiById(item.id));
   };

  return (
    <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
      <div className="cart-col-1 gap-15 d-flex align-items-center">
        <div className="w-25 bg-white">
          <img
            src={`https://res.cloudinary.com/dmjh7imwd/image/upload/${image}`}
            className="img-fluid"
            alt="product image1"
          />
        </div>
        <div className="w-75">
          <p>{name}</p>
          <p>Size: {size}</p>
          <p>Color: {color}</p>
        </div>
      </div>
      <div className="cart-col-2">
        <h5 className="price">${price}</h5>
      </div>
      <div className="cart-col-3 d-flex align-items-center gap-15">
        <div>
          <input
            className="form-control"
            type="number"
            name=""
            value={quaty}
            onChange={handleChangeQuty}
            min={1}
            max={10}
            id=""
          />
        </div>
        <Link to={""}>
          <AiFillDelete onClick={handleDelete} className="text-danger fs-3" />
        </Link>
      </div>
      <div className="cart-col-4">
        <h5 className="price">${total}</h5>
      </div>
    </div>
  );
}

export default CartItem;
