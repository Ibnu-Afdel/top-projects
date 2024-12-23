const usernameInput = document.querySelector('#username');
const searchButton = document.querySelector('#btn');

async function fetchData(){
    const username = usernameInput.value;

    try{
        const responseFromGithub = await fetch(`https://api.github.com/users/${username}`);
        const userData = await responseFromGithub.json();
        console.log(userData);

        const repositoryResponse = await fetch(userData.repos_url)
        const repos = await repositoryResponse.json();

        const totalStars = repos.reduce(
            (sum, repo) => sum + repo.stargazers_count,0
        );

        const totalStarShow = document.createElement('p');
        totalStarShow.textContent = totalStars;
        document.body.appendChild(totalStarShow)

        const img = document.createElement('img');
        img.src = userData.avatar_url;
        document.body.appendChild(img)

        const name = document.createElement('h2');
        name.textContent = userData.name

        document.body.appendChild(name)

        const bio = document.createElement('p');
        bio.textContent = userData.bio

        document.body.appendChild(bio)
        
    } catch(error){
        console.log(`Error : ${error}`);
        
    }
}

searchButton.addEventListener('click', fetchData);