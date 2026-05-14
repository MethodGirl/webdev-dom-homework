import { comments } from "../commentsArray/commentsArray.js";
import { addLikeHandlers } from "../handlers/addLikeHandlers.js";
import { addCopyCommentToFormHandlers } from "../handlers/addCopyCommentToFormHandlers.js";
import { getFormattedDate } from "../getFormattedDate/getFormattedDate.js"

export function renderComments() {
  let commentsBox = document.querySelector(".comments");
  let commentElements = comments
    .map((comment, index) => {
      return `<li class="comment" data-id=${index}>
                <div class="comment-header">
                  <div class="comment-header__name">${comment.name}</div>
                  <div class="comment-header__date">${getFormattedDate(comment.data)}</div>
                </div>
                <div class="comment-body">
                  <div class="comment-text">${comment.text}</div>
                </div>
                <div class="comment-footer">
                  <div class="likes">
                    <span class="likes-counter" >${comment.likesCounter}</span>
                    <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index=${index}></button>
                  </div>
                </div>
              </li>`;
    })
    .join("");

  commentsBox.innerHTML = commentElements;
  addCopyCommentToFormHandlers();
  addLikeHandlers();
}
