$(document).ready(function () {
    $(".nav a").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

    $("#homePage").on("click", function(){
        $(".divCategory").show();
    });
    //if there is no local db show connection option else connect with the local db
    if (localStorage.getItem("userName") == undefined) {
        $('#loginBtn').html("התחברות");
        $('#userProduct').hide();
        $('#addProduct').hide();
        $('#userName').text('');
        $('#loginBtn').attr( "data-toggle" ,"modal");

    }
    else {
        $('#loginBtn').html("התנתק");
        $('#userProduct').show();
        $('#addProduct').show();
        $('#userName').text(localStorage.getItem('firstName')+" "+localStorage.getItem('lastName'));
        $('#loginBtn').removeAttr( "data-toggle" );

    }

    $("#loginBtn").click(registration);
    $("#userRegisterBregister").click(checkCorrectUserRegistrAndSendtoDB);
    $("#userConnectionB").click(checkPassword);


    $("#emailSendingButto").click(sendEmailForgot);


});

//if press on connect open the connection popup window else press on disconnect so clear the local db and reload the page
function registration() {
    if ($('#loginBtn').text() == 'התחברות') {
    }
    else {
        localStorage.clear();
        window.location.href = "http://buy-with-friends.com/";

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
                if (response.localeCompare(' Error') == 0) {
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

//checking the user register input and create new user
function checkCorrectUserRegistrAndSendtoDB() {
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
        alert("אחד מהשדות ריק");
        return;
    }
    //check if input email is correct
    if (!validateForm($('#userEmailRegistration').val())) {
        alert("אימייל אינו נכון");
        $('#userEmailRegistration').focus();
        return
    }
    //check the input number
    if (!phonenumber()) {
        alert("מספר טלפון אינו נכון");
        $('#userPhoneRegistration').focus();
        return
    }
    //check password inputs are equals
    if (pass1.val() != pass2.val()) {
        alert("הסיסמאות אינם תואמות");
        $('#pass1Registration').focus();
        return;
    }

    //send post request to create a new user
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
    var email = $("#emailSendingInput").val();

    if (!validateForm(email)) {
        alert("האימייל אינו נכון נסה שנית");
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
                alert("אימייל נשלח");
                location.reload();
            }
            else
                alert("נסיון שליחת אימייל עם סיסמה חדשה נכשל");
        }
    });
}												