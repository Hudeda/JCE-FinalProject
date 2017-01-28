/**
 * Created by hudeda on 18/01/2017.
 */
$(document).ready(function () {

    productsOfSeller();
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


function productsOfSeller() {
    var divChanges ="";
    $.ajax({
        type: 'POST',
        url: getProductsOfSeller,
        data: {
            companyId: localStorage.getItem("companyId"),
        },
        success: function (response) {
            Products = JSON.parse(response);
            if (response.length > 6) {
                Products = JSON.parse(response);

                divChanges += "<div id='divReplaceByPress'>";

                //print on divReplaceByPress any product in array Products of this category
                for (var i = 0; i < Products.length; i++) {
                    var stringSub = "";
                    if (Products[i][descriptionProduct].length > 30) {
                        stringSub = "...";
                        stringSub += Products[i][descriptionProduct].substr(0, 30);
                    }
                    else
                        stringSub = Products[i][descriptionProduct];

                    divChanges += "<div class='col-lg-4 col-md-6 col-sm-12 col-xs-12 box'><div class='thumbnail''><img src=" + Products[i][imageProduct] + ">";
                    divChanges += "<div class='caption'><h3>" + Products[i][companyName] + "</h3><h4>" + Products[i][productName] + "</h4>"
                    divChanges += "<p>" + stringSub + "</p><br>"
                    divChanges += "<p>" + Products[i][numberOfJoined] + " :מס' החברים בקבוצה " + "</p>";
                    divChanges += "<p><button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModalDisplayForSeller' onclick='openDisplayForSeller("+i+")' >צפייה בהצעה שלי</button></p>";
                    divChanges += "</div></div></div>";
                }
            }
            divChanges += "</div>";
            $("#divReplaceByPress").replaceWith(divChanges);
        }
    });
}


function openDisplayForSeller(x) {
    var divChanges = "<div class='modal fade' id='myModalDisplayForSeller' role='dialog'>";
    divChanges += "<div class='modal-dialog'>";

    divChanges += "<div class='modal-content'>";
    divChanges += "<div class='modal-header'>";
    divChanges += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
    divChanges += "<h4 class='modal-title'>" + Products[x][productName] + ', ' + Products[x][companyName] + "</h4></div>";
    divChanges += "<div class='thumbnail''><img src=" + Products[x][imageProduct] + "></div>";
    divChanges += "<div class='modal-body'> <p>" + Products[x][descriptionProduct] + "</p></div>";
    divChanges += "<div class='modal-footer'><div class='col-xs-8'> מספר החברים בקבוצה הינו " + Products[x][numberOfJoined] + "" +
        "<p> מחיר שלי הינו:  " + Products[x][price] + " </p><p>המכרז מסתיים ב- "+getDayBeforeXMonth(Products[x][endOfGetOfferDate])+"</p></div>" +
        "<br><button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>";
    divChanges += "</div></div></div></div>";

    $("#myModalDisplayForSeller").replaceWith(divChanges);
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

    var date = dd + '/' + mm + '/' + yyyy +" "+ Hours+":"+Minutes+":"+Seconds;
    return date;
}