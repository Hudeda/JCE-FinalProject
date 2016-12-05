/**
 * Created by hudeda on 05/12/2016.
 */
$(document).ready(function () {

    getProductByCatagory();

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
var numberOfAddPeople = 6;
var imageProduct = 8;
var uploadDate = 9;

//this function loading the products by click on any category on nav-bar
function getProductByCatagory() {
    var catagory = $("#categoryText").text();

    var divChanges = "";
    //start the loading view
    $(".se-pre-con").replaceWith("<div class='se-pre-con'></div>");
    var numberOfOrder = 1;
    //send a post that return the product from server
    $.ajax({
        type: 'POST',
        url: getProducts,
        data: {
            catagory: catagory,
        },
        success: function (response) {
            if (response.length > 6) {

                Products = JSON.parse(response);
                $("#divChanges").hide();
                divChanges += "<div id='divReplaceByPress'>";

                //print on divReplaceByPress any product in array Products of this category
                for (var i = 0; i < Products.length; i++) {
                    if (!checkIfDateArePss(Products[i][uploadDate], Products[i][numberOfAddPeople])) {

                        var stringSub = "";
                        if (Products[i][descriptionProduct].length > 25) {
                            stringSub = "...";
                            stringSub += Products[i][descriptionProduct].substr(0, 25);
                        }
                        else
                            stringSub = Products[i][descriptionProduct];
                        $.ajax({
                            type: 'POST',
                            url: getUsersInProductGroup,
                            async: false,
                            data: {
                                idProduct: Products[i][idProduct],
                            },
                            success: function (response) {
                                numberOfOrder = response;
                            }
                        });

                        divChanges += "<div class='oneProductShow' onclick='openDescription(" + i + ")' style = 'background-image: url(" + Products[i][imageProduct] + ")'>";
                        divChanges += "<div class = 'showDetails'>"
                        divChanges += "<label class='companyName'>" + Products[i][companyName] + ", </label>";
                        divChanges += "<label class='productName'>" + Products[i][productName] + "</label> <br>";
                        divChanges += "<label class='descriptionProduct'>" + stringSub + "</label>";
                        divChanges += "</div><div class='numberOforder' >" + numberOfOrder + " :מס' החברים בקבוצה " + "</div></div>";
                    }
                }

                divChanges += "</div>";
                $("#divReplaceByPressElectricity").replaceWith(divChanges);
            }
            else
                alert("לא קיימת קבוצה בקטגוריה זו");
            //stop the loading view
            $(".se-pre-con").replaceWith("<div class='se-pre-con' hidden></div>");
        }
    });

}
//open description view by click on any product div(display the product in match more details)
function openDescription(idPro) {
    var dateTocloseGroup = getDateAfterXWeeks(Products[idPro][uploadDate], Products[idPro][numberOfAddPeople]);
    var divChanges = "<div id= 'DivShowDetails'> <div class='popupBoxWrapper'> <div class='popupBoxContent'> <div class='container'>";
    divChanges += "<form id = 'formShowDetails'><label class='companyName'>" + Products[idPro][companyName] + ", </label>";
    divChanges += "<label class='productName'>" + Products[idPro][productName] + "</label> <br>";
    divChanges += "<img id = 'imageShowDetails' src=" + Products[idPro][imageProduct] + " ><br>";
    divChanges += "<label class='descriptionProduct'>" + Products[idPro][descriptionProduct] + "</label><br>";
    divChanges += "<label class='descriptionProduct'>" + "הקבוצה נסגרת בתאריך: " + dateTocloseGroup + "</label><br>";
    divChanges += "<input type = button class='buttonJoinGroup' value='הצטרף לרכישה' onclick='addProductByUser(" + idPro + ");'/>";
    divChanges += "<input type = button class='buttonExitJoin' value='יציאה' onclick='hideDetails();'/>";
    divChanges += "</form></div></div></div></div>";
    $("#DivShowDetails").replaceWith(divChanges);
    $("#DivShowDetails").show();
    checkSizeScreen();
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

function getDateAfterXWeeks(datea, x) {
    var date = new Date(datea)
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


function checkSizeScreen() {
    if ($(window).width() < 700) {
        $("#ulSmall").show();
        $("#ulBig").hide();
        $(".popupBoxWrapper").width('90%');
        $("#connection").width('15%');
        $("#cancel").width('10%');
        $("#register").width('15%');
        $("#imageShowDetails").width('50%');
        $("#imageShowDetails").height('20%');

    }
    else {
        $("#ulSmall").hide();
        $("#ulBig").show();
        $(".popupBoxWrapper").width(550);
        $("#connection").width(100);
        $("#register").width(100);
        $("#cancel").width(50);
        $("#imageShowDetails").width(400);
        $("#imageShowDetails").height(400);
    }


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
