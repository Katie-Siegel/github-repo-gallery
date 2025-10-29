const bigPicture =
	document.querySelector('.overview');

const username = 'Katie-Siegel';

const reposDisplay =
	document.querySelector('.repo-list');

const reposClass =
	document.querySelector('.repos');

const repoData =
	document.querySelector('.repo-data');

const backToGallery = document.querySelector(
	'.view-repos'
);

const filterInput = document.querySelector(
	'.filter-repos'
);

const getInfo = async function () {
	const results = await fetch(
		`https://api.github.com/users/${username}`
	);
	const data = await results.json();
	console.log(data);
	displayInfo(data);
};

const displayInfo = function (data) {
	let div = document.createElement('div');
	div.classList.add('user-info');
	div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong><span>Name:</span></strong> ${data.name}</p>
    <p><strong><span>Bio:</span></strong> ${data.bio}</p>
    <p><strong><span>Location:</span></strong> ${data.location}</p>
    <p><strong><span>Number of public repos:</span></strong> ${data.public_repos}</p>
  </div>`;
	bigPicture.append(div);
	getRepos();
};

getInfo();

const getRepos = async function () {
	const results = await fetch(
		`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
	);
	const data = await results.json();
	console.log(data);
	displayRepos(data);
};

const displayRepos = function (repos) {
	filterInput.classList.remove('hide');
	repos.forEach(function (repo) {
		let repoItem = document.createElement('li');
		repoItem.classList.add('repo');
		repoItem.innerHTML = `<h3>${repo.name}</h3>`;
		reposDisplay.append(repoItem);
	});
};

const repoList =
	document.querySelector('.repo-list');

repoList.addEventListener('click', function (e) {
	if (e.target.matches('h3')) {
		const repoName = `${e.target.innerText}`;
		specificInfo(repoName);
	}
});

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
    <a class="visit" href= 'https://github.com/${username}/${repoInfo.name}' target="_blank" rel="noreferrer noopener"><p>View Repo on GitHub!</p></a>`;
	repoData.append(div);
	repoData.classList.remove('hide');
	reposClass.classList.add('hide');
	backToGallery.classList.remove('hide');
};

backToGallery.addEventListener(
	'click',
	function (e) {
		reposClass.classList.remove('hide');
		repoData.classList.add('hide');
		backToGallery.classList.add('hide');
	}
);

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
