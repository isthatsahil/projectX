import React from "react";
import { makeStyles } from "@material-ui/styles";
import Login from "../../components/spotify/Login";

const useStyles = makeStyles({
  header: {
    color: "blue"
  }
});

export default function Spotify() {
  const classes = useStyles();
  return (
    <>
      <Login />
    </>
  );
}
