var ball;
var database, position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(50,50,10,10);
    ball.shapeColor = "red";
    database = firebase.database();
    position = database.ref("ball/pos");
    position.on("value",readPosition,showError);
    console.log(database);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(ofsetx,ofsety){
    database.ref("ball/pos").set(
        {
            x:ball.x + ofsetx, 
            y:ball.y + ofsety,
        }
    );
}

function readPosition(data){
    var ballPosition = data.val();
    ball.x = ballPosition.x;
    ball.y = ballPosition.y;
    console.log("readPosition" + ballPosition);
}
function showError(){
    console.log("database readError");
}