/**
 * Created by hudeda on 26/11/2016.
 */

/*
 * functionality of add product by buyer
 *
 *1)displayUserProducts - display product that user as joined them
 *2)exitFromGroup - exit from group
 *3)getDayBeforeXMonth - replace between day and month
 *
 *4,5)openPaymentDialog,openPayment- open dialog payment
 *6)payment - payment functionality
 * */
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
        async: false,
        type: 'POST',
        url: getUserProducts,
        data: {
            userName: localStorage.getItem("userNameBuyer"),
            UserId: localStorage.getItem("UserIdBuyer")
        },
        success: function (response) {
            Products = JSON.parse(response);
            for (var i = 0; i < Products.length; i++) {

                divChanges = "<div class='panel panel-default'><div class='col-sm-4 panel-body'><img src=" + Products[i][imageProduct] + "></div>";
                divChanges += "<div class='col-sm-8'><div class='caption'><h3>" + Products[i][companyName] + "</h3><h4>" + Products[i][productName] + "</h4>"
                divChanges += "<p>" + Products[i][descriptionProduct] + "</p><br>"
                divChanges += "<p>" + " מספר החברים בקבוצה: " + Products[i][numberOfJoined] + "</p>";
                var currentDate = new Date();
                var dateToAddPeople = new Date(Products[i][endOfAddPeopleDate]);
                var dateToGetOffers = new Date(Products[i][endOfGetOfferDate]);

                if (currentDate < dateToAddPeople) {
                    divChanges += "<p> תאריך סיום לאיסוף אנשים: " + getDayBeforeXMonth(Products[i][endOfAddPeopleDate]) + "</p>";
                    divChanges += "<div class='col-lg-4 btn-product' ><p><button type='button' class='btn btn-info btn-lg' onclick='exitFromGroup(" + Products[i][idProduct] + ")'>יציאה מהקבוצה</button></p>";
                    divChanges += "</div></div></div></div></div>";
                    $("#appendItemPeople").append(divChanges);

                }
                else if (currentDate < dateToGetOffers) {
                    divChanges += "<div class = 'productPrice'><p>ההצעה הטובה ביותר עד כה: " + Products[i][price] + " ש\"ח</p></div> "
                    divChanges += "<p> תאריך סיום לקבלת הצעות: " + getDayBeforeXMonth(Products[i][endOfGetOfferDate]) + "</p>";

                    divChanges += "<div class='col-lg-4 btn-product' ><p><button type='button' class='btn btn-info btn-lg' onclick='exitFromGroup(" + i + ")'>יציאה מהקבוצה</button></p>";
                    divChanges += "</div></div></div></div></div>";
                    $("#appendItemOffers").append(divChanges);

                }
                else {
                    $.ajax({
                        async: false,
                        type: 'POST',
                        url: getNumberOfOrders,
                        data: {
                            idProduct: Products[i][idProduct]
                        },
                        success: function (response) {

                            divChanges += "<p id='numbrtOfPeople"+Products[i][idProduct]+"'> מספר האנשים ששילמו עבור המוצר: "+response+" </p></div> ";
                        }
                    });
                    divChanges += "<div class = 'productPrice'><p> המחיר שנקבע הינו: " + Products[i][price] + " ש\"ח</p></div> ";
                    divChanges += "<div class='col-lg-4 btn-product' ><p><button type='button' class='btn btn-success btn-lg' data-toggle='modal' data-target='#myModal' onclick='openPaymentDialog(" + i + ")''>תשלום</button> </p>";
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
        text: "האם רוצה לצאת מהקבוצה",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'כן',
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

function openPaymentDialog(x) {
    var divChanges = "<div class='modal fade' id='myModal' role='dialog'>";
    divChanges += "<div class='modal-dialog'>";

    divChanges += "<div class='modal-content'>";
    divChanges += "<div class='modal-header'>";
    divChanges += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
    divChanges += "<h4 class='modal-title'>השלמת פרטים</h4></div>";
    divChanges += "<div class='modal-body'><p>מספר טלפון: <input id='phoneNumberDetail' class='form-control' type='tel' maxlength='10'></p>";
    divChanges += "<p>עיר: <input id='cityDetail' class='form-control' type='text'></p>";
    divChanges += "<p>כתובת מלאה למשלוח המוצר: <input id='addressDetail' class='form-control' type='text'></p>";
    divChanges += "<br><div class='modal-footer'><div class='col-xs-5'><button type='button' class='btn btn-success' data-toggle='modal' data-target='#myCredit' onclick='openPayment(" + Products[x][price]+","+x+ ")''>תשלום</button> </p>";
    divChanges += "</div><button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>";
    divChanges += "</div></div></div>";

    $("#myModal").replaceWith(divChanges);
}

function openPayment(productPrice,x) {

    var divChanges = "<div class='modal fade' id='myCredit' role='dialog'>";
    divChanges += "<div class='col-md-4 col-md-offset-4'> <div class='credit-card-div'>" +
        "<div class='panel panel-default'><div class='panel-heading'> <div class='row'>" +
        "<div class='col-md-12 col-sm-12 col-xs-12'> <h5 class='text-muted'> Credit Card Number</h5>" +
        "</div><div class='col-md-3 col-sm-3 col-xs-3'><input type='text' class='form-control' placeholder='0000' />" +
        "</div><div class='col-md-3 col-sm-3 col-xs-3'><input type='text' class='form-control' placeholder='0000' />" +
        "</div><div class='col-md-3 col-sm-3 col-xs-3'> <input type='text' class='form-control' placeholder='0000' /> " +
        "</div> <div class='col-md-3 col-sm-3 col-xs-3'> <input type='text' class='form-control' placeholder='0000' />" +
        "</div> </div> <div class='row'> <div class='col-md-3 col-sm-3 col-xs-3'> <span class='help-block text-muted small-font'> Expiry Month</span>" +
        "<input type='text' class='form-control' placeholder='MM' /> </div> <div class='col-md-3 col-sm-3 col-xs-3'>" +
        "<span class='help-block text-muted small-font'>  Expiry Year</span> <input type='text' class='form-control' placeholder='YY' />" +
        "</div> <div class='col-md-3 col-sm-3 col-xs-3'> <span class='help-block text-muted small-font'>  CCV</span>" +
        "<input type='text' class='form-control' placeholder='CCV' /> </div> <div class='col-md-3 col-sm-3 col-xs-3'>" +
        "<img src='data:image/png;base64,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' class='img-rounded' />" +
        "</div> </div> <div class='row'> <div class='col-md-12 pad-adjust'> <input type='text' class='form-control' placeholder='Name On The Card'/>" +
        "</div> </div> <div class='row'> <div class='col-md-12 pad-adjust'>";
     divChanges += "</div> </div> <div class='row '> <div class='col-md-6 col-sm-6 col-xs-6 pad-adjust'>" +
        "<input type='submit' class='btn btn-danger' value='CANCEL' data-dismiss='modal'/> </div> <div class='col-md-6 col-sm-6 col-xs-6 pad-adjust'>" +
        "<input type='submit' class='btn btn-warning btn-block' value='PAY NOW' onclick='payment("+x+")'/> </div> </div> </div> </div> </div> </div>";

    $("#myCredit").replaceWith(divChanges);
}

function payment(x) {

    var userId = localStorage.getItem('UserIdBuyer');
    var userName = localStorage.getItem('userNameBuyer');
    var productId = Products[x][idProduct];

    $.ajax({
        async: false,
        type: 'POST',
        url: setPayment,
        data: {
            userId: userId,
            userName: userName,
            productId:productId
        },
        success: function (response) {
            if (response == " 1") {

                swal({
                    title: 'התשלום התבצע',
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'חזור לפריטים שלי',
                    confirmButtonClass: 'btn btn-success btn-lg'
                }).then(function () {
                    $.ajax({
                        async: false,
                        type: 'POST',
                        url: getNumberOfOrders,
                        data: {
                            idProduct: productId
                        },
                        success: function (response) {
                            var s = 'numbrtOfPeople'+productId;
                            $("#"+s).text("מספר האנשים ששילמו עבור המוצר: "+response);
                            $('#myModal').modal('hide');
                            $('#myCredit').modal('hide');
                        }

                    });
                })
            }
            else {
                swal("שגיאה", "כבר התבצע חיוב עבור מוצר זה!", "error");
            }

        }
    });


}