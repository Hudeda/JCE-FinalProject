/**
 * Created by hudeda on 05/12/2016.
 */
var Products = [];
// $(document).ready(function () {
//
//     $.ajax({
//         type: 'POST',
//         url: getFourLastProductsAdded,
//         data: {
//         },
//         success: function (response) {
//             Products = JSON.parse(response);
//             displayTwentyLastProducts();
//
//         }
//     });
// });
var idProduct = 0;
var userNameProduct = 1;
var productName = 2;
var companyName = 3;
var descriptionProduct = 4;
var category = 5;
var numberOfAddPeople = 6;
var imageProduct = 8;
var uploadDate = 9;

function displayTwentyLastProducts() {
    
    var divChanges = "<div id='displayTwentyLastProducts'>";
    for (var i = 0; i < Products.length; i++) {

        divChanges += "<div class='displayOneLastProduct'>";
        var stringSub = "";
        if (Products[i][descriptionProduct].length > 16) {
            stringSub = "...";
            stringSub += Products[i][descriptionProduct].substr(0, 16);
        }
        else
            stringSub = Products[i][descriptionProduct];

        divChanges += "<div class='imagesEntryProducts' style = 'background-image: url(" + Products[i][imageProduct] + ")'></div>";
        divChanges += "<div class = 'showProductDetailsEntry'>"
        divChanges += "<label class='companyNameEntry'>" + Products[i][companyName] + ", </label>";
        divChanges += "<label class='productNameEntry'>" + Products[i][productName] + "</label><br>";
        divChanges += "<label class='descriptionProductEntry'>" + stringSub + "</label>";
        divChanges += "</div></div>";
    }
    divChanges += "</div>";
    $(".newsProduct").replaceWith(divChanges);


}