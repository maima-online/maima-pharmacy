import * as React from "react";
import {
  Card,
  Box,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  styled,
  IconButton,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../../redux/cart.slice";
import { useDispatch, useSelector } from "../../redux/store";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cart.slice";

const CustomButton = styled(Box)({
  minWidth: 20,
  width: 32,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "4px",
  padding: 0,
  color: "#fff",
  boxShadow: "none",
  cursor: "pointer",
  background: "rgba(38, 81, 163) 0% 0% no-repeat padding-box",
  "&:hover": {
    backgroundColor: "rgba(38, 81, 163, 0.6)",
  },
});
interface Cards {
  card: {
    name: string;
    text: string;
    amount: string;
    image: string;
  };
}
export default function AntibacterialDrugCard({ card }: Cards) {
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        bgcolor: "#A8C5D7",
        width: 260,
        boxShadow: "5px 5px 14px 0 #f3f7ff",
        borderRadius: "5px",
        // boxShadow: "0px 5.77273px 5.77273px rgba(0, 0, 0, 0.25)",
        // borderRadius: "11.5455px",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={card.image}
          alt="antibacterial drug"
          sx={{ height: 250, p: "4.5rem .8rem .8rem" }}
        />
      </CardActionArea>
      <CardActions
        sx={{
          bgcolor: "#C0E8F9",
          color: "#4A91BF",
          width: "100%",
          textAlign: "center",
          // p: "20px 0",
          p: ".8rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#4A91BF",
            width: "100%",
            font: "normal normal 500 14px/18px Roboto, sans-serif",
            textAlign: "left",
          }}
        >
          {card.text}
          <span
            style={{
              display: "block",
              textAlign: "center",
              margin: "8px 0 15px",
              fontWeight: "bold",
            }}
          >
            {card.amount}
          </span>
        </Typography>
        <Box
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            p: "0 .8rem",
          }}
        >
          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              // justifyContent: "space-between",
            }}
          >
            {/* <CustomButton
              // onClick={() => dispatch(decrementQuantity(item.id))}
              sx={{ p: "0 1px" }}
            >
              <RemoveIcon sx={{ fontSize: 18 }} />
            </CustomButton>
            <Box
              component="span"
              sx={{
                width: 20,
                font: "normal normal 500 20px/18px Roboto, sans-serif",
                m: 1,
                textAlign: "center",
              }}
            >
              1
            </Box>
            <CustomButton
            // onClick={() => dispatch(incrementQuantity(item.id))}
            >
              <AddIcon sx={{ fontSize: 18 }} />
            </CustomButton> */}
          </Box>
          {/* <CustomButton
          // disableElevation
          // onClick={() => dispatch(addToCart(data))}
          // loading={loading}
          >
            <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />
          </CustomButton> */}
        </Box>
      </CardActions>
    </Card>
  );
}
