import React from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width:48
  }
})

//sizes ➡︎ [SetSizeArea.jsx]size,quantity,index
//componet="th" scpoe="row" ➡︎ th見出しを横セル方向に適用
//ショッピングカートアイコンのonClickイベントに、先ほど親コンポーネントで定義したaddProducts()を設定
const SizeTable = (props) => {
  const classes = useStyles();

  const sizes = props.sizes;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 && (
            sizes.map(size => (
              <TableRow key={size.size}>
                <TableCell component="th" scope="row" >
                  {size.size}
                </TableCell>
                <TableCell>残り{size.quantity}点</TableCell>
                <TableCell className={classes.iconCell}>
                  {size.quantity > 0 ? (
                    <IconButton onClick={() => props.addProduct(size.size)} >
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                      <div>SOLD OUT</div>
                    )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => props.addFavorite(size)} >
                    <FavoriteBorderIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
