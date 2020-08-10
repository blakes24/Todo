const addBtn = document.querySelector('input[type="submit"]');
const todoList = document.querySelector('#todoList');
const data = [];
const get = JSON.parse(localStorage.getItem('items'));

if (get) {
	for (let item of get) {
		const newLi = document.createElement('li');
		const box = document.createElement('input');
		const btn = document.createElement('BUTTON');
		btn.innerText = 'Delete';
		box.setAttribute('type', 'checkbox');
		newLi.innerHTML = `<span>${item.text}</span>`;
		todoList.append(newLi);
		newLi.prepend(box);
		newLi.append(btn);
		if (item.completed === true) {
			newLi.classList.add('completed');
			box.checked = true;
		}
		data.push(item);
	}
}

addBtn.addEventListener('click', function(e) {
	e.preventDefault();
	let todoText = document.querySelector('input[type="text"]');
	if (todoText.value !== '') {
		makeTodo(todoText.value);
		data.push({ text: todoText.value, completed: false });
		localStorage.setItem('items', JSON.stringify(data));
		todoText.value = '';
	}
});

todoList.addEventListener('click', function(e) {
	if (e.target.tagName === 'BUTTON') {
		e.target.parentElement.remove();
		const erase = e.target.previousElementSibling.innerText;
		for (i = 0; i < data.length; i++) {
			if (data[i].text === erase) {
				data.splice(i, 1);
				break;
			}
		}
		localStorage.setItem('items', JSON.stringify(data));
	}
	if (e.target.tagName === 'INPUT') {
		e.target.parentElement.classList.toggle('completed');
		const checked = e.target.nextElementSibling.innerText;
		for (i = 0; i < data.length; i++) {
			if (data[i].text === checked) {
				data[i].completed = e.target.checked;
				break;
			}
		}
		localStorage.setItem('items', JSON.stringify(data));
	}
});

function makeTodo(text) {
	const newLi = document.createElement('li');
	const box = document.createElement('input');
	const btn = document.createElement('BUTTON');
	btn.innerText = 'Delete';
	box.setAttribute('type', 'checkbox');
	newLi.innerHTML = `<span>${text}</span>`;
	todoList.append(newLi);
	newLi.prepend(box);
	newLi.append(btn);
}
