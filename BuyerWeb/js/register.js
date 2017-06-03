$(document).ready(function () {
    $(".nav a").on("click", function () {
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

    $("#homePage").on("click", function () {
        $(".divCategory").show();
    });
    //if there is no local db show connection option else connect with the local db
    if (localStorage.getItem("userNameBuyer") == undefined) {
        $('#userNameSendingInput').val("");

    }
    else {
        var userName = localStorage.getItem("userNameBuyer");
        $('#userNameSendingInput').val(userName);
        $('#spanName').text("שלום, "+userName);
        swal("שלום " + userName, ".כעת תוכל להנות מקנייה משותפת ", "success");
    }

    $("#deleteSession").click(deleteSession);
    $("#userRegister").click(checkRegistration);
    $("#userConnection").click(checkConnection);
    $("#emailSendingButton").click(sendEmailForgot);
    $("#sendReferences").click(sendReferences);

});

//if press on connect open the connection popup window else press on disconnect so clear the local db and reload the page
function deleteSession() {

    swal({
        title: '?אתה בטוח רוצה לצאת מהאתר',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן, תוציא אותי',
        cancelButtonText: 'ביטול',
        confirmButtonClass: 'btn btn-success btn-lg',
        cancelButtonClass: 'btn btn-danger btn-lg',
        buttonsStyling: false
    }).then(function () {
        $.ajax({
            type: 'POST',
            url: endSessionBuyer,
            data: {},
            success: function (response) {
                localStorage.clear();
                window.location.href = "http://buy-with-friends.com";
            }
        });
    })
}


function validateForm(x) {
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length)
        return false;
    return true;
}

//checking if the password match to userName and saving in the local storage
function checkConnection() {
    var userName = $('#userNameConnection');
    var userPass = $('#userPassConnection');
    if (userName.val() != "" && userPass.val() != "") {

        var Profile = [];
        $.ajax({
            type: 'POST',
            url: getUserNamePassToConnection,
            data: {
                userName: userName.val(),
                password: userPass.val(),
            },
            success: function (response) {
                if (response.localeCompare(' Error') == 0) {
                    swal("שגיאת התחברות", "שם משתמש או הסיסמה אינם תואמים", "warning");
                    $('#userNameConnection').focus();
                    return;
                }
                Profile = JSON.parse(response);
                localStorage.setItem("firstNameBuyer", Profile[0]);
                localStorage.setItem("lastNameBuyer", Profile[1]);
                localStorage.setItem("userNameBuyer", Profile[2]);
                localStorage.setItem("phoneBuyer", Profile[3]);
                localStorage.setItem("emailBuyer", Profile[4]);
                localStorage.setItem("UserIdBuyer", Profile[5]);
                window.location.href = "http://buy-with-friends.com/BuyerWeb/";

            }
        });
    }
}

//checking the user register input and create new user
function checkRegistration() {
    var firstName = $('#firstNameRegistration');
    var lastName = $('#lastNameRegistration');
    var userName = $('#userNameRegistration');
    var userEmail = $('#userEmailRegistration');
    var userPhone = $('#userPhoneRegistration');
    var pass1 = $('#pass1Registration');
    var pass2 = $('#pass2Registration');

    //if one of the input is not filled
    if (firstName.val() == "" || lastName.val() == "" || userName.val() == "" || userEmail.val() == ""
        || userPhone.val() == "" || pass1.val() == "" || pass2.val() == "") {
        swal("!שים לב", "אחד מהשדות ריק", "warning");
        return;
    }
    //check if input email is correct
    if (!validateForm($('#userEmailRegistration').val())) {
        swal("!שים לב", "אימייל אינו נכון", "warning");
        $('#userEmailRegistration').focus();
        return
    }
    //check the input number
    if (!phonenumber()) {
        swal("!שים לב", "מספר טלפון אינו נכון", "warning");
        $('#userPhoneRegistration').focus();
        return
    }
    //check password inputs are equals
    if (pass1.val() != pass2.val()) {
        swal("!שים לב", "הסיסמאות אינם תואמות", "warning");
        $('#pass1Registration').focus();
        return;
    }
    //send post request to create a new user
    $.ajax({
        async: false,
        type: 'POST',
        url: addRegister,
        data: {
            firstName: firstName.val(),
            lastName: lastName.val(),
            userName: userName.val(),
            userEmail: userEmail.val(),
            userPhone: userPhone.val(),
            password: pass1.val(),
        },
        success: function (response) {
            if (response == " 0")
                swal("טעות", "?קיים שם משתמש/אימייל כזה, נרשמת כבר לא", "warning");
            else {
                localStorage.setItem("firstNameBuyer", firstName.val());
                localStorage.setItem("lastNameBuyer", lastName.val());
                localStorage.setItem("userNameBuyer", userName.val());
                localStorage.setItem("phoneBuyer", userEmail.val());
                localStorage.setItem("emailBuyer", userPhone.val());
                localStorage.setItem("UserIdBuyer", response.replace(/\s+/g, ''));
                swal("נוצר מוכר חדש", "כעת, תוכל להנות מקנייה משותפת", "success");
                location.reload();
            }

        }
    });

}

///phonenumber check the phone number function
function phonenumber() {
    inputtxt = $('#userPhoneRegistration').val();
    var phoneno = /^\d{10}$/;
    if ((inputtxt.match(phoneno))) {
        return true;
    }
    else {
        return false;
    }
}

///create a new password
function newPss() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//send to user the new password
function sendEmailForgot() {
    var password = newPss();
    var emailToSendPassword = $("#emailSendingInput").val();

    if (!validateForm(emailToSendPassword)) {
        swal("טעות", "האימייל אינו נכון נסה שנית", "warning");
        $('#emailSendingInput').focus();
        return
    }
    $.ajax({
        type: 'POST',
        url: sendPassByEmail,
        data: {
            email: emailToSendPassword,
            password: password,
        },
        success: function (response) {
            if (response) {
                swal("אימייל נשלח", "סיסמא חדשה נשלחה לאימייל שצויין", "success");
                $("#myForgotPasswordModal").modal('hide');
                $("#myLogin").modal('hide');
            }
            else
                swal("שגיאה", "נסיון שליחת אימייל עם סיסמה חדשה נכשל", "error");
        }
    });
}

function sendReferences() {
    var userName = $("#userNameSendingInput").val();
    var title = $("#titleSendingInput").val();
    var message = $("#messageTextarea").val();
    if (message == "" || userName == "" || title == "") {
        swal("שגיאה", "!יש למלא את כל השדות", "warning");
        return;
    }

    $.ajax({
        type: 'POST',
        url: sendReferencesUrl,
        data: {
            userName: userName,
            message: message,
            title: title,
        },
        success: function (response) {
            if (response) {
                swal("הפניה נשלחה", "פנייתך התקבלה ותענה בהקדם", "success");
                $('#myBuyerReferencesModal').modal('hide');
            }
            else
                swal("שגיאה", "נסיון שליחת הפניה נכשל", "error");
        }
    });
}
function addFacebookRegister() {
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,email'}, function (response) {
        var firstName = response.first_name;
        var lastName = response.last_name;
        var userEmail = response.email;
        var userName = response.email.substring(0, response.email.indexOf('@'));
        var userId = response.id;
        $.ajax({
            async: false,
            type: 'POST',
            url: addFacebookRegisterDb,
            data: {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                userEmail: userEmail,
                userId: userId,
            },
            success: function (response) {
                if (response == " 0"){
                    $.ajax({
                        type: 'POST',
                        url: getUserNamePassToConnection,
                        data: {
                            userName: userName,
                            password: '1',
                        },
                        success: function (response) {
                            Profile = JSON.parse(response);
                            localStorage.setItem("firstNameBuyer", Profile[0]);
                            localStorage.setItem("lastNameBuyer", Profile[1]);
                            localStorage.setItem("userNameBuyer", Profile[2]);
                            localStorage.setItem("emailBuyer", Profile[4]);
                            localStorage.setItem("UserIdBuyer", Profile[5]);

                        }
                    });

                }else {
                    localStorage.setItem("firstNameBuyer", firstName);
                    localStorage.setItem("lastNameBuyer", lastName);
                    localStorage.setItem("userNameBuyer", userName);
                    localStorage.setItem("phoneBuyer", userEmail);
                    localStorage.setItem("UserIdBuyer", userId);
                }
                window.location.href = "http://buy-with-friends.com/BuyerWeb/";
            }
        });
    });

}

