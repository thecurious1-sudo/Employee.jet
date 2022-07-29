// Update task on view projects todo list
let viewEditBtn = document.getElementsByClassName(`view-project-edit`);
for (let eBtn of viewEditBtn) {
  $(eBtn).on('click', () => {
    let id = eBtn.id.split(`-`)[1];
    let taskId = "task-" + id;
    let task = document.getElementById(taskId);
    $(task).toggleClass(`edit-private-todo-list`);
    let temp = eBtn.getElementsByClassName(`fas fa-pencil-alt me-3`)[0];
    if (temp) {
      //I've clicked edit button
      $(task).prop('disabled', false);
    } else {
      //task save functionality
      //ajax request to update task

      let task_obj = {
        task: task.value
      };

      $(task).toggleClass(`edit-private-todo-list`);
      $.ajax({
        url: `/projects/update-view-project-todo-list/${id}`,
        type: `POST`,
        data: task_obj,
        success: function (data) {
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



// Adding new task to view project todo list via AJAX
let createViewProjectTask = function (classID) {
  $(`.new-view-project-task-form`).each(function () {
    let taskForm = $(this);
    taskForm.submit(function (e) {
      e.preventDefault();
      let uid = ($(taskForm).attr(`action`)).split('/')[3];
      $.ajax({
        type: 'POST',
        url: $(taskForm).attr(`action`),
        data: taskForm.serialize(),
        success: function (data) {
          let newTask = newViewProjectTaskDom(data.data);
          $(`.view-project-todo-tasks-container-${uid}`).prepend(newTask);
          deleteViewProjectTask($(`.text-danger`, newTask));
          new Noty({
            theme: 'relax',
            text: "Task added ",
            type: 'success',
            layout: 'topRight',
            timeout: 1000
          }).show();
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
          <a id="edit-${data.task._id}" href="#" class="text-info view-project-edit hide-on-edit"
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
        new Noty({
          theme: 'relax',
          text: "Task deleted",
          type: 'success',
          layout: 'topRight',
          timeout: 1000
        }).show();
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




