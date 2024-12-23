const usernameInput = document.querySelector("#username");
const searchButton = document.querySelector("#btn");

async function fetchData() {
  const username = usernameInput.value;

  try {
    const responseFromGithub = await fetch(
      `https://api.github.com/users/${username}`
    );
    const userData = await responseFromGithub.json();
    console.log(userData);

    const repositoryResponse = await fetch(userData.repos_url);
    const repos = await repositoryResponse.json();

    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    // its for 30 days
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events`
    );
    const events = await eventsResponse.json();
    const commitCount = events.filter(
      (event) => event.type === "PushEvent"
    ).length;

    const totalStarShow = document.createElement("p");
    totalStarShow.textContent = totalStars;
    document.body.appendChild(totalStarShow);

    const commitCountShow = document.createElement("p");
    commitCountShow.textContent = `Around latest 30 days commit: ${commitCount}`;
    document.body.appendChild(commitCountShow);

    const img = document.createElement("img");
    img.src = userData.avatar_url;
    document.body.appendChild(img);

    const name = document.createElement("h2");
    name.textContent = userData.name;

    document.body.appendChild(name);

    const bio = document.createElement("p");
    bio.textContent = userData.bio;

    document.body.appendChild(bio);

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

    document.body.appendChild(stats);

   
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

searchButton.addEventListener("click", fetchData);
