

prediction_1="";
prediction_2="";

Webcam.set({
    width:360,
    height:300,
    image_format:'png',
    png_quality:90

});

camera=document.getElementById("camera");
Webcam.attach("camera")

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log("ml5.version",ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wUnZQYmzf/model.json',modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}
function speak(){
    synth=window.speechSynthesis;
    speak_data_1="The First Prediction is "+prediction_1;
    speak_data_2=" And The Second Prediction is "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,result){
if(error){
    console.log(error);}
    else{
console.log(result);
document.getElementById("result_emotion_name_1").innerHTML=result[0].label;
document.getElementById("result_emotion_name_2").innerHTML=result[1].label;
prediction_1=result[0].label;
prediction_2=result[1].label;
speak()
if(prediction_1=="happy"){
   document.getElementById("result_emoji_1").innerHTML="&#128522;";
}
if(prediction_1=="sad"){
    document.getElementById("result_emoji_1").innerHTML="&#128532;";
    }
    if(prediction_1=="angry"){
        document.getElementById("result_emoji_1").innerHTML="&#128545;";
        }
        if(prediction_2=="happy"){
            document.getElementById("result_emoji_2").innerHTML="&#128522;";
            }
            if(prediction_2=="sad"){
                document.getElementById("result_emoji_2").innerHTML="&#128532;";
                }
                if(prediction_2=="angry"){
                    document.getElementById("result_emoji_2").innerHTML="&#128545;";
                    }
        
    

}

}