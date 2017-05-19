/**
 * Created by hudeda on 17/01/2017.
 */

$(document).ready(function () {
    $('#connectSeller').click(connectSellerDB);
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
                    swal("!שים לב","מספר מזהה אינו תואם לסיסמה", "success");
                    $('#inputNumId').focus();
                    return;
                }
                Profile = JSON.parse(response);
                localStorage.setItem("companyIdSeller", Profile[0]);
                localStorage.setItem("companyNameSeller", Profile[1]);
                localStorage.setItem("companyAddressSeller", Profile[2]);
                localStorage.setItem("companyPhoneSeller", Profile[3]);
                localStorage.setItem("companyEmailSeller", Profile[4]);
                window.location.href = "http://buy-with-friends.com/SellerWeb/";
            }
        });
    }

}
