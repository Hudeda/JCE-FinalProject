/**
 * Created by hudeda on 17/01/2017.
 */

$(document).ready(function () {
    $('#connectSeller').click(connectSellerDB);
    $("#connectSeller").on("click", function(e) {
        e.preventDefault();
    });
});

function connectSellerDB(){
    var inputId = $("#inputNumId").val();
    var inputPass = $("#inputPassword").val();



    if (inputId != "" && inputPass != "") {
        var Profile = [];
        $.ajax({
            async: false,
            type: 'POST',
            url: connectCompany,
            data: {
                id: inputId,
                password: inputPass,
            },
            success: function (response) {
                if (response.localeCompare(" Error") == 0) {
                    alert("מספר מזהה והסיסמה אינם תואמים");
                    $('#inputNumId').focus();
                    return;
                }
                Profile = JSON.parse(response);
                localStorage.setItem("companyId", Profile[0]);
                localStorage.setItem("companyName", Profile[1]);
                localStorage.setItem("companyAddress", Profile[2]);
                localStorage.setItem("companyPhone", Profile[3]);
                localStorage.setItem("companyEmail", Profile[4]);
                window.location.href = "http://buy-with-friends.com/SellerWeb/";
            }
        });
    }

}


