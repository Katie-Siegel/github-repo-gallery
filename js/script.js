///////////Declared Variables/////
//Div where profile information will appear//
const bigPicture =
	document.querySelector('.overview');

//Information to include in bigPicture//
const username = 'Katie-Siegel';

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
};

//Calls getInfo() function//
getInfo();
