$(document).ready(function () {

    $("#connect").click(registration);

    $("#cancel").click(function () {
        $('#popupBoxOnePosition').hide();
    });

    $("#register").click(function () {
        $('#popupBoxOnePosition').hide();
        $('#popupRegister').show();
    });

    $("#registerRedID").click(function () {
        $('#popupRegister').hide();
        $('#popupBoxOnePosition').show();
    });

    $("#registerGreenID").click(checkCorrectUserRegistrAndSendtoDB);

    $("#connection").click(checkPassword);

    if (localStorage.getItem("userName") == undefined) {
        $('#nameOfUser').text('אורח');
        $('#connect').text('התחבר');
    }
    else {
        $('#nameOfUser').text(localStorage.getItem("userName"));
        $('#connect').text('התנתק');

    }

    $("#forgetPassword").click(function () {
        $("#sendEmailDiv").show()
    });

    $("#emailSendingButto").click(sendEmailForget);

    $("#emailSendingCancel").click(function () {
        $("#sendEmailDiv").hide();
    });

});

function registration() {

    if ($('#connect').text() == 'התחבר') {
        $('#popupBoxOnePosition').show();
    }
    else {
        localStorage.clear();
        location.reload();
    }
}

function validateForm(x) {
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length)
        return false;
    return true;
}

//checking if the password match to userName and saving in the local storage
function checkPassword() {

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

                if (response == "Error") {
                    alert("שם משתמש או הסיסמה אינם תואמים");
                    $('#userNameConnection').focus();
                    return;
                }
                Profile = JSON.parse(response);
                localStorage.setItem("firstName", Profile[0]);
                localStorage.setItem("lastName", Profile[1]);
                localStorage.setItem("userName", Profile[2]);
                localStorage.setItem("phone", Profile[3]);
                localStorage.setItem("email", Profile[4]);
                location.reload();

            }
        });
    }
}

function checkCorrectUserRegistrAndSendtoDB() {
    var firstName = $('#firstNameRegistration');
    var lastName = $('#lastNameRegistration');
    var userName = $('#userNameRegistration');
    var userEmail = $('#userEmailRegistration');
    var userPhone = $('#userPhoneRegistration');
    var pass1 = $('#pass1Registration');
    var pass2 = $('#pass2Registration');

    if (firstName.val() == "" || lastName.val() == "" || userName.val() == "" || userEmail.val() == ""
        || userPhone.val() == "" || pass1.val() == "" || pass2.val() == "") {
        alert("אחד מהשדות ריק");
        return;
    }
    if (!validateForm($('#userEmailRegistration').val())) {
        alert("אימייל אינו נכון");
        $('#userEmailRegistration').focus();
        return
    }
    if (!phonenumber()) {
        alert("מספר טלפון אינו נכון");
        $('#userPhoneRegistration').focus();
        return
    }
    if (pass1.val() != pass2.val()) {
        alert("הסיסמאות אינם תואמות");
        $('#pass1Registration').focus();
        return;
    }

    $.ajax({

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
            if (response == " 1") {
                localStorage.setItem("firstName", firstName.val());
                localStorage.setItem("lastName", lastName.val());
                localStorage.setItem("userName", userName.val());
                localStorage.setItem("phone", userEmail.val());
                localStorage.setItem("email", userPhone.val());
                location.reload();
                alert("נוצר יוזר חדש");


            }
            else
                alert("קיים שם משתמש/אימייל כזה");
        }
    });
}

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

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function sendEmailForget() {
    var password = makeid();
    var email = $("#emailSendingInput").val();

    if (!validateForm(email)) {
        alert("this is not a email");
        $('#emailSendingInput').focus();
        return
    }
    $.ajax({
        type: 'POST',
        url: sendEmail,
        data: {
            email: email,
            password: password,
        },
        success: function (response) {
            if (response) {
                alert("send email");
                location.reload();

            }
            else
                alert("&#1513;&#1490;&#1497;&#1488;&#1492; &#1489;&#1491;&#1496;&#1492;");
        }
    });
}												