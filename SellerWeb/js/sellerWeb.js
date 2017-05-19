/**
 * Created by hudeda on 18/12/2016.
 */
$(document).ready(function () {

    $("#deleteSession").click(deleteSession);
    $("#sendReferences").click(sendReferences);

    if (localStorage.getItem("companyNameSeller") == undefined) {
        $('#userNameSendingInput').val("");
    } else {
        var companyName = localStorage.getItem("companyNameSeller");
        $('#userNameSendingInput').val(companyName);
        swal("שלום "+companyName, ".כעת תוכל להציע מחירים עבור הקבוצות ", "success");
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
var price = 11;


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
            else {
                swal("שגיאה", "לא קיימת קבוצה בקטגוריה זו", "warning");
                window.location.href = "http://buy-with-friends.com/SellerWeb/#/";
            }
            //stop the loading view
            $(".se-pre-con").replaceWith("<div class='se-pre-con' hidden></div>");
        }
    });

}


function deleteSession() {

    swal({
        title: 'בטוח',
        text: "?אתה בטוח רוצה לצאת מהאתר",
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
            type: 'POST',
            url: endSessionSeller,
            data: {},
            success: function (response) {
                localStorage.clear();
                window.location.href = "http://buy-with-friends.com";
            }
        });
    })
}


function sendReferences() {
    var userName = $("#userNameSendingInput").val();
    var title = $("#titleSendingInput").val();
    var message = $("#messageTextarea").val();
    var type;
    if (localStorage.getItem("companyIdSeller") == undefined) {
        type = "else"
    }
    else {
        type = "Seller"
    }
    if (message == "" || userName == "" || title == "") {
        swal("!שים לב","אחד מהשדות אינו מלא", "warning");
        return;
    }

    $.ajax({
        type: 'POST',
        url: sendReferencesUrl,
        data: {
            userName: userName,
            message: message,
            title: title,
            type: type,
        },
        success: function (response) {
            if (response) {
                swal("הפניה נשלחה", "פנייתך התקבלה ותענה בהקדם", "success");
                $('#mySellerReferencesModal').modal('hide');
            }
            else
                swal("שגיאה", "נסיון שליחת הפניה נכשל", "error");
        }
    });
}

