///////////Declared Variables/////
//Div where profile information will appear//
const bigPicture =
	document.querySelector('.overview');

//Information to include in bigPicture//
const username = 'Katie-Siegel';
//Div where repos will be displayed//
const reposList =
	document.querySelector('.repo-list');

/////////////Functions to poulate the bio section (class=overview)///////////
//Connects page to Git Hub API//
const getInfo = async function () {
	const results = await fetch(
		`https://api.github.com/users/${username}`
	);
	const data = await results.json();
	console.log(data);
	displayInfo(data);
};

//Displays the results of getInfo() on the page//
const displayInfo = function (data) {
	let div = document.createElement('user-info');
	div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
	bigPicture.append(div);
	getRepos();
};

//Calls getInfo() function//
getInfo();

/////////Functions to populate the list of repositories (class=repo-list)//////////////
//Fetches Repos//
const getRepos = async function () {
	const results = await fetch(
		`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
	);
	const data = await results.json();
	console.log(data);
	displayRepos(data);
};

//Displays the results of getRepos() on the page//
const displayRepos = function (repos) {
	repos.forEach(function (repo) {
		let repoItem = document.createElement('h3');
		repoItem.classList.add('h3');
		repoItem.innerText = `${repo.name}`;
		reposList.append(repoItem);
	});
};
