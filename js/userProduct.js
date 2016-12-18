/**
 * Created by hudeda on 26/11/2016.
 */
$(document).ready(function () {
    displayUserProducts();
    $(window).resize(checkSizeScreen);

    checkSizeScreen();
});

var Products;
var idProduct = 0;
var userNameProduct = 1;
var productName = 2;
var companyName = 3;
var descriptionProduct = 4;
var category = 5;
var numberOfAddPeople = 6;
var numberOfOffers = 7;
var imageProduct = 8;
var uploadDate = 9;
var numberOfJoined = 10;
function displayUserProducts() {
    Products = [];

    var divChanges = "";
    $.ajax({
        async: false,
        type: 'POST',
        url: getUserProducts,
        data: {
            userName: localStorage.getItem("userName")
        },
        success: function (response) {
            Products = JSON.parse(response);

            for (var i = 0; i < Products.length; i++) {
                divChanges = "";
                divChanges += "<div class = 'oneUserProduct'>";
                divChanges += "<div class = 'textDivUserProduct'>";
                divChanges += "<div class = 'titleProduct'>" + Products[i][companyName] + ", " + Products[i][productName] + "</div>";
                divChanges += "<div class='descriptionUserProduct'>" + Products[i][descriptionProduct] + "</div>";


                if (!checkIfDateArePss(Products[i][uploadDate], Products[i][numberOfAddPeople])) {
                    divChanges += "<div class = 'lableMyProduct'><lable>מספר החברים בקבוצה: "+Products[i][numberOfJoined]+"</lable><br>";
                    divChanges += "<input type = button class='buttonExitFromGroup' value='יציאה' onclick='exitFromGroup(" + Products[i][idProduct] + ");'/>";
                    divChanges += "<br><lable>סיום איסוף אנשים ותחילת קבלת הצעות מחיר: "+getDateAfterXWeeks(Products[i][uploadDate],Products[i][numberOfAddPeople])+"</lable>";
                    divChanges += "</div></div>";
                    divChanges += "<div class='imageDivUserProduct' style = 'background-image: url(" + Products[i][imageProduct] + ")'></div>";
                    divChanges += "</div>";
                    $("#appendItemPeople").append(divChanges);
                }
                else if (!checkIfDateArePss(Products[i][uploadDate], parseInt(Products[i][numberOfAddPeople]) +
                        parseInt(Products[i][numberOfOffers]))) {
                    divChanges += "<input type = button class='buttonExitFromGroup' value='יציאה' onclick='exitFromGroup(" + Products[i][idProduct] + ");'/>";
                    divChanges += "</div>";
                    divChanges += "<div class='imageDivUserProduct' style = 'background-image: url(" + Products[i][imageProduct] + ")'></div>";
                    divChanges += "</div>";
                    $("#appendItemOffers").append(divChanges);

                }
                else {
                    divChanges += "</div>";
                    divChanges += "<div class='imageDivUserProduct' style = 'background-image: url(" + Products[i][imageProduct] + ")'></div>";
                    divChanges += "</div>";
                    $("#appendItemClosed").append(divChanges);

                }
            }
            $("#divChanges").hide();
        }

    });
    $(".se-pre-con").replaceWith("<div class='se-pre-con' hidden></div>");

}
function exitFromGroup(x) {
    $.ajax({
        async: false,
        type: 'POST',
        url: deleteUserProduct,
        data: {
            userName: localStorage.getItem("userName"),
            productId: x
        },
        success: function (response) {
            alert(response);
            if (response) {
                location.reload();
            }
            else {
                alert("לא הצלחת לצאת מהקבוצה");
            }

        }
    });
}
function checkIfDateArePss(date1, x) {
    var date = new Date(date1);
    date.setTime(date.getTime() + x * 86400000 * 7);
    if (date.getTime() > new Date().getTime()) {
        return false;
    }
    else {
        return true;
    }
}
function checkSizeScreen() {
    if ($(window).width() < 700) {
        $(".titlesUserProducts").css('font-size', '25px');
        $(".titleProduct").css('font-size', '20px');
        $(".descriptionUserProduct").css('font-size', '15px');
        $(".buttonExitFromGroup").css('padding', '10px 15px');

    }
    else{
        $(".titlesUserProducts").css('font-size', '30px');
        $(".titleProduct").css('font-size', '30px');
        $(".descriptionUserProduct").css('font-size', '20px');
        $(".buttonExitFromGroup").css('padding', '16px 32px');
    }

    if ($(window).width() < 500) {
        $(".imageDivUserProduct").css('background-size', '80% 70%');
    }
    else
        $(".imageDivUserProduct").css('background-size', '60% 90%');
}

function getDateAfterXWeeks(datea, x) {
    var date = new Date(datea);
    date.setTime(date.getTime() + x * 86400000 * 7);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var date = dd + '/' + mm + '/' + yyyy;
    return date;
}
