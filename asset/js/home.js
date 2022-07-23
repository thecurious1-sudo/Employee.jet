let private_todo_head = $(`.private-todo-button`);
$(private_todo_head).on(`click` , ()=>{
    console.log("changing color");
    $(private_todo_head).toggleClass('display-hidden');
});

let project_todo_head = $(`.project-todo-button`);
$(project_todo_head).on(`click` , ()=>{
    console.log("changing color");
    $(project_todo_head).toggleClass('display-hidden');
});