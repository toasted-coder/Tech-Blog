// event handler for creating a new post
const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const body = document.querySelector("#post-body").value.trim();

  if (title && body) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/posts`);
    } else {
      alert(response.statusText);
    }
  }
};

// event handler for commenting on posts.
const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector("#comment-field").value.trim();

  console.log(window.location.pathname);

  const post_id = window.location.pathname.split("/")[2];

  if (comment) {
    const response = await fetch(`/api/comment/${post_id}`, {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/posts/${post_id}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", postFormHandler);

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
