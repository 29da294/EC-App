import React from "react";
import { Divider } from "@material-ui/core";
import { TextDetail } from "../UIkit";
import { OrderedProducts } from "./index";

//日付変換に対しては 『0スライス』➡︎ "00" + .slice(-2) を行うと良い
const dateTimeToString = (date) => {
  return date.getFullYear() + "-"
    +("00" + (date.getMonth()+1)).slice(-2) + "-"
    +("00" + date.getDate()).slice(-2) + " "
    +("00" + date.getHours()).slice(-2) + ":"
    +("00" + date.getMinutes()).slice(-2) + ":"
    +("00" + date.getSeconds()).slice(-2)
}

const dateToString = (date) => {
  return date.getFullYear() + "-"
    +("00" +(date.getMonth()+1)).slice(-2) + "-"
    +("00" + date.getDate()).slice(-2)
}

const OrderHistoryItem = (props) => {
  const order = props.order;
  const orderedDateTime = dateTimeToString(props.order.updated_at.toDate());
  const products = props.order.products;
  const price = "¥" + order.amount.toLocaleString();
  const shippingDate = dateToString(props.order.shipping_date.toDate());

  return (
    <div>
      <TextDetail label={"注文ID"} value={order.id} />
      <TextDetail label={"注文日時"} value={orderedDateTime} />
      <TextDetail label={"発送予定日"} value={shippingDate} />
      <TextDetail label={"注文金額"} value={price} />
      {products.length > 0 && (
        <OrderedProducts products={products} />
      )}
      <div className="module-spacer--extra-small" />
      <Divider />
    </div>
  );
};

export default OrderHistoryItem;
