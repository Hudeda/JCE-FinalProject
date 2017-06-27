/**
 * Created by hudeda on 02/04/2017.
 */
/*
 * functionality of show/delete buyer by admin
 *
 *1)deleteSellerFromDatabase - this function delete seller from database
 *2)showSellers - show all sellers
 *
 * */
var sellers;
$(document).ready(function () {
    showSellers();
});

function deleteSellerFromDatabase(x) {
    $.ajax({
        type: 'POST',
        url: deleteSellerFromDatabaseUrl,
        data: {
            idSeller: sellers[x][0],
        },
        success: function (response) {
            if (response = " 1")
                swal("מוכר נמחק", "", "success");
            else
                swal("שגיאה", "לא היה ניתן למחוק את המוכר", "error");
            showSellers();
        }
    });
}

function showSellers() {
    $("#sellersShow").empty();
    $.ajax({
        type: 'POST',
        url: getSellers,
        data: {},
        success: function (response) {
            if (response.length > 6) {
                sellers = JSON.parse(response);
                var divChanges = "";
                for (var i = 0; i < sellers.length; i++) {
                    divChanges += "<div class='col-md-12 oneSellersBox'>";
                    divChanges += "<div class='col-md-6 alineTextInBox'>מספר מזהה: ";
                    divChanges += sellers[i][0] + "</div>";
                    divChanges += "<div class='col-md-6 alineTextInBox'>שם החברה: ";
                    divChanges += sellers[i][1] + "</div>";
                    divChanges += "<div class='col-md-6 alineTextInBox'>כתובת החברה: ";
                    divChanges += sellers[i][2] + "</div>";
                    divChanges += "<div class='col-md-6 alineTextInBox'>אימייל: ";
                    divChanges += sellers[i][3] + "</div>";
                    divChanges += "<div class='col-md-6 alineTextInBox'>טלפון: ";
                    divChanges += sellers[i][4] + "</div>";
                    divChanges += "<div class='col-md-6 alineTextInBox'>";
                    divChanges += "<button type='button' class='btnDelete' onclick='deleteSellerFromDatabase(" + i + ")'>מחיקת משתמש</button></div>";
                    divChanges += "</div>";
                }
                $("#sellersShow").append(divChanges);
            }
        }
    });
}