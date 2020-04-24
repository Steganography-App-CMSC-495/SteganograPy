import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
    objectFit: "fill",
  },
}));

export default function ImagePreview(props) {
  const { loading, file } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {loading ? (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      ) : (
        <CardMedia className={classes.media} image={file} title="upload" />
      )}
    </Card>
  );
}
