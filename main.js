
Status="";
objects=[];
object_name="";
found="";
notfound="";
Of="";
synth="";
utterThis="";


function preload(){
    found=loadSound("found.mp3");
    notfound=loadSound("not found.mp3");
}

function setup(){
    canvas = createCanvas(500, 420);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;


}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
    document.getElementById("numofobjects").innerHTML = "results : none";
    object_name=document.getElementById("objectname").value;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video, 0, 0, 500, 420);
        if(Status !=""){
            r=random(255);
            g=random(255);
            b=random(255);
            objectDetector.detect(video, gotResult);
            for(i=0; i<objects.length; i++){
                document.getElementById("status").innerHTML = "status : object found";
                document.getElementById("numofobjects").innerHTML = "Results : "+objects.length;
                fill(100,0,0);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " "+ percent +"%", objects[i].x, objects[i].y);
                noFill();
                stroke(100,0,0);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                if(objects[i].label == object_name){
                    video.stop();
                    objectDetector.detect(gotResult);
                    document.getElementById("status").innnerHTML=object_name+"found";
                    synth = window.speechSynthesis; 
                    utterThis = new SpeechSynthesisUtterance(object_name + "Found"); 
                    synth.speak(utterThis);
                  
                }
                else{
                    document.getElementById("status").innnerHTML="Object Not Found";
                    
                }
                
                
            }
        }

}

