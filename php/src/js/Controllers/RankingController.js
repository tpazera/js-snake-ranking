function checkIfTop(mapName, points) {
    let ranking = new Ranking(mapName);

    try {
        $("#inputName, #submitButton").remove();
    } catch(err) {
        console.log(err);
    }

    var request = ranking.getNumberOfPositions(mapName);
    request.done(function (numberOfPositions) {
        if(numberOfPositions[0][0] < 10) {
            inTop(points);
        } else {
            var request2 = ranking.getWorstPosition(mapName);
            request2.done(function (worstPosition) {
                if(worstPosition[0][0] < points) {
                    inTop(points);
                } else {
                    notInTop(points);
                }
            });
        }
    });
}

function inTop(points) {
    $(".modal-body .scored-points").html("Scored points: " + points);
    $(".ranking-info").html("Your place in the ranking: 5!<br>Enter your nickname:");
    $(".ranking-info").after('<input type="text" class="form-control" id="inputName" placeholder="Tomek">');
    $(".modal-footer").prepend('<button type="button" id="submitButton" class="btn btn-primary">Send</button>');
}

function notInTop(points) {
    $(".modal-body .scored-points").html("Scored points: " + points);
    $(".ranking-info").html("Unfortunately you did not qualify for the ranking.");
}
