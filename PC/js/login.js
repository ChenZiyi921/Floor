function toStatistics() {
  location.href = "./m/bi.html?assign_batch_no=1";
}

function toQuery() {
  location.href = "./m/project_list.html?assign_batch_no=1";
}

function submit() {
  var username = document.querySelector(".username");
  var password = document.querySelector(".password");
  var login_submit = document.querySelector(".login_submit");
  login_submit.addEventListener("click", function () {
    login({ username: username, password: password });
  });
}

function login(values) {
  $.ajax({
    type: "post",
    url: global.base_url + "api/v10/login",
    data: values,
    dataType: "json",
    success: function (res) {
      if (res.status === "success") {
        // location.href = '';
      }
    },
  });
}

document.addEventListener("click", function () {});
