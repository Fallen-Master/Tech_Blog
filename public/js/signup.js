const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById('username-signup').value.trim();
  const password = document.getElementById('password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/user/', {
      method: 'POST',
      body: JSON.stringify({username, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    console.log(response);

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
