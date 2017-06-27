/**
 * Created by hudeda on 27/03/2017.
 */
/*
 * functionality of connection by admin
 *
 *1)deleteConnectionSession - remove the session of admin
 *2)connectionAdmin - connect admin and create session
 *
 * */
$(document).ready(function () {
    $("#userConnection").click(connectionAdmin);
    $("#endConnection").click(deleteConnectionSession);

});

//delete the session of admin
function deleteConnectionSession() {
        $.ajax({
            async: false,
            type: 'POST',
            url: endSession,
            data: {
            },
            success: function (response) {
            }
        });
    window.location.href = "http://buy-with-friends.com/admin/";
}

function connectionAdmin() {
    var userName = $("#userNameConnection").val() ;
    var pass = $("#userPassConnection").val();
    $.ajax({
        async: false,
        type: 'POST',
        url: connection,
        data: {
            userName: userName,
            pass:pass,
        },
        success: function (response) {
            if (response.localeCompare(" Error") < 0) {
                $('#myAdminLogin').modal('hide');
                window.location.href = "http://buy-with-friends.com/admin/";
            }
            else
                swal("שגיאת התחברות", "שם משתמש או הסיסמה אינם תואמים", "warning");
        }
    });
}