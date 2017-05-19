/**
 * Created by hudeda on 02/04/2017.
 */
var users;

$(document).ready(function () {
    showUsers();
});

function deleteUserFromDatabase(x) {
    $.ajax({
        type: 'POST',
        url: deleteUserFromDatabaseUrl,
        data: {
            userId: users[x][0],
        },
        success: function (response) {
            if(response = " 1")
                swal("משתמש נמחק","","success");
            else
                swal("משתמש לא נמחק","","error");
            showUsers();
        }
    });
}
function showUsers() {
    $("#buyersShow").empty();
    $.ajax({
        type: 'POST',
        url: getUsers,
        data: {
        },
        success: function (response) {
            if (response.length > 6) {
                users = JSON.parse(response);
                var divChanges = "";
                for (var i = 0; i < users.length; i++) {
                    divChanges+= "<div class='col-md-12 oneBuyerBox'>";
                    divChanges+= "<div class='col-md-6 alineTextInBox'>שם פרטי: ";
                    divChanges+= users[i][1]+"</div>";
                    divChanges+= "<div class='col-md-6 alineTextInBox'>שם משפחה: ";
                    divChanges+= users[i][2]+"</div>";
                    divChanges+= "<div class='col-md-6 alineTextInBox'>שם משתמש: ";
                    divChanges+= users[i][3]+"</div>";
                    divChanges+= "<div class='col-md-6 alineTextInBox'>אימייל: ";
                    divChanges+= users[i][4]+"</div>";
                    divChanges+= "<div class='col-md-6 alineTextInBox'>מס טלפון: ";
                    divChanges+= users[i][5]+"</div>";
                    divChanges+= "<div class='col-md-6 alineTextInBox'>";
                    divChanges+= "<button type='button' class='btnDelete' onclick='deleteUserFromDatabase("+i+")'>מחיקת משתמש</button></div>";
                    divChanges+="</div>";
                }
                $("#buyersShow").append(divChanges);
            }
        }
    });
}