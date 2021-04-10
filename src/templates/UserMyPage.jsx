import React, { useCallback } from "react";
import { getUserName } from "../reducks/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import { SecondaryButton, TextDetail } from "../components/UIkit";
import { push } from "connected-react-router";
import transitions from "@material-ui/core/styles/transitions";


const UserMyPage = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const username = getUserName(selector);

  //path onClick={}されたページの宛先
  const transition = useCallback((path) => {
    dispatch(push(path))
  }, []);

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center" >マイページ</h2>
      <div className="module-spacer--medium" />
      <TextDetail label={"ユーザー名"} value={username} />
      <div className="module-spacer--small" />
      <div className="center">
        <SecondaryButton label={"注文履歴を確認する"} onClick={() =>
          transition("/order/history")} />
      </div>
    </section>
  );
};

export default UserMyPage;
