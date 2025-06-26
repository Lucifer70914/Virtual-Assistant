let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

function speak(text) {
    const speakNow = () => {
        const voices = speechSynthesis.getVoices();

        if (!voices.length) {
            console.error("No voices available");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voices.find(v => v.lang === 'en-GB' || v.lang === 'en-US') || voices[0];
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        speechSynthesis.cancel(); 
        speechSynthesis.speak(utterance);
    };

    if (!speechSynthesis.getVoices().length) {
        speechSynthesis.onvoiceschanged = () => {
            speakNow();
        };
    } else {
        speakNow();
    }
}



function wishMe()
{
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12)
    {
        speak("Good Morning sir")
    }
    else if(hours>=12 && hours<=16)
    {
        speak("Good AfterNoon Sir")
    }
    else{
        speak("Good Evening Sir")
    }
}
window.addEventListener('load',()=>
{
    wishMe()

})
let speechRecognition=window.speechRecognition || window.webkitSpeechRecognition
let recognition=new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
    console.log(event)
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>
{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})

function takeCommand(message)
{
    btn.style.display="flex"
    voice.style.display="none"
    if(message.includes("hello")||message.includes("hey"))
    {
        speak("Hello sir, how can i help you")
    }
    else if(message.includes("who are you"))
    {
        speak("I am virtual assistant, created by Ritesh")
    }
    else if(message.includes("open youtube"))
    {
        speak("opening youtube...")
        window.open("https://www.youtube.com/","_blank")
    }
    else if(message.includes("open google"))
    {
        speak("opening google...")
        window.open("https://www.google.com/","_blank")
    }
    else if(message.includes("open calculator"))
    {
        speak("opening calculator...")
        window.open("calculator://")
    }
     else if(message.includes("open whatsapp"))
    {
        speak("opening whatsapp...")
        window.open("whatsapp://")
    }
     else if(message.includes("time"))
    {
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
    }
    else if(message.includes("date"))
    {
      let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
      speak(date)
    }
    else{
        let finalText="this is what i found on internet regarding"+message.replace("obito","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("obito", "")}`, "_blank");

    }
}
