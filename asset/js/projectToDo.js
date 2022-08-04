//document ready
$(document).ready(function () {
    $('.project-task-complete').each(function () {
      $(this).click(function (e) {
        let id = this.id.split('-')[1];
        let completedStatus = $(this).is(':checked');
        //update completed Status in db
        $.ajax({
          type: 'POST',
          url: `/users/update-task-status/${id}`,
          data: { completedStatus: completedStatus },
          success: function (data) {
            new Noty({
              theme: 'relax',
              text: "Task status updated",
              type: 'success',
              layout: 'topRight',
              timeout: 1000
  
            }).show();
          },
          error: function (data)
          {
            console.log("ERRRROORR!!!!");
            }
        });
      });
    });
  });