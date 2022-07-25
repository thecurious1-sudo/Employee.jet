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

let editBtn = document.getElementsByClassName(`text-info`);
for (let eBtn of editBtn) {
    $(eBtn).on('click', () => {
        let id = eBtn.id.split(`-`)[1];
        let taskId="task-"+eBtn.id.split('-')[1];
        let task = document.getElementById(taskId);
        $(task).toggleClass(`edit-private-todo-list`);
        let temp = eBtn.getElementsByClassName(`fas fa-pencil-alt me-3`)[0];
        if (temp) {
            //I've clicked edit button
            $(task).prop('disabled', false);
        } else {
            //task save functionality
            //ajax request to update task
            $(task).toggleClass(`edit-private-todo-list`);
            let task_value = task.value;
            console.log(task_value);
            //let deadline = document.getElementById(`deadline-${taskId}`).value;
            let task_obj = {
                task: task_value
            };
            $.ajax({
                url: `/users/update-private-todo-list/${id}`,
                type: `POST`,
                data: task_obj,
                success: function (data) {
                    console.log(data);
                }
            });
            console.log("UPDATED!!!!");
            $(task).toggleClass(`edit-private-todo-list`);
            $(task).prop('disabled', true);
            
        }
        let i=eBtn.getElementsByClassName(`fas fa-pencil-alt me-3`)[0] || eBtn.getElementsByClassName(`fas fa-floppy-disk me-3`)[0];
        $(i).toggleClass('fas fa-pencil-alt me-3')
        $(i).toggleClass('fas fa-floppy-disk me-3')
    });
}