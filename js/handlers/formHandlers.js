import { comments } from "../commentsArray/commentsArray.js";
import { renderComments } from "../renderComment/renderComments.js";
import { fixText } from "../textFormater/fixText.js";

export let formComment = document.querySelector(".add-form-text");

let formButton = document.querySelector(".add-form-button");
let formName = document.querySelector(".add-form-name");

formButton.addEventListener("click", () => {
  let commentValue = formComment.value;
  let nameValue = formName.value;

  if (nameValue === "" || commentValue === "") {
    alert("Введите полностью данные прежде чем отправлять комментарий :)");
    return;
  }

  let comment = {};

  comment.name = fixText(nameValue);
  comment.data = new Date();
  comment.text = fixText(commentValue);
  comment.likesCounter = 0;

  comments.push(comment);

  renderComments();

  formComment.value = "";
  formName.value = "";
});
