import { comments } from "../commentsArray/commentsArray.js";
import { renderComments } from "../renderComment/renderComments.js";

export function getCommentsAPI() {
  fetch("https://wedev-api.sky.pro/api/v1/MethodGirl/comments", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      let commentsArray = data.comments;

      let convertedComments = commentsArray.map((comment) => ({
        id: comment.id,
        name: comment.author.name,
        data: new Date(comment.date),
        text: comment.text,
        isLiked: comment.isLiked,
        likesCounter: comment.likes,
      }));

      comments.length = 0;
      comments.push(...convertedComments);
      renderComments();
      console.log("Преобразованные комментарии:", convertedComments);
    });
}

export function postCommentAPI(newComment) {
  const commentForAPI = {
    name: newComment.name,
    date: new Date().toISOString(),
    text: newComment.text,
    isLiked: false,
    likes: 0,
  };

  fetch("https://wedev-api.sky.pro/api/v1/MethodGirl/comments", {
    method: "POST",
    body: JSON.stringify(commentForAPI),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Сервер ответил:", data);
      if (!data.error) {
        getCommentsAPI();
      }
      return data;
    })
    .catch((error) => {
      console.error("Ошибка при отправке:", error);
    });
}
