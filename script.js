const inputText = document.querySelector("#inputForm");
const placeHolder = document.querySelector("#placeholder")
const submitBtn = document.querySelector("#submitButton");
const clearTodo = document.querySelector("#clearList")
const taskCounter = document.querySelector("#counterText");
const completeCounter = document.querySelector("#complTaskCounter");
const todoList = document.querySelector("#todoList");
const todoListArray = [];

//buttons with click functionality
submitBtn.addEventListener("click", addTask);
//clearTodo.addEventListener("click", clearTodoList);

//press enter to add item
inputText.addEventListener("keydown", 
    function (event)
    {
    if (event.key === "Enter"){
    event.preventDefault();
    addTask();
    }
    });


//Functions

//to refresh entire list
function refreshList() 
{
todoList.innerHTML="";
todoListArray.forEach((tasks, index) => {
const listItem = document.createElement("li");
const itemLabel = document.createElement("span");
todoList.appendChild(listItem);
listItem.appendChild(itemLabel);
itemLabel.textContent = tasks.text;
itemLabel.innerText = tasks.text;

const deleteTask = document.createElement("button");
deleteTask.innerHTML = "&#128465";
deleteTask.setAttribute("class", "deleteItem");
listItem.appendChild(deleteTask);
deleteTask.addEventListener("click", () => removeFromArray(index)); //push index to remove from removeFromArray function and remove

if(tasks.completed){
    itemLabel.className = "completed";
} else{
    itemLabel.className = "";
};

itemLabel.style.userSelect = "none";
itemLabel.style.cursor = "pointer";
itemLabel.addEventListener("click", () => toggleCompleted(index)); //push index to toggleCompleted function and toggle 
});

completeCounter.innerHTML = todoList.getElementsByClassName("completed").length + " " + "completed";
};

//add task without refresh function and with animation
function addTask() 
{
    const newTask = inputText.value.trim(); //trim means delete empty space
if (newTask !== "")
{
   
   todoListArray.push({text: newTask, completed: false});
   
   const createListItem = document.createElement("li");
   const createItemLabel = document.createElement("span");
   
   todoList.appendChild(createListItem);
   createListItem.appendChild(createItemLabel);
   createItemLabel.textContent = newTask;
   
   
   const deleteTask = document.createElement("button");
   deleteTask.innerHTML = "&#128465";
   deleteTask.setAttribute("class", "deleteItem");
   createListItem.appendChild(deleteTask);

   createItemLabel.style.userSelect = "none";
   createItemLabel.style.cursor = "pointer";

   //Animation for adding list item
   createItemLabel.classList.add("liAddAnimation");
   setTimeout(() => {createItemLabel.classList.remove("liAddAnimation")}, 500);

   const currentIndex = todoListArray.length -1; //To keep track that correct index is being passed to toggleCompleted and removeFromArray

   //toggle the current task as complete and forwart correct index to toggle function
   createItemLabel.addEventListener("click", () => toggleCompleted(currentIndex));

   //pass the current index to the removefrom array and remove
   deleteTask.addEventListener("click", () => removeFromArray(currentIndex)); //push index to remove from removeFromArray function and remove
   completeCounter.innerHTML = todoList.getElementsByClassName("completed").length + " " + "completed";

} 
else 
{ //red text to appear if there is nothing written
   placeHolder.classList.add("placeholder-flash");
   setTimeout(() => {placeHolder.classList.remove("placeholder-flash")}, 1000);      
};
//clear input field
inputText.value =""
};

//remove item from list and refresh list
function removeFromArray(index){
    todoListArray.splice(index, 1);
    refreshList();
}

//to toggle complete status and animation
function toggleCompleted(index){
   todoListArray[index].completed = !todoListArray[index].completed;

   const listItem = todoList.children[index];
   const itemLabel = listItem.querySelector("span");

   if (todoListArray[index].completed) {
    itemLabel.classList.add("completed");
    itemLabel.classList.add("completedAnimation");
    setTimeout(() => {itemLabel.classList.remove("completedAnimation")}, 300);
   } else
   {
    itemLabel.setAttribute("class", "")
   }
   
   completeCounter.innerHTML = todoList.getElementsByClassName("completed").length + " " + "completed";
};