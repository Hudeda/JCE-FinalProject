/**
 * Created by hudeda on 07/1/2017.
 */
$(document).ready(function () {
    getProductByCategory();


});
var Products;
var idProduct = 0;
var userNameProduct = 1;
var productName = 2;
var companyName = 3;
var descriptionProduct = 4;
var category = 5;
var numberOfAddPeople = 6;
var numberOfOffers = 7
var imageProduct = 8;
var uploadDate = 9;
var numberOfJoined = 10;
var price = 11;
//this function loading the products by click on any category on nav-bar
function getProductByCategory() {
    if(localStorage.getItem("companyName") == undefined) {
        $("#loader").css('display', "none");
        return;
    }
    var category = $("#categoryText").text();
    var divChanges = "";
    //send a post that return the product from server
    $.ajax({
        type: 'POST',
        url: getProductsForSeller,
        data: {
            category: category,
        },
        success: function (response) {

            if (response.length > 6) {
                Products = JSON.parse(response);

                divChanges += "<div class='container' id='divReplaceByPress'><div class='row' >";
                //print on divReplaceByPress any product in array Products of this category
                for (var i = 0; i < Products.length; i++) {
                    if (checkTime(Products[i][numberOfAddPeople], Products[i][numberOfOffers])) {

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
                        divChanges += "<p>" +  " מס' החברים בקבוצה: " + Products[i][numberOfJoined] +"</p>";
                        divChanges += "<p><button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal' onclick='openDetails(" + i + ")'>פרטים נוספים/הצעת מחיר</button></p>";
                        divChanges += "</div></div></div>";
                    }
                }

                divChanges += "</div>";
                $("#divReplaceByPress").replaceWith(divChanges);
            }
            else
                alert("לא קיימת קבוצה בקטגוריה זו");
            $("#loader").css('display', "none");

        }
    });

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
    divChanges += "<div class='modal-footer'><div class='col-xs-5'><p>הזן הצעת מחיר</p> <input class='form-control' id='ex1' type='number' min='1'>" +
        "<br><button type='button' class='btn btn-success' onclick='sendSellerOffer(" + x + ',' + Products[x][idProduct] + ")' >שליחת הצעה </button></div>" +
        "<div class='col-xs-7'> מספר החברים בקבוצה הינו " + Products[x][numberOfJoined] + "" +
        "<p> המחיר שהוצע עד כה:  " + Products[x][price] + " </p><p>המכרז מסתיים ב- "+getDayBeforeXMonth(Products[x][numberOfOffers])+"</p></div>" +
        "<br><button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>";
    divChanges += "</div> </div></div></div>";

    $("#myModal").replaceWith(divChanges);
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


function sendSellerOffer(indexInProduct, id) {
    var offer = $("#ex1").val();
    if (parseInt(Products[indexInProduct][price]) <= parseInt(offer)) {
        if (parseInt(Products[indexInProduct][price]) == parseInt(offer))
            alert("קיים כבר מחיר זהה למוצר זה");
        else
            alert("תן הצעה קטנה יותר מהמחיר המוצע כרגע");
        return;
    }
    if (parseInt(offer) <= 0) {
        alert("אי אפשר למכור בחינם");
        return;
    }

    $.ajax({
        type: 'POST',
        url: setNewPriceOfProduct,
        data: {
            id: id,
            price: offer,
        },
        success: function (response) {
            if (response.localeCompare(" success") == 0) {
                Products[indexInProduct][price] = offer;

                $.ajax({
                    type: 'POST',
                    url: changeSellerOfProduct,
                    data: {
                        companyId: localStorage.getItem("companyId"),
                        productId: id,
                    },
                    success: function (response) {
                        if (response.localeCompare(" success") == 0) {
                            alert("change as been made");
                        }
                    }
                });
            }

        }
    });
    $('#myModal').modal('hide');

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