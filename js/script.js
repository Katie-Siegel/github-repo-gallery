///Declared Variables///
//Div where profile information will appear//
const bigPicture =
	document.querySelector('.overview');
//Information to include in bigPicture//
const username = 'Katie-Siegel';
//Div where repos will be displayed//
const reposDisplay =
	document.querySelector('.repo-list');
//Selects class=repos//
const reposClass =
	document.querySelector('.repos');
//Displays individual repo data//
const repoData =
	document.querySelector('.repo-data');
//Selects the Back to Repo Gallery button//
const backToGallery = document.querySelector(
	'.view-repos'
);
//Selects the input box for search function//
const filterInput = document.querySelector(
	'.filter-repos'
);

///Functions to poulate the bio section (class=overview)///
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
	let div = document.createElement('div');
	div.classList.add('user-info');
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

///Functions to populate the list of repositories (class=repo-list)///
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
	filterInput.classList.remove('hide');
	repos.forEach(function (repo) {
		let repoItem = document.createElement('li');
		repoItem.classList.add('repo');
		repoItem.innerHTML = `<h3>${repo.name}</h3>`;
		reposDisplay.append(repoItem);
	});
};

///Supplies Repo Information///
//Event Listener for calling repo information//
const repoList =
	document.querySelector('.repo-list');

repoList.addEventListener('click', function (e) {
	if (e.target.matches('h3')) {
		const repoName = `${e.target.innerText}`;
		specificInfo(repoName);
	}
});

//Function for collecting the specific information needed for each repo//
const specificInfo = async function (repoName) {
	const results = await fetch(
		`https://api.github.com/repos/${username}/${repoName}`
	);
	const repoInfo = await results.json();
	console.log(repoInfo);
	const fetchLanguages = await fetch(
		`https://api.github.com/repos/${username}/${repoName}/languages`
	);
	const languageData =
		await fetchLanguages.json();
	console.log(languageData);
	let languages = [];
	for (let item in languageData) {
		languages.push(item);
	}
	console.log(languages);
	repoInfoDisplay(repoInfo, languages);
};

//Creates display for specific repo items//
const repoInfoDisplay = function (
	repoInfo,
	languages
) {
	repoData.innerHTML = '';
	let div = document.createElement('div');
	div.classList.add('repo-data');
	div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${
			repoInfo.default_branch
		}</p>
    <p>Languages: ${languages.join(', ')}</p>
    <a class="visit" href='https://github.com/${username}/${
		repoInfo.name
	}' target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
	repoData.append(div);
	repoData.classList.remove('hide');
	reposClass.classList.add('hide');
	backToGallery.classList.remove('hide');
};

//Resets page back to repo list when Back to Repo Gallery button is selected//
backToGallery.addEventListener(
	'click',
	function (e) {
		reposClass.classList.remove('hide');
		repoData.classList.add('hide');
		backToGallery.classList.add('hide');
	}
);

//Allows for dynamic search bar//
filterInput.addEventListener(
	'input',
	function (e) {
		const search = e.target.value;
		console.log(search);
		let repos =
			document.querySelectorAll('.repo');
		let searchLower = search.toLowerCase();

		for (const repo of repos) {
			let repoLowerText =
				repo.innerText.toLowerCase();
			if (repoLowerText.includes(searchLower)) {
				repo.classList.remove('hide');
			} else {
				repo.classList.add('hide');
			}
		}
	}
);
