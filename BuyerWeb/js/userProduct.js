/**
 * Created by hudeda on 26/11/2016.
 */
$(document).ready(function () {
    $(".divCategory").hide();
    displayUserProducts();
});

var Products;
var idProduct = 0;
var userNameProduct = 1;
var productName = 2;
var companyName = 3;
var descriptionProduct = 4;
var category = 5;
var endOfAddPeopleDate = 6;
var endOfGetOfferDate = 7;
var imageProduct = 8;
var uploadDate = 9;
var numberOfJoined = 10;
var price = 11;
function displayUserProducts() {
    if (localStorage.getItem("UserIdBuyer") == undefined) {
        window.location.href = "http://buy-with-friends.com/BuyerWeb/";
        $("#loader").css('display', "none");
        return;
    }
    Products = [];
    var divChanges = "";
    $.ajax({
        type: 'POST',
        url: getUserProducts,
        data: {
            userName: localStorage.getItem("userNameBuyer"),
            UserId: localStorage.getItem("UserIdBuyer"),
        },
        success: function (response) {
            Products = JSON.parse(response);
            for (var i = 0; i < Products.length; i++) {

                divChanges = "<div class='panel panel-default'><div class='col-lg-4 panel-body'><img src=" + Products[i][imageProduct] + "></div>";
                divChanges += "<div class='col-lg-4'><div class='caption'><h3>" + Products[i][companyName] + "</h3><h4>" + Products[i][productName] + "</h4>"
                divChanges += "<p>" + Products[i][descriptionProduct] + "</p><br>"
                divChanges += "<p>" + " מספר החברים בקבוצה: " + Products[i][numberOfJoined] + "</p>";
                var currentDate = new Date();
                var dateToAddPeople = new Date(Products[i][endOfAddPeopleDate]);
                var dateToGetOffers = new Date(Products[i][endOfGetOfferDate]);

                if (currentDate < dateToAddPeople) {
                    divChanges += "<p> תאריך סוף לאיסוף אנשים: " + getDayBeforeXMonth(Products[i][endOfAddPeopleDate]) + "</p>";
                    divChanges += "<div class='col-lg-4 btn-product' ><p><button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal' onclick='exitFromGroup(" + Products[i][idProduct] + ")'>יציאה מהקבוצה</button></p>";
                    divChanges += "</div></div></div></div></div>";
                    $("#appendItemPeople").append(divChanges);

                }
                else if (currentDate < dateToGetOffers) {
                    divChanges += "<p> המחיר המוצע הינו: " + Products[i][price] + "</p>"
                    divChanges += "<p> תאריך סוף לקבלת הצעות: " + getDayBeforeXMonth(Products[i][endOfGetOfferDate]) + "</p>";

                    divChanges += "<div class='col-lg-4 btn-product' ><p><button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal' onclick='exitFromGroup(" + i + ")'>יציאה מהקבוצה</button></p>";
                    divChanges += "</div></div></div></div></div>";
                    $("#appendItemOffers").append(divChanges);

                }
                else {
                    divChanges += "<p> המחיר שנקבע הינו: " + Products[i][price] + "</p>"
                    divChanges += "</div></div></div></div>";
                    $("#appendItemClosed").append(divChanges);

                }
            }
            $("#loader").css('display', "none");
            $(".rtlStyle").css('display', "block");


        }

    });
}
function exitFromGroup(x) {
    swal({
        title: 'אתה בטוח?',
        text: "אתה רוצה לצאת מהקבוצה",
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
            async: false,
            type: 'POST',
            url: deleteUserProduct,
            data: {
                userName: localStorage.getItem("userNameBuyer"),
                UserId: localStorage.getItem("UserIdBuyer"),
                productId: x
            },
            success: function (response) {
                if (response == " 1") {

                    swal("יצאת", "יצאת מהקבוצה", "success");
                    location.reload();
                }
                else {
                    swal("שגיאה", "לא הצלחת לצאת מהקבוצה", "error");
                }

            }
        });
    })


}

function getDayBeforeXMonth(datea) {
    var date = new Date(datea)

    var Hours = date.getHours(); // => 9
    var Minutes = date.getMinutes(); // =>  30
    var Seconds = date.getSeconds(); // => 51

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    if (Hours < 10) {
        Hours = '0' + Hours
    }
    if (Minutes < 10) {
        Minutes = '0' + Minutes
    }
    if (Seconds < 10) {
        Seconds = '0' + Seconds
    }

    var date = dd + '/' + mm + '/' + yyyy + " " + Hours + ":" + Minutes + ":" + Seconds;
    return date;
}
