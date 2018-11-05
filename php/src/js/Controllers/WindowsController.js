//
// ─── CONTROLLER FOR BUTTONS GENERATING WINDOWS ─────────────────────────────────────────────────────
//

$( document ).ready(function() {
    //show first panel - game panel
    $(".game-panel").css("display", "block");
    $(".game-left-panel").css("display", "block");
    //bool for animation
    var animation_end = true;
    //"GAME" Button
    $(".buttons-panel .start-button, .buttons-panel .map-button, .buttons-panel .ranking-button").click(function() {
        if(animation_end) {
            animation_end = false;
            var active_button = $(this);
            $(".right-panel, .left-panel").animate({
                opacity: 0,
            }, 500, function (){});
            setTimeout(function(){ 
                $(".right-panel, .left-panel").css("display", "none");
                var btn_name = "start-button";
                if($(active_button).hasClass("start-button")) btn_name = ".game-panel, .game-left-panel";
                else btn_name = ".ranking-panel, .ranking-left-panel"; 
                if($(active_button).hasClass("ranking-button")) {
                    var ranking = new Ranking();
                    ranking.showRanking($(".ranking-map-select").val());
                    console.log($(".ranking-map-select").val());
                }
                $(btn_name).css("display", "block");
                $(btn_name).animate({
                    opacity: 1,
                }, 500, function (){});
            }, 510);
            setTimeout(function(){ 
                animation_end = true;
            }, 1020);
        }
    })
});