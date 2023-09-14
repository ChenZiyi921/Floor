function toStatistics() {
    location.href = './statistics.html';
}

function toQuery() {
    location.href = './project_list.html?assign_batch_no=1';
}

function submit() {
    var username = document.querySelector('.username');
    var password = document.querySelector('.password');
    var login_submit = document.querySelector('.login_submit');
    login_submit.addEventListener('click', function () {
        login({ username: username, password: password })
    })
}

function login(values) {
    $.ajax({
        type: "post",
        url: base_url + 'api/v10/login',
        data: values,
        dataType: "json",
        success: function (res) {
            if (res.status === 'success') {
                // location.href = '';
            }
        },
    });
}

document.addEventListener('click', function () {

})