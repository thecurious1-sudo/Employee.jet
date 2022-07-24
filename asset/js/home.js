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

let list_group_items = document.getElementsByClassName(`dashboard-sidebar-items`);
for (let item of list_group_items) {
    $(item).on(`click`, () => {
        $(list_group_items).removeClass(`active`);
        $(item).toggleClass(`active`);
    })
}

// View Edit form for private todo list
let editBtn = document.getElementsByClassName(`text-info`);
for (let eBtn of editBtn) {
    $(eBtn).on('click', () => {
        $('.hide-on-edit').toggleClass(`display-hidden`);
        $('.show-on-edit').toggleClass('display-hidden');
    });
}

$('.update-task-submit-button').on(`click`, () => {
    $('.hide-on-edit').toggleClass(`display-hidden`);
    $('.show-on-edit').toggleClass('display-hidden');
});