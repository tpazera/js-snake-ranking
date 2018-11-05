class Ranking {

    constructor() {}

    showRanking(mapName) {
        $.ajax({
            type: "GET",
            url: "/queries/get-ranking.php",
            data: {
                'mapName': "'" + mapName + "'"
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',

            success: function (json) {

                let i = 0;
                let html = "";
                for (let key in json) {
                    let row = json[key];
                    let userName = row[0];
                    let points = row[1];
                    html += '<tr><th scope="row">' + ++i +'</th><td>' + userName +'</td><td>' + points +'</td></tr>'

                }

                $('#ranking-table h4').html("Ranking for map: " + mapName);
                $('#ranking-table .table tbody').html(html);

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
            url: "/queries/get-worst-position.php",
            data: {
                'map': "'" + mapName + "'"
            }
        });
    }

    getNumberOfPositions(mapName) {
        return $.ajax({
            type: "GET",
            url: "/queries/get-number-positions.php",
            data: {
                'map': "'" + mapName + "'"
            }
        });
    }

    getPlace(mapName, points) {
        return $.ajax({
            type: "GET",
            url: "/queries/get-place.php",
            data: {
                'map': "'" + mapName + "'",
                'points': points
            }
        });
    }

    addToRanking(mapName, userName, points) {
        return $.ajax({
            type: "POST",
            url: "/queries/add-to-ranking.php",
            data: {
                'map': "'" + mapName + "'",
                'user': "'" + userName + "'",
                'points': points
            }
        });
    }

    updateRanking(mapName, userName, points) {
        return $.ajax({
            type: "POST",
            url: "/queries/update-ranking.php",
            data: {
                'map': "'" + mapName + "'",
                'user': "'" + userName + "'",
                'points': points
            }
        });
    }

}