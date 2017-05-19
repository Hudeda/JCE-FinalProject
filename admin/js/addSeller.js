/**
 * Created by hudeda on 02/04/2017.
 */

$(document).ready(function () {
    var addSeller = $("#addSeller");
    addSeller.empty();
    var divChanges ="";
    divChanges+= "<div class='col-md-3 '>שם החברה:";
    divChanges+= "<input type='text' class='form-control' id='companyName'></div>";
    divChanges+= "<div class='col-md-3 '>כתובת החברה:";
    divChanges+= "<input type='text' class='form-control' id='companyAddress'></div>";
    divChanges+= "<div class='col-md-3 '>אימייל החברה:";
    divChanges+= "<input type='text' class='form-control' id='companyEmail'></div>";
    divChanges+= "<div class='col-md-3 '>טלפון החברה:";
    divChanges+= "<input type='text' class='form-control' id='companyPhone'></div>";
    divChanges+= "<button type='submit' class='btn btn-default'onclick='addSeller()'>הוסף מוכר</button>";
    addSeller.append(divChanges);
});

function addSeller(){
    var companyName = $("#companyName").val();
    var companyAddress = $("#companyAddress").val();
    var companyEmail = $("#companyEmail").val();
    var companyPhone = $("#companyPhone").val();
    var password = newPss();
    //if one of the input is not filled
    if (companyName == "" || companyAddress == "" || companyEmail == "" || companyPhone == ""
        || password == "" ) {
        swal("!שים לב","אחד מהשדות אינו מלא", "warning");
        return;
    }
    //check if input email is correct
    if (!validateForm(companyEmail)) {
        swal("!שים לב","אימייל אינו נכון", "warning");
        $('#companyEmail').focus();
        return
    }

    //check the input number
    if (!phonenumber(companyPhone)) {
        swal("!שים לב","מספר טלפון אינו נכון", "warning");
        $('#userPhoneRegistration').focus();
        return
    }


    $.ajax({
        type: 'POST',
        url: addSellerDatabase,
        data: {
            companyName: companyName,
            companyAddress:companyAddress,
            companyEmail:companyEmail,
            companyPhone:companyPhone,
            password:password,
        },
        success: function (response) {
            if(response == ' 1') {
                swal("שינויים בוצעו", "נוצר מוכר חדש", "success");
                showSellers();
            }
            else
                swal("שגיאה", "פרטים של מוכר זה כבר קיימים", "error");

        }
    });

}
///create a new password
function newPss() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
///phonenumber check the phone number function
function phonenumber(x) {

    var phoneno = /^\d{10}$/;
    if ((x.match(phoneno))) {
        return true;
    }
    else {
        return false;
    }
}
function validateForm(x) {
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length)
        return false;
    return true;
}

