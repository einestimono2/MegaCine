import React from "react";
import ListMovie from "../../components/Movie/ListMovie";
import CreateMovie from "../../components/Movie/CreateMovie";

export default function MoviePage(props) {
  return <div>{props.mode === "list" ? <ListMovie /> : <CreateMovie />}</div>;
}
