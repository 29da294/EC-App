import React, { useState } from "react";
import Swiper from "react-id-swiper";
import NoImage from "../../assets/img/src/no_image.png";
import "swiper/css/swiper.css"

// ＊useState() ➡︎   const [count, setCount] = useState(0);で初期値「0」をセットする 「setState」のHookバージョンである   ➡︎ ★今回はSwiperの設定を{}でオブジェクト型で定義して、初期設定＝設定内容として[params]に詰め込むことで、独自に設定したSwiperの表示内容を適用するために、useState({設定内容})を使っている
//type: "bullets" 画面下部の点  clickable: true, 画面下部の点をクリックで画面が切り替わる  dynamicBullets: true 表示している画像の点は大きく表示 表示してないものの点は小さくするnextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" 前次への表示の矢印の表示  loop: true 画像の切り替えがループする

const ImageSwiper = (props) => {
  const [params] = useState({
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    loop: true
  })

  //{...params}で上記で設定した値の内容たちを展開して適用している
  const images = props.images;

  return (
    <Swiper {...params} >
      {images.lenth === 0 ? (
        <div className="p-media__thumb">
          <img src={NoImage} alt="No Images" />
        </div>
      ) : (
          images.map(image => (
            <div className="p-media__thumb" key={image.id}>
              <img src={image.path} alt="Product Informations" />
            </div>
          ))
        )}
    </Swiper>
  );
};

export default ImageSwiper;
