const List       = document.querySelector('#todo-list');

let LabelElement = document.querySelectorAll('.title');
let ChangeButton = document.querySelectorAll('.edit');
let DeleteButton = document.querySelectorAll('.delete');
let AddButton    = document.querySelectorAll('#add-button');
let UploadedData;
let data         = 
{
	'Изучить JavaScript': 'pass'
};
 

window.onload = function(){
	Upload();

	LabelElement.forEach(el => {
		LabelElementHandle(el);
	});

	ChangeButton.forEach(el => {
		ChangeButtonHandle(el);
	});

	DeleteButton.forEach(el => {
		DeleteButtonHandle(el);
	});

	AddButton.forEach(el => {
			el.addEventListener('click', function(e){
			e.preventDefault();

			let Li                 = document.createElement('li');
			let Label              = document.createElement('label');
			let Input              = document.createElement('input');
			let EditButton         = document.createElement('button');
			let DeleteButton       = document.createElement('button');
			let AddInput           = document.querySelector('#add-input');
			let AddDescription     = document.querySelector('#add-input-des');

			if(!AddInput.value) return alert('Пожалйста заполните форму!')

			Label.innerText        = AddInput.value;
			Label.className        = 'title';
			LabelElementHandle(Label);

			Input.className        = 'textfield';
			Input.type             = 'text';

			EditButton.innerText   = 'ИЗМЕНИТЬ';
			EditButton.className   = 'edit';
			ChangeButtonHandle(EditButton);

			DeleteButton.innerText = 'УДАЛИТЬ';
			DeleteButton.className = 'delete';
			DeleteButtonHandle(DeleteButton);

			Li.className           = 'todo-item';

			Li.append(Label);
			Li.append(Input);
			Li.append(EditButton);
			Li.append(DeleteButton);

			List.append(Li);

			data[Label.innerText]  = AddDescription.value;
			SaveToDB();
		});
	})

	function createElementsFromDB(Udata){
			if(Udata == 'id') return;

			let Li                 = document.createElement('li');
			let Label              = document.createElement('label');
			let Input              = document.createElement('input');
			let EditButton         = document.createElement('button');
			let DeleteButton       = document.createElement('button');

			Label.innerText        = Udata;
			Label.className        = 'title';
			LabelElementHandle(Label);

			Input.className        = 'textfield';
			Input.type             = 'text';

			EditButton.innerText   = 'ИЗМЕНИТЬ';
			EditButton.className   = 'edit';
			ChangeButtonHandle(EditButton);

			DeleteButton.innerText = 'УДАЛИТЬ';
			DeleteButton.className = 'delete';
			DeleteButtonHandle(DeleteButton);

			Li.className           = 'todo-item';

			Li.append(Label);
			Li.append(Input);
			Li.append(EditButton);
			Li.append(DeleteButton);

			List.append(Li);

			data[Udata]  = UploadedData[Udata];
	};

	function Upload(){
		let xhr = new XMLHttpRequest();

		xhr.open('GET', 'http://localhost:3000/users');
		xhr.send();

		xhr.onload = function(){
			for(Udata of JSON.parse(xhr.response)){
				UploadedData = Udata;
			};

			for(key of Object.getOwnPropertyNames(UploadedData)){
				createElementsFromDB(key);
			};
		};
	};

	function ChangeButtonHandle(el){
		el.addEventListener('click', function(e){
			let title = e.target.parentNode.children[0];
			let input = e.target.parentNode.children[1];
			e.target.parentNode.classList.toggle('editing');

			if(e.target.parentNode.className.includes('editing')){
				e.target.innerText = 'СОХРОНИТЬ'
			}
			else{
				if(!input.value) return alert('Пожалйста заполните форму!');
				title.innerText    = input.value;
				e.target.innerText = 'ИЗМЕНИТЬ';
			};
		})
	};

	function DeleteButtonHandle(el){
		el.addEventListener('click', function(e){
			let xhr = new XMLHttpRequest();

			e.target.parentNode.remove();
			delete data[e.target.parentNode.children[0].innerText];

			xhr.open('POST', 'http://localhost:3000/users');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(data));
		});
	};

	function LabelElementHandle(el){
		el.addEventListener('click', function(e) {
			document.location.href =
			encodeURI(`file:///C:/Users/Egor2/Desktop/GG/project1/description.html?title=${el.innerText}`);
		});
	};

	function SaveToDB(){
		let xhr      = new XMLHttpRequest();

		xhr.open('POST', 'http://localhost:3000/users');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(data));

		xhr.onload = function(){
			alert(xhr.response)
		};
		}
	};