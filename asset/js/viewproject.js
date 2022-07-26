
// Adding new task to view project todo list via AJAX

let createViewProjectTask = function (classID) {
    $(`.new-view-project-task-form`).each(function () {
        let taskForm = $(this);
        taskForm.submit(function (e) {
            e.preventDefault();
            console.log('Inside submit')
            let uid = ($(taskForm).attr(`action`)).split('/')[3];
            $.ajax({
                type: 'POST',
                url: $(taskForm).attr(`action`),
                data: taskForm.serialize(),
                success: function (data) {
                    console.log("Inside createViewProjectTask");
                    let newTask = newViewProjectTaskDom(data.data);
                    $(`.view-project-todo-tasks-container-${uid}`).prepend(newTask);
                    deleteViewProjectTask($(`.text-danger`, newTask));
                }, error: function (err) {
                    console.log(err.resposneText);
                }
            });
        });
        // } 
    });
}

let newViewProjectTaskDom = (data) => {
    return $(`<form action="/projects/update-view-project-todo-list${data.task._id}" method="post" class="view-project-task-form-${data.task._id}">
    <ul class="list-group list-group-horizontal rounded-0 bg-transparent">
      <li
        class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent hide-on-edit">
        <div class="form-check">
          <input class="form-check-input me-0 hide-on-edit" type="checkbox" value=""
            id="flexCheckChecked1" aria-label="..." />
        </div>
      </li>
      <li
        class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent"
        style="width: 65%; overflow-wrap: anywhere;">
        <textarea id="task-${data.task._id}" type="text"
          class="lead fw-normal mb-0 hide-on-edit private-todo-textarea"
          disabled>${data.task.task}</textarea>
      </li>
      <li class="list-group-item ps-3 pe-10 py-1.5 rounded-0 border-0 bg-transparent"
        style="width: 19%;">
        <div class="d-flex flex-row justify-content-end mb-1">
          <a id="edit-${data.task._id}" href="#" class="text-info hide-on-edit"
            data-mdb-toggle="tooltip" title="Edit task"><i class="fas fa-pencil-alt me-3"></i></a>
          <a href="/projects/delete-view-project-list-task/?tid=${data.task._id}&uid=${data.uid}"
            class="text-danger hide-on-edit" data-mdb-toggle="tooltip" title="Delete task"><i
              class="fas fa-trash-alt"></i></a>
        </div>
        <div class="text-end text-muted">
          <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="DEADLINE"
            style="text-align: left!important;">
            <p class="small mb-0 hide-on-edit"><i class="fas fa-info-circle me-2"></i>
              ${data.task.deadline.toString().substring(0, 15)}
            </p>
          </a>
        </div>
      </li>
    </ul>
    <hr>
  </form>`);
}

let deleteViewProjectTask = (deleteID) => {
    $(deleteID).click(function (e) {
        e.preventDefault();

        $.ajax({
            type: `get`,
            url: $(deleteID).prop('href'),   //Gets the link in href
            success: function (data) {
                $(`.view-project-task-form-${data.data.task_id}`).remove();
            }, error: function (err) {
                console.log(err.resposneText);
            }
        });
    });
}

let convertTasksToAjax = function () {
        $(`.view-project-todo-tasks-container > form`).each(function () {
            let self = $(this);
            let deleteButton = $('.text-danger', self);
            deleteViewProjectTask(deleteButton);
        });
}

createViewProjectTask();
convertTasksToAjax();




