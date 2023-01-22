import React from "react";
import markupTranslate from "../../utils/markupTranslate";
import "./MarkupBox.css";

function MarkupBox(props) {
  let html = markupTranslate(props.markup);
  return (
    <div
      className="markup-box"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    ></div>
  );
}

export default MarkupBox;
