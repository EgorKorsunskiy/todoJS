const params = decodeURI(window.location.search).slice(7);
const parag  = document.querySelector('.description');
const title  = document.querySelector('#title');
let description;

window.onload = function(){
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://localhost:3000/users');
	xhr.send();

	xhr.onload = function(){
		let data = JSON.parse(xhr.response);
		
		for(obj of data){
			if(obj.hasOwnProperty(params)){
				description = obj[params];
			}
		}

		parag.innerText = description;
		title.innerText = params;
	};
};