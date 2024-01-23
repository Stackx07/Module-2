// app.js
const form = document.getElementById("user-form");
const usernameInput = document.getElementById("username");
const userDataDiv = document.getElementById("user-data");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();

  if (!username) {
    alert("Please enter a GitHub username.");
    return;
  }

  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResponse.json();

    if (userResponse.status === 404) {
      userDataDiv.innerHTML = "<p>User not found.</p>";
      return;
    }

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    const reposData = await reposResponse.json();

    const followersResponse = await fetch(`https://api.github.com/users/${username}/followers`);
    const followersData = await followersResponse.json();

    const followingResponse = await fetch(`https://api.github.com/users/${username}/following`);
    const followingData = await followingResponse.json();

    userDataDiv.innerHTML = `
      <h2>${userData.name || userData.login}</h2>
      <p>Public repositories: ${userData.public_repos}</p>
      <p>Followers: ${followersData.length}</p>
      <p>Following: ${followingData.length}</p>
      <h3>Repositories:</h3>
      <ul id="repos"></ul>
    `;

    const reposUl = document.getElementById("repos");
    reposData.forEach((repo) => {
      const repoLi = document.createElement("li");
      repoLi.textContent = repo.name;
      reposUl.appendChild(repoLi);
    });
  } catch (error) {
    userDataDiv.innerHTML = "<p>Error fetching user data.</p>";
  }
});