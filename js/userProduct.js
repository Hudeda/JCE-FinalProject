/**
 * Created by hudeda on 26/11/2016.
 */
$(document).ready(function () {
    $("#userProductsDiv").click(displayUserProducts);

});
function displayUserProducts() {
    var Products = [];
    $(".se-pre-con").replaceWith("<div class='se-pre-con'></div>");
    $.ajax({
        type: 'POST',
        url: getUserProducts,
        data: {
            userName: localStorage.getItem("userName"),
        },
        success: function (response) {
            Products = JSON.parse(response);
            for (var i = 0; i < Products.length; i++) {
                alert(Products[i][0] + " " + Products[i][1] + " " + Products[i][2] + " " + Products[i][3] + " " + Products[i][4] + " " + Products[i][5] + " " + Products[i][6] + " " + Products[i][7] + " " + Products[i][9]);
            }
        }

    });
    $(".se-pre-con").replaceWith("<div class='se-pre-con' hidden></div>");

}