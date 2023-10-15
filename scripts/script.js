
let rotateFactor = 0.001;
let canvasSize = 340;


function setup() {
    let canvas = createCanvas(canvasSize, canvasSize, WEBGL);
    canvas.parent('p5Canvas');
}

let pts = scaleTranslatePointsXY(window.faceData.scaledMesh);
let ptsSil = scaleTranslatePointsXY(window.faceData.annotations.silhouette);

function draw() {
    // auto rotate
    // rotateY(frameCount*rotateFactor);

    // rotate based on mouse pointer movement
    rotateX(-mouseY*rotateFactor);
    rotateY(PI - PI/12 + mouseX*rotateFactor);
    
    clear();

    if(window.faceData){
        // 478 dots - face points
        noStroke();
        
        for(let pt of pts){
            strokeWeight(3);
            beginShape(POINTS);
            vertex(pt[0], pt[1], pt[2]);
            endShape();
        }

        // silhouette
        fill(235,70,76,240);
        // noStroke();
        beginShape();
        
        for(let pt of ptsSil){
            vertex(pt[0], pt[1], pt[2]);
        }
        endShape(CLOSE);
        
    }
}


function scaleTranslatePointsXY(pts){

    // find centroid of shape
    // translate such that centroid of face gets to centre of canvas aka origin (0,0,0)
    // scale everything to fit within the canvas

    let pts2 = pts; 
    
    // :: find centroid ::
    let xSum = 0, ySum = 0;
    let xBig = 0; yBig = 0;

    for (let i = 0; i<pts2.length; i++){
        xSum += pts2[i][0];
        ySum += pts2[i][1];

        // largest coordinate in X
        if (pts2[i][0] > xBig){
            xBig = pts2[i][0];
        }
        // largest coordinate in Y
        if (pts2[i][1] > yBig){
            yBig = pts2[i][1];
        }
    }
    
    centroidX = xSum/pts2.length;
    centroidY = ySum/pts2.length;
    
    // :: translate ::

    // sig(x_i)/N       = C_x
    // C'_x             = 0
    // sig(x_i)/N + h_x = C_x + h_x = C'_x = 0
    // h                = 0 - C_x
    
    // assuming square canvas


    for (let i = 0; i<pts2.length; i++){
        pts2[i][0] -= centroidX;
        pts2[i][1] -= centroidY;
    }

    // :: scale :: sucks for time being
    // for (let i = 0; i<pts2.length; i++){
    //     pts2[i][0] = (pts2[i][0]/xBig)*canvasSize;
    //     pts2[i][1] = (pts2[i][1]/yBig)*canvasSize;
    // }

    return pts2;
}
