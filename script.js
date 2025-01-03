const getBut = document.querySelector("#getP");
const userName = document.querySelector("#userInput");

getBut.addEventListener('click', (event) => {
    event.preventDefault();
    fetchProfile();
});

function fetchProfile() {
    const userInp = userName.value.trim();

    if (!userInp) {
        alert("Enter GitHub username");
        return;
    }

    fetch(`https://api.github.com/users/${userInp}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response is not OK");
            }
            return response.json();
        })
        .then((data) => {
            displayProfile(data);
        })
        .catch((err) => {
            console.error("There was a problem with the fetch operation:", err);
            alert("User not found or an error occurred.");
        });
}

function displayProfile(profileData) {
    const profileElement = document.querySelector("#profile");
    if (!profileElement) {
        alert("No profile display element found.");
        return;
    }

    profileElement.innerHTML = `
        <h2>${profileData.login}</h2>
        <img src="${profileData.avatar_url}" alt="${profileData.login}" style="width:100px; height:100px; border-radius:50%;" />
        <p><strong>Followers:</strong> ${profileData.followers}</p>
        <p><strong>Following:</strong> ${profileData.following}</p>
        <p><strong>Repositories:</strong> ${profileData.public_repos}</p>
        <a href="${profileData.html_url}" target="_blank">View Profile on GitHub</a>
    `;
}