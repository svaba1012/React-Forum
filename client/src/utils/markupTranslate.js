import showdown from "showdown";

const markupTranslate = (text) => {
  let converter = new showdown.Converter();
  return converter.makeHtml(text);
};

export default markupTranslate;
