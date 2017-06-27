/**
 * Created by hudeda on 03/04/2017.
 */

////showReferencesSellerDB - show all the sellers messages

$(document).ready(function () {
    showReferencesSellerDB();
});

function showReferencesSellerDB() {
    $("#showReferencesSeller").empty();
    var messages="";
    $.ajax({
        type: 'POST',
        url: showReferencesSellerURL,
        data: {
        },
        success: function (response) {
            if (response.length > 6) {
                messages = JSON.parse(response);
                var divChanges = "";
                for (var i = 0; i < messages.length; i++) {
                    divChanges+= "<div class='col-md-12 oneBuyerBox'>";
                    divChanges+= "<div class='col-md-6 alineTextInBox'>שם: ";
                    divChanges+= messages[i][0]+"</div>";
                    divChanges+= "<div class='col-md-6 alineTextInBox'>כותרת: ";
                    divChanges+= messages[i][1]+"</div>";
                    divChanges+= "<div class='col-md-6 alineTextInBox'>תאריך העלאה: ";
                    divChanges+= messages[i][2]+"</div>";
                    divChanges+= "<div class='col-md-6 alineTextInBox'>ההודעה: ";
                    divChanges+= messages[i][3]+"</div>";
                    divChanges+="</div>";
                }
                $("#showReferencesSeller").append(divChanges);
            }
            else
                $("#showReferencesSeller").append("אין פניות!");
        }
    });
}