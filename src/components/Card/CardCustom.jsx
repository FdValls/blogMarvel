import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

export default function RecipeReviewCardCustom(props) {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    props.onDelete(props.id);
  };

  const handleEdit = () => {
    const dataCard = {
      id: props.id,
      image: props.data.image,
      title: props.data.title,
      username: props.data.username,
      text: props.data.text,
    };
    navigate("/create", { state: { editCard: true, cardData: dataCard } });
  };

  return (
    <>
      <Card
        style={{
          background:
            "linear-gradient(to bottom, black, #333, #666, #999, #ccc, white)",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {props.data.title.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.data.title}
          titleTypographyProps={{ style: { color: "white" } }}
          subheaderTypographyProps={{ style: { color: "white" } }}
        />
        <CardMedia
          component="img"
          height="250"
          image={props.data.image}
          alt="image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.data.text}
          </Typography>
        </CardContent>
        <div >
          <CardActions style={{ flexDirection: "row", border: "2px solid black", borderRadius: "25px", justifyContent: "space-around" }} disableSpacing>
            <IconButton onClick={handleDeleteClick} aria-label="delete item">
              <DeleteForeverIcon style={{ color: "red" }} />
            </IconButton>
            <IconButton onClick={handleEdit} aria-label="share">
              <EditIcon style={{ color: "blue" }} />
            </IconButton>
          </CardActions>
        </div>
      </Card>
    </>
  );
}
