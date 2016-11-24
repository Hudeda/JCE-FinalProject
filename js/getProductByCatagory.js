/**
 * Created by hudeda on 21/11/2016.
 */
$(document).ready(function () {
    $("#navMyElectricityTag").click({val: "0"},getProductByCatagory);
    $("#navTouristTag").click({val: "1"},getProductByCatagory);
    $("#navMyComputerTag").click({val: "2"},getProductByCatagory);
    $("#navMySportTag").click({val: "3"},getProductByCatagory);
    $("#navMyCellularTag").click({val: "4"},getProductByCatagory);
    $("#navMyCarTag").click({val: "5"},getProductByCatagory);
    $("#navOtherTag").click({val: "6"},getProductByCatagory);
});
var Products;
function getProductByCatagory(event) {
    var catagory;
    if(event.data.val == "0")
        catagory = $("#navMyElectricityTag").text();
    else if(event.data.val == "1")
        catagory = $("#navTouristTag").text();
    else if(event.data.val == "2")
        catagory = $("#navMyComputerTag").text();
    else if(event.data.val == "3")
        catagory = $("#navMySportTag").text();
    else if(event.data.val == "4")
        catagory = $("#navMyCellularTag").text();
    else if(event.data.val == "5")
        catagory = $("#navMyCarTag").text();
    else
        catagory = $("#navOtherTag").text();

    var divChanges = "";
    $.ajax({
        type: 'POST',
        url: getProducts,
        async: false,
        data: {
            catagory :catagory,
        },
        success: function (response) {
            if (response.length > 6) {
                Products = JSON.parse(response);
                $("#divChanges").hide();
                divChanges += "<div id='divReplaceByPress'>";


                for (var i = 0; i < Products.length; i++) {
                    var stringSub = "";
                    if(Products[i][3].length > 16) {
                        stringSub = Products[i][3].substr(0, 16);
                        stringSub += "...";
                    }
                    else
                        stringSub = Products[i][3];

                    divChanges += "<div class='oneProductShow' onclick='openDescription("+i+")' style = 'background-image: url("+ Products[i][7]+")'>";
                    divChanges += "<div class = 'showDetails'>"
                    divChanges += "<label class='companyName'>"+Products[i][2] +", </label>";
                    divChanges +="<label class='productName'>"+Products[i][1] +"</label> <br>";
                    divChanges +="<label class='descriptionProduct'>"+stringSub +"</label>";
                    divChanges +="</div></div>";
                }
                divChanges +="</div>";
                $("#divReplaceByPress").replaceWith(divChanges);

            }
            else
                alert("Error data input");
        }
    });
}
function openDescription(x) {
    var divChanges = "<div id= 'DivShowDetails'> <div class='popupBoxWrapper'> <div class='popupBoxContent'> <div class='container'>";
    divChanges += "<form id = 'formShowDetails'><label class='companyName'>"+Products[x][1] +", </label>";
    divChanges +="<label class='productName'>"+Products[x][2] +"</label> <br>";
    divChanges +=  "<img id = 'imageShowDetails' src="+Products[x][7]+" ><br>";
    divChanges +="<label class='descriptionProduct'>"+Products[x][3] +"</label><br>";
    divChanges +="<input type = button class='buttonJoinGroup' value='הצטרף לרכישה' onclick='hideDetails();'/>";
    divChanges += "</form></div></div></div></div>";
    $("#DivShowDetails").replaceWith(divChanges);
    $("#DivShowDetails").show();
}

function hideDetails(){
    $("#DivShowDetails").hide();

}