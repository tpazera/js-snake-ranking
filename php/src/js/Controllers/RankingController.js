function checkIfTop(mapName, points) {
    let ranking = new Ranking(mapName);

    try {
        $("#inputName, #submitButton").remove();
    } catch (err) {
        console.log(err);
    }

    var requestNumberOfPositions = ranking.getNumberOfPositions(mapName);
    requestNumberOfPositions.done(function (numberOfPositions) {
        if (numberOfPositions[0][0] < 10) {
            var requestGetPlace = ranking.getPlace(mapName, points);
            requestGetPlace.done(function (place) {
                inTop(points, parseInt(place) + 1, mapName, "insert");
            })
        } else {
            var requestGetWorstPosition = ranking.getWorstPosition(mapName);
            requestGetWorstPosition.done(function (worstPosition) {
                if (worstPosition[0][0] < points) {
                    var requestGetPlace = ranking.getPlace(mapName, points);
                    requestGetPlace.done(function (place) {
                        inTop(points, parseInt(place) + 1, mapName, "update");
                    });
                } else {
                    notInTop(points);
                }
            });
        }
    });
}

function inTop(points, place, mapName, queryType) {
    $("#game-finish .content").html('<div class="modal" tabindex="-1" role="dialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">GAME OVER</h5> </div><div class="modal-body"> <h5 class="scored-points">Scored points: ' + points + '</h5> <h5>Ranking:</h5> <p class="ranking-info"> Your place in the ranking: ' + place + '!<br>Enter your nickname: <p></p><input type="text" class="form-control" id="inputName" placeholder="Tomek"> </p></div><div class="modal-footer"> <button type="button" id="submitButton" class="btn btn-primary">Send</button> <button type="button" onclick="removeModal()" id="close-modal" class="btn btn-secondary" data-dismiss="modal">Close</button> </div></div></div></div>')
    $("#submitButton").click(function () {
        if($("#inputName").val() == "" || $("#inputName").val() == null) {
            try {
                $(".error-nickname").remove();
            } catch(err) {}
            $(".ranking-info").append('<p></p><div class="error-nickname alert alert-danger" role="alert">Input your nickname!</div>');
        } else if (!isValid($("#inputName").val())) {
            try {
                $(".error-nickname").remove();
            } catch(err) {}
            $(".ranking-info").append('<p></p><div class="error-nickname alert alert-danger" role="alert">You can use only letters and numbers in your nickname!</div>');
        } else {
            let ranking = new Ranking();
            if(queryType == "insert") {
                var request = ranking.addToRanking(mapName, $("#inputName").val(), points);
                request.done(function (e) {
                    console.log("[INSERT] Added to ranking!");
                })
            } else if(queryType == "update") {
                var request = ranking.updateRanking(mapName, $("#inputName").val(), points);
                request.done(function (e) {
                    console.log("[UPDATE] Added to ranking!")
                })
            }
            
            removeModal();
        }
    });
}

function notInTop(points) {
    $("#game-finish .content").html('<div class="modal" tabindex="-1" role="dialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">GAME OVER</h5> </div><div class="modal-body"> <h5 class="scored-points">Scored points: ' + points + '</h5> <h5>Ranking:</h5> <p class="ranking-info"><i>Unfortunately you did not qualify for the ranking.</i></p></div><div class="modal-footer"> <button onclick="removeModal()" id="close-modal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> </div></div></div></div>')
}

function removeModal() {
    $(".modal").remove();
}

function isValid(str) { return /^\w+$/.test(str); }

//Start button
$(".show-ranking-button").click(function() {
    var ranking = new Ranking();
    ranking.showRanking($(".ranking-map-select").val());
    console.log($(".ranking-map-select").val());
});