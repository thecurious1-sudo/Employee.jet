let private_todo_head = $(`.private-todo-button`);
let project_todo_head = $(`.project-todo-button`);
let private = false;
$(private_todo_head).on(`click`, () => {
    if (!private) {
        $(private_todo_head).toggleClass('change-color-to-grey');
        $('.private-todo-content').toggleClass('show-todo-list');
        $(project_todo_head).toggleClass('change-color-to-grey');
        $('.project-todo-content').toggleClass('show-todo-list');
        private = true;
    }
});

$(project_todo_head).on(`click`, () => {
    if (private) {
        
        $(private_todo_head).toggleClass('change-color-to-grey');
        $('.private-todo-content').toggleClass('show-todo-list');
        $(project_todo_head).toggleClass('change-color-to-grey');
        $('.project-todo-content').toggleClass('show-todo-list');
        private = false;
    }
});