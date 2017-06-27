/**
 * Created by hudeda on 05/12/2016.
 */
/*
 * functionality by buyer
 *
 *1)getProductByCategory - get all product by click on category
 *2)ShowProducts - show all product
 *3)openDetails - this function open and set the details of any product
 *4)share - function to share the product on facebook
 *5)getDayBeforeXMonth - replace between day and month
 *6)addProductByUser - add to database user how want to join any group
 *
 * */
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
var endOfAddPeopleDate = 6;
var endOfGetOfferDate = 7;
var imageProduct = 8;
var uploadDate = 9;
var numberOfJoined = 10;

//this function loading the products by click on any category on nav-bar
function getProductByCategory() {

    var category = $("#categoryText").text();

    //send a post that return the product from server
    $.ajax({
        type: 'POST',
        url: getProducts,
        data: {
            category: category
        },
        success: function (response) {
            if (response.length > 6) {
                Products = JSON.parse(response);

                ShowProducts();
                $("#loader").css('display', "none");
            }
            else {
                swal("שגיאה", "לא קיימת קבוצה בקטגוריה זו", "warning");
                window.location.href = "http://buy-with-friends.com/BuyerWeb/#/";
            }
            //stop the loading view
        }
    });
}
function ShowProducts() {
    var divChanges = "";
    divChanges += "<div id='divReplaceByPress'>";

    //this loop print all the product in array Products of this category
    for (var i = 0; i < Products.length; i++) {
        var stringSub = "";
        if (Products[i][descriptionProduct].length > 30) {
            stringSub = "...";
            stringSub += Products[i][descriptionProduct].substr(0, 30);
        }
        else
            stringSub = Products[i][descriptionProduct];

        divChanges += "<div class='panel panel-default'><div class='col-sm-4 panel-body'><img src=" + Products[i][imageProduct] + "></div>";
        divChanges += "<div class='col-sm-8'><div class='caption'><h3>" + Products[i][companyName] + "</h3><h4>" + Products[i][productName] + "</h4>"
        divChanges += "<p>" + stringSub + "</p><br>"
        divChanges += "<p>" + " מספר החברים בקבוצה: " + Products[i][numberOfJoined] + "</p>";
        divChanges += "<div class='col-lg-4 btn-product' ><p><button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal' onclick='openDetails(" + i + ")'>פרטים</button></p>";
        divChanges += "</div></div></div></div></div>";
    }

    divChanges += "</div>";
    //inset the product
    $("#divReplaceByPress").replaceWith(divChanges);
}
//open description view by click on any product div(display the product in match more details)
function openDetails(x) {
    $("#shareBtn").prop('disabled',false);
    var divChanges = "<div class='modal fade' id='myModal' role='dialog'>";
    divChanges += "<div class='modal-dialog'>";

    divChanges += "<div class='modal-content'>";
    divChanges += "<div class='modal-header'>";
    divChanges += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
    divChanges += "<h4 class='modal-title'>" + Products[x][productName] + ', ' + Products[x][companyName] + "</h4></div>";
    divChanges += "<div class='thumbnail''><img src=" + Products[x][imageProduct] + "></div>";
    divChanges += "<div class='modal-body'> <p>" + Products[x][descriptionProduct] + "</p></div>";
    divChanges += "<div class='modal-footer'><div class='col-sm-4 '><br><button type='button' class='btn btn-success' onclick='addProductByUser(" + x + ")'>הצטרף לקבוצה </button><br> <div class='col-sm-4 btn-product' ><button type='button' id='shareBtn' class='btn btn-info btn-lg' onclick='share("+x+")'>שיתוף בפייסבוק</button></div></div>" +
        "<div class='col-sm-8'> מספר החברים בקבוצה הינו " + Products[x][numberOfJoined] + "" +
        "<p>תאריך הצטרפות חברים לקבוצה: " + getDayBeforeXMonth(Products[x][endOfAddPeopleDate]) + "</p>" +
        "<p>המכרז מסתיים ב: " + getDayBeforeXMonth(Products[x][endOfGetOfferDate]) + "</p></div>" +
        "<br><button type='button' class='btn btn-default exitDetails' data-dismiss='modal'>Close</button>";
    divChanges += "</div> </div></div></div>";


    $("#myModal").replaceWith(divChanges);
}

function share(x) {
    $("#shareBtn").prop('disabled',true);
    FB.api("/me/feed",
        "POST",
        {
            "link": Products[x][imageProduct],
            "message": "קנייה משותפת באמצעות מכרז הפוך שווה להיכנס!" +"\n"+
            "אני כבר הצטרפתי לקנייה " +Products[x][productName] + ', ' + Products[x][companyName]+"\n"+
            "הצטרפו יחד איתי לקבוצה כדי וביחד נשיג מחיר טוב יותר עבור המוצר"+"\n"+
            " http://buy-with-friends.com ",
        },

        function (response) {
            swal("שותף בהצלחה", "", "success");
            window.open("https://www.facebook.com/profile.php");

        }
    );

}

//return the day in date before the month
function getDayBeforeXMonth(datea) {

    var date = new Date(datea);

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
    var UserIdBuyer = localStorage.getItem("UserIdBuyer");
    if (UserIdBuyer == undefined) {
        swal("שגיאה", "יש להתחבר לפני השימוש באתר", "error");
        $('#myModal').modal('hide');
        return;
    }
    //get the real idProduct
    var idProductSend = Products[idPro][idProduct];
    //send post request to join the group

    $.ajax({
        type: 'POST',
        url: addProductByUserDB,
        data: {
            UserIdBuyer: UserIdBuyer,
            idProduct: idProductSend,
            userName: localStorage.getItem("userNameBuyer"),
        },
        success: function (response) {
            if (response == " 1") {
                swal("הצטרפת לקבוצה", "כעת, תוכל לצפות בקבוצה בפריטים שלך", "success");
                $('#myModal').modal('hide');
            }

            else {
                swal("שגיאה", "הינך כבר רשם לקבוצה זו", "error");
                $('#myModal').modal('hide');
            }
        }
    });
}
