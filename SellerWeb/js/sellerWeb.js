/**
 * Created by hudeda on 18/12/2016.
 */
$(document).ready(function () {

    $("#loginBtn").click(registration);

    if (localStorage.getItem("companyName") == undefined) {
        $('#loginBtn').text('התחברות');
        $('#MyProducts').hide();

    }
    else {
        $('.divCategory').show();
        $('#loginBtn').text('התנתק');
        $('#MyProducts').show();

    }

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

function getUserProductsFromDb() {
    var category = $(this).attr("value");
    $('.optionCategorySelection').css("display", 'none');
    var divChanges = "";
    $.ajax({
        type: 'POST',
        url: getProducts,
        data: {
            catagory: category,
        },
        success: function (response) {
            if (response.length > 6) {
                Products = JSON.parse(response);
                $("#divChanges").hide();

                divChanges += "<div id='divReplaceByPress'>";

                //print on divReplaceByPress any product in array Products of this category
                for (var i = 0; i < Products.length; i++) {
                    if (checkIfDateArePss(Products[i][uploadDate], Products[i][endOfAddPeopleDate]) && !checkIfDateArePss(Products[i][uploadDate], parseInt(Products[i][endOfGetOfferDate]) + parseInt(Products[i][endOfAddPeopleDate]))) {
                        divChanges += "<div class='oneProductShow' onclick='openDescription(" + i + ")' style = 'background-image: url(" + Products[i][imageProduct] + ")'>";
                        divChanges += "<div class = 'showDetails'>"
                        divChanges += "<label class='companyName'>" + Products[i][companyName] + ", </label>";
                        divChanges += "<label class='productName'>" + Products[i][productName] + "</label> <br>";
                        divChanges += "<label class='descriptionProduct'>" + Products[i][descriptionProduct] + "</label>";
                        divChanges += "</div><div class='numberOforder' >" + Products[i][numberOfJoined] + " :מס' החברים בקבוצה " + "</div></div>";
                    }
                }
                divChanges += "</div>";
                $("#divReplaceByPress").replaceWith(divChanges);
            }
            else
                alert("לא קיימת קבוצה בקטגוריה זו");
            //stop the loading view
            $(".se-pre-con").replaceWith("<div class='se-pre-con' hidden></div>");
        }
    });

}


function registration() {

    if ($('#loginBtn').text() == 'התחברות') {
        window.location.href = "http://hudeda.netau.net/BuyWithFriendsWeb/SellerWeb/pages/login.php";
    }
    else {
        localStorage.clear();
        window.location.href = "http://hudeda.netau.net/BuyWithFriendsWeb/";
    }
}

