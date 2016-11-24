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
                var Products = JSON.parse(response);
                $("#divChanges").hide();
                divChanges += "<div id='divReplaceByPress'>";
                for (var i = 0; i < Products.length; i++) {
                    divChanges += "<div class='oneProductShow'><label class='productName'>"+Products[i][1] +", </label>";
                    divChanges +="<label class='companyName'>"+Products[i][2] +"</label> <br>";
                    divChanges +="<img src= '"+Products[i][7]+"' width='200px' height='200dp'/><br><br>";
                    divChanges +="<label class='descriptionProduct'>"+Products[i][3] +"</label>";
                    divChanges +="</div>";
                }
                divChanges +="</div>";
                $("#divReplaceByPress").replaceWith(divChanges);

            }
            else
                alert("Error data input");
        }
    });
}