import React from "react";
import Button from "../UI/Button";
function ButtonShowMore(props) {
  return (
    <Button
      sx={{
        backgroundColor: "transparent",
        borderRadius: "0",
        border: "1px solid #faf5f5",
      }}
    >
      Show {props.text} tweets
    </Button>
  );
}

export default ButtonShowMore;
