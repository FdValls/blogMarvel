import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import wolve from "../../assets/wolve1.jpg";
import { useState } from "react";
import { useEffect } from "react";

export default function RecipeReviewCardCustom(props) {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(props.data.image);


  useEffect(() => {
    setImageSrc(props.data.image);
  }, [props.data.image]);

  console.log("img en la cardCustom", props.data.image);
  console.log(typeof props.data.image);

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
          title={props.data.title}
          titleTypographyProps={{ style: { color: "white" } }}
          subheaderTypographyProps={{ style: { color: "white" } }}
        />
        <CardMedia
          component="img"
          height="250"
          // image={props.data.image}
          image={imageSrc}
          alt="image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.data.text}
          </Typography>
        </CardContent>
        <div>
          <CardActions
            style={{
              flexDirection: "row",
              border: "2px solid black",
              borderRadius: "25px",
              justifyContent: "space-around",
            }}
            disableSpacing
          >
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
