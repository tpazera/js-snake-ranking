class Ranking {

    constructor() {}

    showRanking(mapName) {
        $.ajax({
            type: "GET",
            url: "get-ranking.php",
            data: {
                'mapName': "'" + mapName + "'"
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',

            success: function (json) {

                console.log(json);

                let i = 0;
                let html = "";
                for (let key in json) {
                    let row = json[key];
                    let userName = row[0];
                    let points = row[1];
                    html += "<li>" + ++i + ". " + userName + " - " + points + "</li>";

                }

                $('#ranking-table h4').html("Ranking for map: " + mapName);
                $('#ranking-table ul').html(html);

            },

            error: function (error) {
                alert("Error on getting data!");
                console.log(error);
            }

        });
    }

    getWorstPosition(mapName) {
        return $.ajax({
            type: "GET",
            url: "/get-worst-position.php",
            data: {
                'map': "'" + mapName + "'"
            }
        });
    }

    getNumberOfPositions(mapName) {
        return $.ajax({
            type: "GET",
            url: "/get-number-positions.php",
            data: {
                'map': "'" + mapName + "'"
            }
        });

    }




    addToRanking(mapName, userName, points) {
        $.ajax({
            type: "POST",
            url: "add-to-ranking.php",
            data: {
                'map': "'" + mapName + "'",
                'user': "'" + userName + "'",
                'points': points

            },

            success: function () {
                console.log("Added to ranking!");
            },

            error: function (error) {
                alert("Error on adding to the ranking!");
                console.log(error);
            }
        });
    }

}