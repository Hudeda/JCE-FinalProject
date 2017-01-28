/**
 * Created by hudeda on 05/12/2016.
 */
$(document).ready(function () {

    getProductByCategory();

});
function hideDetails() {
    $("#DivShowDetails").hide();
}
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

//this function loading the products by click on any category on nav-bar
function getProductByCategory() {
    var category = $("#categoryText").text();

    var divChanges = "";
    //start the loading view
    var numberOfOrder = 1;
    //send a post that return the product from server

    $.ajax({
        type: 'POST',
        url: getProducts,
        data: {
            category: category,
        },
        success: function (response) {
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

                    divChanges += "<div class='panel panel-default'><div class='col-lg-4 panel-body'><img src=" + Products[i][imageProduct] + "></div>";
                    divChanges += "<div class='col-lg-4'><div class='caption'><h3>" + Products[i][companyName] + "</h3><h4>" + Products[i][productName] + "</h4>"
                    divChanges += "<p>" + stringSub + "</p><br>"
                    divChanges += "<p>" +" מספר החברים בקבוצה: " + Products[i][numberOfJoined] + "</p>";
                    divChanges += "<div class='col-lg-4 btn-product' ><p><button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal' onclick='openDetails(" + i + ")'>פרטים</button></p>";
                    divChanges += "</div></div></div></div></div>";
                }

                divChanges += "</div>";
                $("#divReplaceByPress").replaceWith(divChanges);
                $("#loader").css('display', "none");

            }
            else
                alert("לא קיימת קבוצה בקטגוריה זו");
            //stop the loading view
        }

    });
}
//open description view by click on any product div(display the product in match more details)
function openDetails(x) {
    var divChanges = "<div class='modal fade' id='myModal' role='dialog'>";
    divChanges += "<div class='modal-dialog'>";

    divChanges += "<div class='modal-content'>";
    divChanges += "<div class='modal-header'>";
    divChanges += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
    divChanges += "<h4 class='modal-title'>" + Products[x][productName] + ', ' + Products[x][companyName] + "</h4></div>";
    divChanges += "<div class='thumbnail''><img src=" + Products[x][imageProduct] + "></div>";
    divChanges += "<div class='modal-body'> <p>" + Products[x][descriptionProduct] + "</p></div>";
    divChanges += "<div class='modal-footer'><div class='col-xs-5'><br><button type='button' class='btn btn-success' onclick='addProductByUser(" + x + ")'>הצטרף לקבוצה </button></div>" +
        "<div class='col-xs-7'> מספר החברים בקבוצה הינו " + Products[x][numberOfJoined] + "" +
        "<p>המכרז מסתיים ב- " + getDayBeforeXMonth(Products[x][endOfGetOfferDate]) + "</p></div>" +
        "<br><button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>";
    divChanges += "</div> </div></div></div>";

    $("#myModal").replaceWith(divChanges);
}

function checkTime(addPeopleTime) {
    var nowTime = new Date();
    var dateAddPeopleTime = new Date(addPeopleTime);
    if (nowTime < dateAddPeopleTime)
        return true;
    else
        return false;
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


//add to database user how want to join any group
function addProductByUser(idPro) {
    var userName = localStorage.getItem("userName");
    if (userName == undefined) {
        alert("יש להתחבר לפני השימוש באתר");
        return;
    }
    //get the real idProduct
    var idProductSend = Products[idPro][idProduct];
    //send post request to join the group
    $.ajax({
        type: 'POST',
        url: addProductByUserDB,
        data: {
            userName: userName,
            idProduct: idProductSend,
        },
        success: function (response) {
            if (response != " ") {
                alert("הצטרת לקבוצה");
                $("#DivShowDetails").hide();
            }

            else
                alert("הינך כבר רשם לקבוצה זו");
        }
    });
}
