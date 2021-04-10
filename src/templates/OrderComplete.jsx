import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../components/UIkit";
import { push } from "connected-react-router";

const OrderComplete = () => {
  const dispatch = useDispatch();

  const goBackToTopPage = useCallback(() => {
    dispatch(push("/"))
  }, []);

  return (
    <div className="c-section-container">
      <h2>ご注文ありがとうございました！</h2>
      <div className="module-spacer--medium" />
      <PrimaryButton label={"ショッピングを続ける"} onClick={goBackToTopPage} />
    </div>
  )
};

export default OrderComplete;
