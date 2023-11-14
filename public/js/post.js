const postId = document.querySelector('#post-id').value;

const deletePost = async () => {
  const response = await fetch(`/api/post/${postId}`, { method: 'DELETE' });
  if (response.ok) {
    document.location.replace('/homepage');
  } else {
    alert('Failed to delete the post.');
  }
};

const deleteButton = document.querySelector('#delete-post');
if (deleteButton) {
  deleteButton.addEventListener('click', deletePost);
}

const addComment = async (event) => {
  event.preventDefault();

  const commentText = document.querySelector('#comment-text').value.trim();

  if (commentText) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({
        postId, 
        commentText
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add comment.');
    }
  }
};

const commentForm = document.querySelector('.add-comment-form');
if (commentForm) {
  commentForm.addEventListener('submit', addComment);
}
