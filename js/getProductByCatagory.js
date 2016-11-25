/**
 * Created by hudeda on 21/11/2016.
 */
$(document).ready(function () {
    $("#navMyElectricityTag").click({val: "0"}, getProductByCatagory);
    $("#navTouristTag").click({val: "1"}, getProductByCatagory);
    $("#navMyComputerTag").click({val: "2"}, getProductByCatagory);
    $("#navMySportTag").click({val: "3"}, getProductByCatagory);
    $("#navMyCellularTag").click({val: "4"}, getProductByCatagory);
    $("#navMyCarTag").click({val: "5"}, getProductByCatagory);
    $("#navOtherTag").click({val: "6"}, getProductByCatagory);
});
var Products;
var idProduct = 0;
var userNameProduct = 1;
var productName = 2;
var companyName = 3;
var descriptionProduct = 4;
var category = 5;
var imageProduct = 8;
function getProductByCatagory(event) {
    var catagory;
    if (event.data.val == "0")
        catagory = $("#navMyElectricityTag").text();
    else if (event.data.val == "1")
        catagory = $("#navTouristTag").text();
    else if (event.data.val == "2")
        catagory = $("#navMyComputerTag").text();
    else if (event.data.val == "3")
        catagory = $("#navMySportTag").text();
    else if (event.data.val == "4")
        catagory = $("#navMyCellularTag").text();
    else if (event.data.val == "5")
        catagory = $("#navMyCarTag").text();
    else
        catagory = $("#navOtherTag").text();

    var divChanges = "";
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


                for (var i = 0; i < Products.length; i++) {
                    var stringSub = "";
                    if (Products[i][descriptionProduct].length > 16) {
                        stringSub = Products[i][descriptionProduct].substr(0, 16);
                        stringSub += "...";
                    }
                    else
                        stringSub = Products[i][descriptionProduct];

                    divChanges += "<div class='oneProductShow' onclick='openDescription(" + i + ")' style = 'background-image: url(" + Products[i][imageProduct] + ")'>";
                    divChanges += "<div class = 'showDetails'>"
                    divChanges += "<label class='companyName'>" + Products[i][companyName] + ", </label>";
                    divChanges += "<label class='productName'>" + Products[i][productName] + "</label> <br>";
                    divChanges += "<label class='descriptionProduct'>" + stringSub + "</label>";
                    divChanges += "</div></div>";
                }
                divChanges += "</div>";
                $("#divReplaceByPress").replaceWith(divChanges);

            }
            else
                alert("Error data input");
        }
    });
}
function openDescription(idPro) {

    var divChanges = "<div id= 'DivShowDetails'> <div class='popupBoxWrapper'> <div class='popupBoxContent'> <div class='container'>";
    divChanges += "<form id = 'formShowDetails'><label class='companyName'>" + Products[idPro][companyName] + ", </label>";
    divChanges += "<label class='productName'>" + Products[idPro][productName] + "</label> <br>";
    divChanges += "<img id = 'imageShowDetails' src=" + Products[idPro][imageProduct] + " ><br>";
    divChanges += "<label class='descriptionProduct'>" + Products[idPro][descriptionProduct] + "</label><br>";
    divChanges += "<input type = button class='buttonJoinGroup' value='הצטרף לרכישה' onclick='addProductByUser(" + idPro + ");'/>";
    divChanges += "<input type = button class='buttonExitJoin' value='יציאה' onclick='hideDetails();'/>";
    divChanges += "</form></div></div></div></div>";
    $("#DivShowDetails").replaceWith(divChanges);
    $("#DivShowDetails").show();
}

function hideDetails() {
    $("#DivShowDetails").hide();

}
function addProductByUser(idPro) {
    var userName = localStorage.getItem("userName");
    if (userName == undefined) {
        alert("you must to connect first");
        return;
    }
    var idProductSend = Products[idPro][idProduct];
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