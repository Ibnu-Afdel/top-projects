const usernameInput = document.querySelector("#username");
const searchButton = document.querySelector("#btn");
const errorDiv = document.querySelector("#error");

async function fetchData() {
  const username = usernameInput.value.trim();
  errorDiv.textContent = "";

  if (!username) {
    errorDiv.textContent = "Please enter a username.";
    return;
  }

  try {
    const responseFromGithub = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!responseFromGithub.ok) {
      errorDiv.textContent = "User not found. check the username.";
      return;
    }
    const userData = await responseFromGithub.json();

    const repositoryResponse = await fetch(userData.repos_url);
    const repos = await repositoryResponse.json();

    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    // its for around for 30 days
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events`
    );
    const events = await eventsResponse.json();
    const commitCount = events.filter(
      (event) => event.type === "PushEvent"
    ).length;

    const img = document.createElement("img");
    img.src = userData.avatar_url;
    img.alt = `${userData.name || "User"}'s Avatar`;

    const name = document.createElement("h2");
    name.textContent = userData.name || "No Name Provided";

    const bio = document.createElement("p");
    bio.textContent = userData.bio || "No Bio Provided";

    const stats = document.createElement("ul");

    const appendStat = (label, value) => {
      const li = document.createElement("li");
      li.textContent = `${label}: ${value}`;
      stats.appendChild(li);
    };

    appendStat("Public Repositories", userData.public_repos);
    appendStat("Followers", userData.followers);
    appendStat("Following", userData.following);
    appendStat("Total Stars", totalStars);
    appendStat("Commits (last 30 days)", commitCount);
    appendStat("Account Created", new Date(userData.created_at).toDateString());

    const previousData = document.querySelector("#result");
    if (previousData) previousData.remove();

    const resultContainer = document.createElement("div");
    resultContainer.id = "result";
    resultContainer.appendChild(img);
    resultContainer.appendChild(name);
    resultContainer.appendChild(bio);
    resultContainer.appendChild(stats);

    document.body.appendChild(resultContainer);
  } catch (error) {
    console.log(`Error : ${error}`);
    errorDiv.textContent =
      "Error occured while fetching data. Please try again.";
  }
}

searchButton.addEventListener("click", fetchData);
