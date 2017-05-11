// Send mail for results page without reloading page
$("button#submit-results").click(function(e){

    var yesButton = document.getElementById('yes');
    var noButton = document.getElementById('no');
    
    var resultsAreAcc;
    
    if (yesButton.className == "ui yes button selected") {
        resultsAreAcc = "yes";
    } else if (noButton.className == "ui no button selected"){
        resultsAreAcc = "no";
    } else {
        resultsAreAcc = "n/a";
    }
    
    
    var data;
    if ($("input#consent").prop("checked") == true) {
        data = localStorage.csvData;
    } else {
        data = "consent not received";
    }
    
    jQuery.post("data-viz.php", {

        results: resultsAreAcc,
        data: data
    }, function(data, textStatus){
        e.preventDefault();
    });
});

