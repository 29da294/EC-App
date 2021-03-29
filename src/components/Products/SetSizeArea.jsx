import React, { useCallback, useState, useMemo } from "react";
import { TextInput } from "../UIkit"
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  checkIcon: {
    float: "right"
  },
  iconCell: {
    height: 48,
    width: 48
  }
})

const SetSizeArea = (props) => {
  const classes = useStyles();

  const
    [index, setIndex] = useState(0),
    [size, setSize] = useState(""),
    [quantity, setQuantity] = useState(0);

  //onChangeイベントの変更された値を、setSizeへ渡している ➡︎ 変更された値は、同じ<TextInput>の value={size}で受け取って表示させている
  const inputSize = useCallback((event) => {
    setSize(event.target.value)
  }, [setSize]);

  const inputQuantity = useCallback((event) => {
    setQuantity(event.target.value)
  }, [setQuantity])

  //画面上で選択したサイズ、数量の修正(編集している）項目ところのロジック
  //prevState ➡︎ 更新前のStateのこと
  //(index === props.size.length) ➡︎ 既存の列に新しく列を追加して、新しいデータにindexナンバーをふるためのロジック 現時点での登録されているデータの総列数がindexに入っている ➡︎新規登録するデータを、登録するときのロジック だから、setIndex(index + 1)で、どんどん新しいindexのナンバーを生成している
  //よって、elseの方の分岐ロジックには、『既に Sサイズ 数量10 など、既に登録されているデータを修正する＝editSize関数を実行した時の列を追加するのではなく、既存の列を修正する場合のロジック』
  const addSize = (index, size, quantity) => {
    if (size === "" || quantity === 0) {
      return false
    } else {
      if (index === props.sizes.length) {
        props.setSizes(prevState => [...prevState, { size: size, quantity: quantity }])
        setIndex(index + 1)
        setSize("")
        setQuantity(0)
      } else {
        const newSizes = props.sizes
        newSizes[index] = { size: size, quantity: quantity }
        props.setSizes(newSizes)
        setIndex(newSizes.length)
        setSize("")
        setQuantity(0)
      }
    }
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  }

  //データ自体を削除しているのではなく、引数（deleteIndex）で削除対象のindexナンバーを取得して、それ以外のindexナンバーをfilter（）メソッドで抽出して、削除対象以外のデータをnewSizes定数に詰め込んで、画面に表示、反映させるロジックにしている
  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((item, i) => i !== deleteIndex);
    props.setSizes(newSizes);
  }

  const memoIndex = useMemo(() => {
  setIndex(props.sizes.length)
}, [props.sizes.length])

//「i」= mapで回している「indexの数字（順番目）」のこと
return (
  <div>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>サイズ</TableCell>
            <TableCell>数量</TableCell>
            <TableCell className={classes.iconCell} />
            <TableCell className={classes.iconCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.sizes.length > 0 &&
          (props.sizes.map((item, i) => (
            <TableRow key={item.size}>
              <TableCell>{item.size}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <IconButton className={classes.iconCell} onClick={() => editSize(i, item.size, item.quantity)} >
                  <EditIcon/>
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton className={classes.iconCell} onClick={() => deleteSize(i)} >
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
      <div>
        <TextInput
          fullWidth={false} label={"サイズ"} multiline={false} requires={true} onChange={inputSize} rows={1} value={size} type={"text"}
        />
        <TextInput
          fullWidth={false} label={"数量"} multiline={false} requires={true} onChange={inputQuantity} rows={1} value={quantity} type={"number"}
        />
      </div>
      {/* onChangeイベント ➡︎ addSizeで編集した値を決定するクリックを押した時 */}
      <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)} >
        <CheckCircleIcon/>
      </IconButton>
    </TableContainer>
  </div>
  )
}

export default SetSizeArea;
