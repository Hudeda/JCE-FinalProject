/**
 * Created by hudeda on 16/11/2016.
 */
var target;
$(document).ready(function () {
    $("#addProductBuyUser").click(saveProductDb);

    $(".image-upload").ImageResize(
        {
            maxWidth: 300,
            onImageResized: function (imageData) {
                $(".images").replaceWith($("<img class='images' src= '"+imageData+"' <img/>"));
            }
        });
});
//save local image string base64

//get the user image and save the base64 string
$.fn.ImageResize = function (options) {
    var defaults = {
        maxWidth: 300,
        maxHeigt: 300,
        onImageResized: null
    }
    var settings = $.extend({}, defaults, options);
    var selector = $(this);

    selector.each(function (index) {
        var control = selector.get(index);
        if ($(control).prop("tagName").toLowerCase() == "input" && $(control).attr("type").toLowerCase() == "file") {
            $(control).attr("accept", "image/*");
            $(control).attr("multiple", "true");

            control.addEventListener('change', handleFileSelect, false);
        }
        else {
            cosole.log("Invalid file input field");
        }
    });

    function handleFileSelect(event) {
        //Check File API support
        if (window.File && window.FileList && window.FileReader) {
            var count = 0;
            var files = event.target.files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only pics
                if (!file.type.match('image')) continue;

                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target;
                    var imageData = picFile.result;


                    var img = new Image();
                    img.src = imageData;
                    img.onload = function () {
                        if (img.width > settings.maxWidth || img.height > settings.maxHeigt) {
                            var width = settings.maxWidth;
                            var height = settings.maxHeigt;

                            if (img.width > settings.maxWidth) {
                                width = settings.maxWidth;
                                var ration = settings.maxWidth / img.width;
                                height = Math.round(img.height * ration);
                            }

                            if (height > settings.maxHeigt) {
                                height = settings.maxHeigt;
                                var ration = settings.maxHeigt / img.height;
                                width = Math.round(img.width * ration);
                            }

                            var canvas = $("<canvas/>").get(0);
                            canvas.width = width;
                            canvas.height = height;
                            var context = canvas.getContext('2d');
                            context.drawImage(img, 0, 0, width, height);
                            imageData = canvas.toDataURL();

                            if (settings.onImageResized != null && typeof (settings.onImageResized) == "function") {
                                settings.onImageResized(imageData);
                            }
                        }
                        target=imageData;

                    }
                    img.onerror = function () {

                    }
                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        } else {
            console.log("Your browser does not support File API");
        }
    }


}

//add a product to server
function saveProductDb() {
    if($('#addProductBuyUser').hasClass("disabled"))
        return;
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
    var endOfAddPeopleDate = $("#endOfAddPeopleDate").val();
    var endOfGetOfferDate = $("#endOfGetOfferDate").val();
    var category = $("#selectCategory").val();
    if(companyName.length >16 || productName.length > 16){
        alert("בבקשה לא לפרט בחברה ובמוצר, לזה קיים תיאור מוצר");
        return;
    }
    //check if one of th input is not filled
    if (productName != "" && companyName != "" && descriptionProduct != "" && endOfAddPeopleDate != "" && category != "בחר קטגוריה" && category != undefined && endOfGetOfferDate != "" && target != undefined) {
        $('#addProductBuyUser').addClass("disabled");

        //send post request to adding the new product
        $.ajax({
            type: 'POST',
            url: addProductDb,
            data: {
                productName: productName,
                companyName: companyName,
                descriptionProduct: descriptionProduct,
                endOfAddPeopleDate: endOfAddPeopleDate,
                endOfGetOfferDate: endOfGetOfferDate,
                userName: userName,
                category: category,
                image: target,
            },
            success: function (response) {
                if (response == ' 1') {
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
