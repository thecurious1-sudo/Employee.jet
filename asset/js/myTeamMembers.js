// Adding member to myTeam via ajax
let addMemberToMyteam = function () {
    let newForm = $(`.add-member-to-myTeam`);
    newForm.submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: `/myTeam/addMember`,
            type: 'POST',
            data: newForm.serialize(),
            success: function (data) {
              if(!data.data){
                new Noty({
                  theme: 'relax',
                  text: "This Employee is already in you team or in some other team",
                  type: 'error',
                  layout: 'topRight',
                  timeout: 1500

              }).show();
              
                return;
              }
                let newMember = newMemberDom(data.data.user);
                $(`.members-of-my-team`).append(newMember);
                new Noty({
                  theme: 'relax',
                  text: "New team member added successfully",
                  type: 'success',
                  layout: 'topRight',
                  timeout: 1500

              }).show();
            }, error: function (err) {
                console.log("Error in adding myTeam member via AJAX:",err.resposneText);
              }
        });
    });
};

let newMemberDom = function(user) {
    return $(`
    <div class="card" style="width: 18rem; height: 48%">
    <img class="card-img-top" src="${user.avatar}" alt="employee image">
    <div class="card-body">
      <h5 class="card-title">
      ${user.name}
      </h5>
      <div class="myTeam-card-info">
        <p class="card-text">Employee ID: ${user.empId}
        </p>
        <p class="card-text">email: ${user.email}
        </p>
        <p class="card-text">Mobile No: ${user.phnNo}
        </p>
      </div>
    </div>
  </div>`);
};

addMemberToMyteam();