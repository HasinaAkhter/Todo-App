const form = document.querySelector('form');
const todoList = document.querySelector('ul');
const button = document.querySelector('#clear');
const input = document.getElementById('user-todo');

// A variable `todosArray` to hold our todos
// If there are already `todos` in localStorage then we will get
// those `todos` using JSON.parse
//If local storage does not have any  then set it to an empty array
    
const todosArray = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

// JSON.stringify() if used because localStorage works with strings. This is how we sent data to localStorage   
    
	localStorage.setItem('todos', JSON.stringify(todosArray));

//JSON.parse() method that converts strings from localstorage into data we can access with JavaScript.
// When receiving data from a web server, the data is always a string
//Parse the data with JSON.parse(), and the data becomes a JavaScript object    
    
	const storage = JSON.parse(localStorage.getItem('todos'));

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      todosArray.push(input.value);
      
      localStorage.setItem('todos', JSON.stringify(todosArray));
      todoMaker(input.value);
      input.value = "";
	  
    });

    const todoMaker = function(text) {
    //create list, display input as text, append to ul  
	  const todo = document.createElement('li');
      todo.textContent = text;
      todoList.appendChild(todo);
	//create a label element to add a checkbox
	  const label = document.createElement('label');
	  label.textContent = 'Done';
	//create an input element and mark the type as checkbox 
	  const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
	//add checkbox to label and then add label to list
      label.appendChild(checkbox);
      todo.appendChild(label); 
	  //add a remove button to each list item, so that clicking the button deletes the new todos  
      const remove = document.createElement('button');
      remove.textContent = 'remove';
      todo.appendChild(remove);
	  
    }
//In a handler, the event  object contains data about the event, and passed as the first argument
//we can take advantage of event bubbling, that's when an event on one
//element bubbles up to its parent or other ancestors.
//So this means we can add the handler to just one element,to the ul
//the ul tag holding the list items and check boxes.so when checkbox is checked, response traverse to label element and then to listitem

	
    todoList.addEventListener('change', (e) => {
      //console.log(e.target.checked);
  
       const checkbox = event.target;
       const checked = checkbox.checked;
       const listItem = checkbox.parentNode.parentNode;//traversing to label and then to list
    //when the checkbox is checked a class responded will be added to display style
      if (checked) {
           listItem.className = 'responded'; 
       } else {
           listItem.className = '';
        }
       });
	
	//we'll handle click events that bubble up when a user clicks one of the remove
    //buttons.So in other words the click event is initially received by the button but
   //travels up the DOM to the li and then the ul element.  

			todoList.addEventListener('click', (e) => {
			  if (e.target.tagName === 'BUTTON') {
				const todo = e.target.parentNode;
				const todoList = todo.parentNode;
				todoList.removeChild(todo);
			  }
			}); 
    // Loop through localStorage when a user first opens a page and run the todoMaker function
		for (let i = 0; i < storage.length; i++) {
		  todoMaker(storage[i]);
		}

    button.addEventListener('click', function() { 
      localStorage.clear();
      while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }
    });
