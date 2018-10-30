<!doctype html>
<html lang="pl">

<?php

require_once('connection.php');

?>

<head>
    <title>Ultimate Snake</title>
    <meta charset="UTF-8">
    <meta name="description" content="Ultimate Snake by Tomasz Pazera for IO">
    <meta name="keywords" content="Snake,OO,Project">
    <meta name="author" content="Tomasz Pazera">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head> 

<body>
    <div class="container">
        <div class="row header">
            <div class="col-lg-12 text-center">
                <div class="page-header">
                    <h1>Ultimate Snake <small>by Tomasz Pazera</small></h1>
                </div>
            </div>
        </div> 
        <p></p>
        <div class="row main-panel">
            <div class="col-lg-5 buttons-panel">
                <div class="form-control btn btn-primary start-button">GAME</div>
                <p></p>
                <div class="form-control btn btn-success ranking-button">RANKING</div>
                <p></p>
                <hr />
                <div class="left-panel game-left-panel">
                    <p></p>
                    <h4>Game Settings</h4>
                    <p></p>
                    <select class="game-map-select custom-select">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                    <p></p>
                    <div class="form-control btn btn-info start-game-button">START</div>
                    <p></p>
                    <hr />
                    <p></p>
                    <h4>Game Statistics</h4>
                    <p></p>
                    <input type="text" disabled class="form-control" value="Points: " id="points">
                </div>
                <div class="left-panel ranking-left-panel">
                    <select class="game-map-select custom-select">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                    <p></p>
                    <div class="form-control btn btn-info start-game-button">SHOW RANKING</div>
                </div>
            </div>
            <div class="col-lg-7 game-panel right-panel">
                <div class="row game">
                    <div class="col-lg-12">
                        <canvas id="game-canvas" width="600" height="600">
                            Twoja przeglądarka nie obsługuje elementu Canvas.
                        </canvas>
                        <div id="game-info">
                            <h1>3</h1>
                        </div>
                        <div id="game-finish">
                            <div class="content">
                                <div class="modal" tabindex="-1" role="dialog">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">GAME OVER</h5>
                                            </div>
                                            <div class="modal-body">
                                                <h5 class="scored-points">Scored points: 150</h5>
                                                <h5>Ranking:</h5>
                                                <p class="ranking-info">
                                                </p>
                            
                                            </div>
                                            <div class="modal-footer">
                                                
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-7 ranking-panel right-panel">
                <div class="row game">
                    <div class="col-lg-12">
                        <div id="ranking-table" class="ranking">
                            <h4>Ranking for map: Easy</h4>
                            <ul>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
    <script src="js/vendor/jquery.js"></script>
    <script src="js/app.js"></script>

</body>

</html>