/**
 * Created by hudeda on 16/11/2016.
 */
$(document).ready(function () {
    $("#addProduct").click(saveProductDb);
    $("#cancelAddProduct").click(function () {$("#addProductDiv").hide()});
});
var target;
function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', reader.result).width(100).height(100).show();
            target = reader.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}


function saveProductDb() {
    alert(target.length);
    var userName = localStorage.getItem("userName");
    if (userName == null) {
        $("#addProductDiv").hide();
        alert("you must connect first");
        return;
    }
    var productName = $("#productName").val();
    var companyName = $("#companyName").val();
    var descriptionProduct = $("#descriptionProduct").val();
    var numberOfAddPeople = $("#numberOfAddPeople").val();
    var numberForGetOffer = $("#numberForGetOffer").val();
    var category = $("#selectCategory").val();
    if (productName != "" && companyName != "" && descriptionProduct != "" && numberOfAddPeople != "" && category != "בחר קטגוריה" && category != undefined && numberForGetOffer != "" && target != undefined) {

        $.ajax({
            type: 'POST',
            url: addProductDb,
            async: false,
            data: {
                productName: productName,
                companyName: companyName,
                descriptionProduct: descriptionProduct,
                numberOfAddPeople: numberOfAddPeople,
                numberForGetOffer: numberForGetOffer,
                userName: userName,
                category: category,
                image: target,
            },
            success: function (response) {
                alert(target.length);
                alert(response.length);
                if (response) {
                    alert("new product created");
                    location.reload();
                }
                else
                    alert("Error data input");
            }
        });
    }
    else
        alert("one of the input is empty");
}

