var myCharacterName
var myCharacterHpHolder
var opponentName
var myopponentHpHolder
var myHp
var opponentHp
var myAttack
var opponentAttack
var character
var Opponent
var pickedCharacter = false;
var pickedOpponent = false;
var characters = {
    "Jon Snow": {
        "Health Points": 140,
        "Attack Power": 22,
        "Counter Attack Power":13,
        "Base Attack Power":5
    },
    "Daenerys Targarian": {
        "Health Points": 160,
        "Attack Power": 25,
        "Counter Attack Power":14,
        "Base Attack Power":10
    },
    "Wun Wun": {
        "Health Points": 200,
        "Attack Power": 24,
        "Counter Attack Power":19,
        "Base Attack Power":20
    },
    "Gregor 'The Mountain' Clegane": {
        "Health Points": 180,
        "Attack Power": 24,
        "Counter Attack Power":16,
        "Base Attack Power":15
    },
    enemies: 3 
};

var theme = function(){
    var audio = new Audio("assets/audio/got_theme.mp3");
    audio.volume = 1;
    audio.play();
}
theme();

$("#j-health").text(characters["Jon Snow"]["Health Points"]);
$("#d-health").text(characters["Daenerys Targarian"]["Health Points"]);
$("#w-health").text(characters["Wun Wun"]["Health Points"]);
$("#g-health").text(characters["Gregor 'The Mountain' Clegane"]["Health Points"]);


$(document).ready(function(){

    $(".character").on("click", function (){

        
        if (pickedCharacter === false) {
            character = $(this); 

            character.remove(); 
            pickedCharacter = true;
            character.removeClass("character").addClass("myCharacter");

            $("#pickedUser").append(character);
            $(".character").removeClass("character").addClass("opponent");
            $("#pick").text("Pick Your Opponent");    
        }
       
        $(".opponent").on("click", function () {
            if (pickedCharacter ===true && pickedOpponent === false) {
                opponent = $(this);
    
                opponent.remove();
                pickedOpponent = true;
                opponent.removeClass("opponent").addClass("myOpponent");       
    
                $("#pickedOpponent").append(opponent);
                $("#pick").text("Available Enemies"); 

            }
        });
    }); 
    $("#attackBtn").on("click", function (){
        myCharacterName =  $(".myCharacter > p").text();
        myCharacterHpHolder = $(".myCharacter > span");
        opponentName = $(".myOpponent > p").text();
        opponentHpHolder = $(".myOpponent > span");

        if (pickedCharacter === false && pickedOpponent === false){
            alert("You need to pick your character and an opponent!");
        }
        else if (pickedCharacter === true && pickedOpponent === false) {
            alert("You need to pick your opponent!");
        }
        else if (pickedCharacter === true && pickedOpponent === true) {
            myHp = parseInt(myCharacterHpHolder.text());
            myAttack = characters[myCharacterName]["Attack Power"];
            opponentHp = parseInt(opponentHpHolder.text());
            opponentAttackk = characters[opponentName]["Counter Attack Power"];

            myHp -= opponentAttack;
            myCharacterHpHolder.text(myHp);
            opponentHp -= myAttack; 
            opponentHpHolder.text(opponentHp);
            $("#attackInfo").text("You attacked " + opponentName + " for " + myAttack + " damage and " + opponentName + " attacked back for " + opponentAttack + " damage.");
            myAttack += characters[myCharacterName]["Base Attack Power"];
            characters[myCharacterName]["Attack Power"] = myAttack; 
            

            if ( myCharacterHpHolder.text() <= 0) { 
                $("#attackInfo").text("You've been killed...May your soul live on!");
                var resetBtn = $("<img>");
                resetBtn.addClass("reset");
                resetBtn.attr("src", "assets/images/reset.png")
                $("#restart").append(resetBtn);
                $("#attackBtn").remove();
                $(resetBtn).on("click", function() {
                    location.reload();
                })
            }

            else if (characters.enemies > 0 && opponentHpHolder.text() <=0) { 
                $("#attackInfo").text("You've defeated " + opponentName + ". Choose your next opponent!");
                $(".myOpponent").remove();
                var enemiesLeft = characters.enemies - 1;
                characters.enemies = enemiesLeft;
                console.log("Enemies left: " + characters.enemies);
                if (characters.enemies === 0) {
                    $("#attackInfo").text("Great job! Remember 'Winter is coming' ");
                    var resetBtn = $("<img>");
                    resetBtn.addClass("reset");
                    resetBtn.attr("src", "assets/images/reset.png");
                    $("#restart").append(resetBtn);
                    $("#attackBtn").remove(); 
                    $(resetBtn).on("click", function() {
                        location.reload();
                    })
                }
                pickedOpponent = false;
            }
        }
    });
});


