import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";

interface Cards {
  card: {
    name: string;
    text: string;
    amount: string;
    image: string;
  };
}
export default function AntibiotriDrugCard({ card }: Cards) {
  return (
    <Card
      sx={{
        bgcolor: "#A8C5D7",
        maxWidth: "100%",
        boxShadow: "0px 5.77273px 5.77273px rgba(0, 0, 0, 0.25)",
        borderRadius: "11.5455px",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={card.image}
          alt="antibiotic drug"
          sx={{ height: 260, p: "30px 40px 0" }}
        />
      </CardActionArea>
      <CardActions
        sx={{
          bgcolor: "#C0E8F9",
          color: "#4A91BF",
          width: "100%",
          textAlign: "center",
          p: "20px 0",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#4A91BF",
            width: "100%",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          {card.text}
          <span
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            {card.amount}
          </span>
        </Typography>
      </CardActions>
    </Card>
  );
}
