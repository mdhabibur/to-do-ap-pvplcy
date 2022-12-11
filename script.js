/*
 * Title: To Do Application using vanilla JS DOM
 * Description: This JS file has all the JS functions necessary to control the to do application
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 12/17/2020
 *
 */

//select elemens and assign them to variables

let newTask = document.querySelector("#new-task"); //selects the input field
let form = document.querySelector("form");

let todoUl = document.querySelector("#items");
let completeUl = document.querySelector(".complete-list ul");



//necessary functions


//creates a list item 
let createTask = function(task) {

    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");

    label.innerText = task;
    checkBox.type = "checkbox";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);

    return listItem;


}

//add the created list item to the ul list when "add task" button is clicked
let addTask = function(event){

    event.preventDefault(); //prevents the default re-loading behaviour

    let listItem = createTask(newTask.value); //got the final listItem 

    //now need to add the final list item to the incomplete tasks list
    todoUl.appendChild(listItem);

    //now blank the input filed
    newTask.value = "";


    //complete the task when checkbox is clicked
    //bind the new list item to the incomplete list

    bindInCompleteItems(listItem, completeTask);


}


let completeTask = function(){

    //add the list item to the complete tasks list

    let listItem = this.parentNode; //got the parent of check box element  means li element


    //create the delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete";

    listItem.appendChild(deleteBtn);

    //remove the check box that was sent from the incomplete task's list item
    let checkBox = listItem.querySelector("input[type='checkbox']");
    checkBox.remove();


    //now add the list item to the complete tasks ul lists
    completeUl.appendChild(listItem);

    //now need to bind another function for handling the event when the delete button is clicked
    //here deleteTask() is the call back function when the delete button is clicked
    bindCompleteItems(listItem, deleteTask); 



}

let deleteTask = function() {

    let listItem = this.parentNode;  //got the parent node of the "delete button" element means the "li" element
    
    //now remove the element
    let ul = listItem.parentNode;
    ul.removeChild(listItem);

}


let bindInCompleteItems = function(taskItem, checkBoxClicked){

    let checkBox = taskItem.querySelector("input[type='checkbox']");
    checkBox.onchange = checkBoxClicked; 
    //calls the checkBoxClicked() means the completeTask() when the user checks the checkbox



}


let bindCompleteItems = function(taskItem, deleteButtonClicked){

    let deleteButton = taskItem.querySelector(".delete");
    deleteButton.onclick = deleteButtonClicked;


}


//now call the function for specific events
form.addEventListener("submit", addTask);


//but these code does not work for the initial codes that were already on the screen by the html because we did not bind the function with them
//so let's bind the functions with them
for(let i = 0; i < todoUl.children.length; i++){

    bindInCompleteItems(todoUl.children[i], completeTask);


}


for(let i = 0; i < completeUl.children.length; i++){

    bindCompleteItems(completeUl.children[i], deleteTask);


}