import React, {useCallback }from "react";
import IconBotton from "@material-ui/core/IconButton"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import { makeStyles } from "@material-ui/core";
//⬆︎Material Iconsのサイトからimportできる
import { storage } from "../../firebase/index";
import { ImageSharp } from "@material-ui/icons";
import { ImagePreview } from "./index";

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48
  }
})

const ImageArea = (props) => {
  const classes = useStyles();

  const deleteImage = useCallback(async (id) => {
    const ret = window.confirm("この画像を削除してもよろしいですか？")
    if (!ret) {
      return false
    } else {
      const newImages = props.images.filter(image => image.id !== id)
      props.setImages(newImages);
      return storage.ref("image").child(id).delete();
    }
  }, [props.images])

  const uploadImage = useCallback((event) => {
    const file = event.target.files;
    let blob = new Blob(file, {type: "image/jpeg"})

    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n%S.length]).join("")

    //storageの中に、ref("image")で「imageカラム」に、上記で生成したランダムなID＝『fileName』を付与した画像データを登録して、定数uploadRefにいれる
    const uploadRef = storage.ref("images").child(fileName);
    const uploadTask = uploadRef.put(blob);

// このタイミングで「Cloud Stroage」に保存完了 改めて次は、保存された画像の保存先のURLを取得 ➡︎ 生成したランダムなIDと画像を紐付けて、画像以外の商品情報が保存されている「Cloud Firestore」へ保存させる
  uploadTask.then(() => {
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      const newImage = { id: fileName, path: downloadURL };
      props.setImages((prevState => [...prevState, newImage]))
      })
    })
  }, [props.setImages])

  //「id,path」は上記の「{id:fileNamae = 生成したid path:downloadURL = 取得したCloud Storageに保管されている画像のURL} から取得している」
  return (
    <div>
      <div className="p-grid__list-images">
        {props.images.length > 0 && (props.images.map(image => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} />))}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconBotton className={classes.icon} >
          <label>
            <AddPhotoAlternateIcon />
            <input className="u-display-none" type="file" id="image" onChange={(event) => uploadImage(event)} />
          </label>
        </IconBotton>
      </div>
    </div>
  )
}

export default ImageArea;
