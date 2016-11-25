/**
 * Created by hudeda on 16/11/2016.
 */
$(document).ready(function () {
    $("#addProduct").click(saveProductDb);
    $("#cancelAddProduct").click(function () {$("#addProductDiv").hide()});
});
//save local image string base64
var target;
//get the user image and save the base64 string
function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            if(input.files[0].size > 1048576){
                alert("לא ניתן להעלות קבצים מעל 1 מגה");
                return;
            }
            $('#blah').attr('src', reader.result).width(100).height(100).show();
            target = reader.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

//add a product to server
function saveProductDb() {
    //take the loacl userName
    var userName = localStorage.getItem("userName");
    if (userName == null) {
        $("#addProductDiv").hide();
        alert("ראשית יש צורך בהתחבר");
        return;
    }

    var productName = $("#productName").val();
    var companyName = $("#companyName").val();
    var descriptionProduct = $("#descriptionProduct").val();
    var numberOfAddPeople = $("#numberOfAddPeople").val();
    var numberForGetOffer = $("#numberForGetOffer").val();
    var category = $("#selectCategory").val();
    if(companyName.length >16 || productName.length > 16){
        alert("בבקשה לא לפרט בחברה ובמוצר, לזה קיים תיאור מוצר");
        return;
    }
    //check if one of th input is not filled
    if (productName != "" && companyName != "" && descriptionProduct != "" && numberOfAddPeople != "" && category != "בחר קטגוריה" && category != undefined && numberForGetOffer != "" && target != undefined) {

        //send post request to adding the new product
        $.ajax({
            type: 'POST',
            url: addProductDb,
            async:false,
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
                if (response) {
                    alert("נוצרה קבוצת רכישה חדשה");
                    location.reload();
                }
                else
                    alert("לא היה ניתן ליצור את הקבוצה");
            }
        });
    }
    else
        alert("אחד מהשדות אינו מלא");
}

