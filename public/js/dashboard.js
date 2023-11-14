const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.getElementById('post-title').value.trim()
  const content = document.getElementById('post-content').value.trim()

  if (title && content) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('./dashboard')
    } else {
      alert('Failed to create Post')
    }
  }
};

const deleteButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    
    const response = await fetch(`api/post/${id}`,{
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete Post')
    }
  }
}

document
  .querySelector('.new-blog-post-form')
  .addEventListener('submit', newFormHandler);

const deleteButtons = document.querySelectorAll('.your-posts .delete-post');
deleteButtons.forEach(button => button.addEventListener('click', deleteButtonHandler));
