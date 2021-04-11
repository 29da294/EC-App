import React from "react";

const Footer = () => {
  return (
    <footer>
      <ul className="l-footer">
        <a className="u-text__link-none" href="https://29da294.github.io/MyPage/" target="_blank" rel="noreferrer noopener" >
          <li className="opacity-hover">運営会社(HPリンク)</li>
        </a>
        <a className="u-text__link-none">
          <li>利用規約</li>
        </a>
        <a className="u-text__link-none">
          <li>プライバシーポリシー</li>
        </a>
      </ul>
      <div className="module-spacer--extra-extra-small" />
      <ul className="l-footer">
        <a className="u-text__link-none" >
          <small>Copyright &copy; 2021 29DA All Rights Reserved</small>
        </a>
      </ul>
    </footer>
  )
};

export default Footer;
