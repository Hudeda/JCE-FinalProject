/**
 * Created by hudeda on 03/04/2017.
 */
$(document).ready(function () {
    showReferencesBuyerDB();
});

function showReferencesBuyerDB() {
    $("#showReferencesBuyer").empty();
    $.ajax({
        type: 'POST',
        url: showReferencesBuyerURL,
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
                $("#showReferencesBuyer").append(divChanges);
            }
        }
    });
}