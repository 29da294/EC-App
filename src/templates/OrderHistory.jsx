import React, { useEffect } from "react";
import { fetchOrdersHistory } from "../reducks/users/operations";
import { getOrdersHistory } from "../reducks/users/selectors";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { OrderHistoryItem } from "../components/Products";


const useStyles = makeStyles((theme) => ({
  orderList: {
    background: theme.palette.grey["100"],
    margin: "0 auto",
    padding: 32,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      width: "768"
    }
  },
}));

//【処理の流れ】
// ❶useEffect()内でfetchOrdersHistory()を実行し、DB上のordersサブコレクションを取得してStoreに保存
// ❷const orders = getOrdersHistory(selector);で、Storeに保存したordersをstateとして取得
//❸ordersをmapを用いてイテレートし、<OrderHistoryItem>へ展開


const OrderHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const orders = getOrdersHistory(selector);

  useEffect(() => {
    dispatch(fetchOrdersHistory())
  }, [])

  return (
    <section className="c-section-wrapin">
      <List className={classes.orderList} >
        {orders.length > 0 && (
          orders.map(order => <OrderHistoryItem order={order} key={order.id} />)
        )}
      </List>
    </section>
  )
};

export default OrderHistory;
