/**
 * Created by hudeda on 16/11/2016.
 */
$(document).ready(function () {
    $("#addProductDiv").hide();
    $("#navAddItemTag").click(callAddProduct);
});

function callAddProduct() {
    $('#addProductDiv').show();

}