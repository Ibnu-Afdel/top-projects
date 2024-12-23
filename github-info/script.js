const usernameInput = document.querySelector('#username');
const searchButton = document.querySelector('#btn');

async function fetchData(){
    const username = usernameInput.value;

    try{
        const responseFromGithub = await fetch(`https://api.github.com/users/${username}`);
        const userData = await responseFromGithub.json();
        return console.log(userData);
        
    } catch(error){
        console.log(`Error : ${error}`);
        
    }
}

searchButton.addEventListener('click', fetchData);