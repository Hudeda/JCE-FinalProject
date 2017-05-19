/**
 * Created by hudeda on 14/04/2017.
 */

$(document).ready(function () {
    $("#searchProductSeller").click(searchProductSeller);
});
var Products;
var idProduct = 0;
var userNameProduct = 1;
var productName = 2;
var companyName = 3;
var descriptionProduct = 4;
var category = 5;
var endOfAddPeopleDate = 6;
var endOfGetOfferDate = 7
var imageProduct = 8;
var uploadDate = 9;
var numberOfJoined = 10;
var price = 11;
function searchProductSeller() {
    var textSearch = $("#inputSearchSeller").val();
    $.ajax({
        type: 'POST',
        url: searchProductSellerUrl,
        data: {
            textSearch: textSearch,
            companyId: localStorage.getItem("companyIdSeller"),

        },
        success: function (response) {
            if (response.length > 6) {
                Products = JSON.parse(response);
                for (var i = 0; i < Products.length; i++)
                    showProductsAsSearch()

            }
            else {
                $("#divReplaceByPress").replaceWith("<div id='divReplaceByPress'>לא קיימת קבוצה ביחפוש זה</div>");
            }
        }

    });

}

function showProductsAsSearch() {

    var divChanges = "<div class='container' id='divReplaceByPress'><div class='row' >";
    //print on divReplaceByPress any product in array Products of this category
    for (var i = 0; i < Products.length; i++) {
        if (checkTime(Products[i][endOfAddPeopleDate], Products[i][endOfGetOfferDate])) {

            var stringSub = "";
            if (Products[i][descriptionProduct].length > 30) {
                stringSub = "...";
                stringSub += Products[i][descriptionProduct].substr(0, 30);
            }
            else
                stringSub = Products[i][descriptionProduct];

            divChanges += "<div class='col-lg-4 col-md-6 col-sm-12 col-xs-12 box'><div class='thumbnail''><div id='imageProductSeller'><img src=" + Products[i][imageProduct] + "></div>";
            divChanges += "<div class='caption'><h3>" + Products[i][companyName] + "</h3><h4>" + Products[i][productName] + "</h4>"
            divChanges += "<p>" + stringSub + "</p><br>"
            divChanges += "<p>" + " מס' החברים בקבוצה: " + Products[i][numberOfJoined] + "</p>";
            divChanges += "<p><button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal' onclick='openDetails(" + i + ")'>פרטים נוספים/הצעת מחיר</button></p>";
            divChanges += "</div></div></div>";
        }
    }
    divChanges += "</div>";
    $("#divReplaceByPress").replaceWith(divChanges);
}

function openDetails(x) {
    if (Products[x][price] == '0')
        Products[x][price] = "אין עדיין הצעה למוצר זה";
    var divChanges = "<div class='modal fade' id='myModal' role='dialog'>";
    divChanges += "<div class='modal-dialog'>";

    divChanges += "<div class='modal-content'>";
    divChanges += "<div class='modal-header'>";
    divChanges += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
    divChanges += "<h4 class='modal-title'>" + Products[x][productName] + ', ' + Products[x][companyName] + "</h4></div>";
    divChanges += "<div class='thumbnail''><img src=" + Products[x][imageProduct] + "></div>";
    divChanges += "<div class='modal-body'> <p>" + Products[x][descriptionProduct] + "</p></div>";
    divChanges += "<div class='modal-footer'><div class='col-xs-5'><p>הזן הצעת מחיר</p> <input class='form-control' id='offer' type='number' min='1'>" +
        "<br><button type='button' class='btn btn-success' onclick='sendSellerOffer(" + x + ',' + Products[x][idProduct] + ")' >שליחת הצעה </button></div>" +
        "<div class='col-xs-7'> מספר החברים בקבוצה הינו " + Products[x][numberOfJoined] + "" +
        "<p> המחיר שהוצע עד כה:  " + Products[x][price] + " </p><p>המכרז מסתיים ב- "+getDayBeforeXMonth(Products[x][endOfGetOfferDate])+"</p></div>" +
        "<br><button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>";
    divChanges += "</div> </div></div></div>";

    $("#myModal").replaceWith(divChanges);
}


function sendSellerOffer(indexInProduct, id) {
    var offer = $("#offer").val();
    if (parseInt(Products[indexInProduct][price]) <= parseInt(offer)) {
        if (parseInt(Products[indexInProduct][price]) == parseInt(offer))
            swal("!שים לב","קיים כבר מחיר זהה למוצר זה", "warning");
        else
            swal("!שים לב","כדי שתספק לקבוצה זו, יש להזין מחיר נמוך יותר מהמחיר שהוצע עד כה", "warning");
        return;
    }
    if (parseInt(offer) <= 0) {
        swal("!שים לב","לא ניתן אפשר למכור בחינם", "warning");
        return;
    }
    var companyIdSeller = localStorage.getItem("companyIdSeller");
    $.ajax({
        type: 'POST',
        url: setNewPriceOfProduct,
        data: {
            id: id,
            companyId: companyIdSeller,
            price: offer,
        },
        success: function (response) {
            if (response == " 1") {
                Products[indexInProduct][price] = offer;

                $.ajax({
                    type: 'POST',
                    url: changeSellerOfProduct,
                    data: {
                        companyId: companyIdSeller,
                        productId: id,
                    },
                    success: function (response) {
                        if (response == " 1") {
                            swal("שינויים בוצעו בהצלחה","כעת אתה הספק של קבוצה זו", "success");
                        }
                    }
                });
            }

        }
    });
    $('#myModal').modal('hide');

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


function checkTime(addPeopleTime, getOffersTime) {
    var nowTime = new Date();
    var dateAddPeopleTime = new Date(addPeopleTime);
    var dateUploadTime = new Date(getOffersTime);
    if (nowTime > dateAddPeopleTime && nowTime < dateUploadTime)
        return true;
    else
        return false;
}