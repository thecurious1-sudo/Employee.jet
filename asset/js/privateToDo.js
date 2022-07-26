// Update task on private todo list
let editBtn = document.getElementsByClassName(`private-todo-edit`);
for (let eBtn of editBtn) {
  $(eBtn).on('click', () => {
    let id = eBtn.id.split(`-`)[1];
    let taskId = "task-" + eBtn.id.split('-')[1];
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
      $(task).toggleClass(`edit-private-todo-list`);
      $(task).prop('disabled', true);
    }

    let i = eBtn.getElementsByClassName(`fas fa-pencil-alt me-3`)[0] || eBtn.getElementsByClassName(`fas fa-floppy-disk me-3`)[0];
    $(i).toggleClass('fas fa-pencil-alt me-3')
    $(i).toggleClass('fas fa-floppy-disk me-3')
  });
}

// Adding new task to private todo list via AJAX
let createTask = function () {
  let newTaskForm = $(`.new-task-form`);
  newTaskForm.submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: 'POST',
      url: `/users/add-task-to-privateList`,
      data: newTaskForm.serialize(),
      success: function (data) {
        let newTask = newTaskDom(data.data.task);
        $(`.showTasksContainer`).prepend(newTask);
        deleteTask($(`.text-danger`, newTask));
      }, error: function (err) {
        console.log(err.resposneText);
      }
    });
  });
}

let newTaskDom = function (task) {
  return $(`<form action="/users/update-private-todo-list/${task._id}" method="post" class="form-task-${task._id}">
    <ul class="list-group list-group-horizontal rounded-0 bg-transparent">
      <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent hide-on-edit">
        <div class="form-check">
          <input class="form-check-input me-0 hide-on-edit" type="checkbox" value="" id="flexCheckChecked1" aria-label="..." />
        </div>
      </li>
      <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent"
        style="width: 65%; overflow-wrap: anywhere;">
        <textarea id="task-${task._id}" type="text" class="lead fw-normal mb-0 hide-on-edit private-todo-textarea" disabled >${task.task}</textarea>
      </li>
      <li class="list-group-item ps-3 pe-10 py-1.5 rounded-0 border-0 bg-transparent" style="width: 19%;">
        <div class="d-flex flex-row justify-content-end mb-1">
          <a id="edit-${task._id}" href="#" class="text-info hide-on-edit" data-mdb-toggle="tooltip"
            title="Edit task"><i class="fas fa-pencil-alt me-3"></i></a>
          <a href="/users/delete-private-todo-list-task/${task._id}" class="text-danger hide-on-edit" data-mdb-toggle="tooltip"
            title="Delete task"><i class="fas fa-trash-alt"></i></a>
        </div>
        <div class="text-end text-muted">
          <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="DEADLINE"
            style="text-align: left!important;">
            <p class="small mb-0 hide-on-edit"><i class="fas fa-info-circle me-2"></i>
              ${task.deadline.toString().substring(0, 15)}
            </p>
          </a>
        </div>
      </li>
    </ul>
    <hr>
  </form>`);
}

let deleteTask = function (deleteID) {
  $(deleteID).click(function (e) {
    e.preventDefault();

    $.ajax({
      type: `get`,
      url: $(deleteID).prop('href'),   //Gets the link in href
      success: function (data) {
        $(`.form-task-${data.data.task_id}`).remove();
      }, error: function (err) {
        console.log(err.resposneText);
      }
    });
  });
}

let convertTasksToAjax = function () {
  $('.showTasksContainer > form').each(function () {
    let self = $(this);
    let deleteButton = $('.text-danger', self);
    deleteTask(deleteButton);
  });
}

createTask();
convertTasksToAjax();