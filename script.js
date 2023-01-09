let nameInput =   document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("ErrorMessageName"); 
let scorFinal = document.querySelector(".scorFinal");

let btnNext = document.querySelector(".next");
btnNext.disabled = true;

let indexQuestion=0;
let scroreJoueur=0;
let compteur = 59;

function validate(){
    const nameInputvalue = nameInput.value;
  

    if (nameInputvalue ==="" || nameInputvalue.length<2){ 
       
             if (nameInputvalue === ""){
                 message.innerHTML ="N’oubliez pas de renseigner votre nom avant de commencer le Quiz."
                 nameInput.focus();    
            } else{
              message.innerHTML = "veiller renseigner au moin deux charactère";
              }

              nameInput.classList.add("error");
   
                }else{
                   
                   /*  nameInput.style.border="1px solid black" */
                   nameInput.classList.remove("error")
                    message.innerHTML="";
                    }
                   
}
    
let motifEmail = /^[a-z0-9._\-]+@[a-z0-9._\-]{2,}\.[a-z]{2,4}$/i;
function validateEmail(){
   
   const emailvalue = email.value;


if (emailvalue ===""|| !motifEmail.test(emailvalue)){ 
   
    if (emailvalue === ""){
        ErrorMessageEmail.innerHTML ="N’oubliez pas de renseigner votre email avant de commencer le Quiz"
       
    }
    else{
        ErrorMessageEmail.innerHTML="veiller renseigner un email valide"
    }
    /* ErrorMessageEmail.style.color= "red";
    email.style.border=" 1px solid red"; */
    email.classList.add("error");
}
   

else{
   /*  email.style.border="1px solid black" */
   ErrorMessageEmail.classList.remove("error");
    ErrorMessageEmail.innerHTML = "";
   
}
//return isValid;

} 
                          

let contenairPage = document.querySelector(".contenairPage");
let btnStart = document.querySelector(".btnStart");
let quizPage = document.getElementById("quizPage");

btnStart.addEventListener('click', (e)=>{
    e.preventDefault();
    const nameInputvalue = nameInput.value;
    const emailvalue = email.value;
   // const isValid = validate() && validateEmail();
    if (nameInputvalue && nameInputvalue.length>=2 && emailvalue && motifEmail.test(emailvalue)){
        //logique
        contenairPage.style.display = "none";
        quizPage.style.display="block";
       showQuestions();
       showAnswers();
    } else{
        validate();
        validateEmail();
    }
})
const questions=["Quel est le type d'un fichier JavaScript?", "Comment faire un commentaire sur une ligne avec javaScript?", "Dans quel élément HTML place-t-on le JavaScript ?",
"Laquelle de ces syntaxes est correcte ?", "Comment faire appelle à une fonction nommée « sum »? ", "Qu'affiche String.fromCharCode(65) ?","Quel langage se prête le mieux à l'exécution d'une requête MySQL ?",
"Comment trouver la longueur de la variable nom ?","La fonction javascript_info()","i += 1 est équivalent à","Comment écrivez-vous « Hello World » dans une boîte d’alerte?","JavaScript ","Quelle fonction permet de temporiser l'exécution d'une commande ?",
"Comment supprimer les espaces en début et fin de la chaîne ch1 ?","Comment accéder au premier élément d'un tableau T1 ?",
];

const allAnswers=[[".ts",".jsx",".js",".j",], [" || ","/**/","\\\\","//",], ["<js>", "<javaScript>", "<script>", "<scripting>",],["if (a != 2) {}", "if a != 2 {}","if (a <> 2) {}"," if a <> 2 {}",], 
["sum()", "call function sum()", " call sum()", "Aucune de ces réponses n’est vraie.",],
["A", "une message", "true", "1",],["JavaScript", "CSS", "HTML", "PHP",],["nom.width","width(nom)","nom.length","length(nom)",],["n'existe pas", "renvoie la version de JavaScript utilisée","permet de déboguer une variable","permet de connaître l'OS de l'utilisateur",],
["i > 1","i >= 1","n'existe pas en JavaScript","i = i + 1",],["msg('Hello World');","alert('Hello World');","msgBox('Hello World');","alertBox('Hello World');",],["s'exécute sur le serveur uniquement","doit être compilé avant d'être exécuté","s'exécute sur le client","est un langage dérivé de l'ADA",],
["sleep()","setTimeout()","wait()","SetTimer()",],["supprespaces(ch1)", "ch1.trim()","trim(ch1)","ch1.supprespaces()",],
["T1(0)","T1(1)","T1[0]","T1[1]",]];

const correct =[".js","//", "<script>","if (a != 2) {}","sum()", "A","PHP","nom.length","n'existe pas","i = i + 1","alert('Hello World')","s'exécute sur le client",
"setTimeout()","ch1.trim()","T1[0]",];




let quiz = document.querySelector(".quiz");
let questionCounter = document.querySelector(".questionCounter");

function showQuestions(){

    progress_timer()

    if (questions.length === indexQuestion){
        showScore(nameInput, email)
    }else{
        quiz.textContent = questions[indexQuestion];
        questionCounter.textContent= `Question ${indexQuestion+1}/${questions.length}`
    }   
}


let answersClass = document.querySelector(".Answers");
function showAnswers(){
    allAnswers[indexQuestion].forEach( function(underAnswers, index) {
        let radioInput = document.createElement("input");
        radioInput.setAttribute("type", "radio");
        radioInput.setAttribute("name", "drone");
        radioInput.setAttribute("id","drone"+index)
        let divBlockInput = document.createElement("div");
        divBlockInput.classList.add("choice");
        divBlockInput.addEventListener('click',()=>{
            radioInput.click();
            btnNext.disabled = false;
            btnNext.style.backgroundColor = "green";
        })
        let label = document.createElement("label");
        label.setAttribute("for","drone"+index);
        label.setAttribute("class","label");
        label.textContent = underAnswers;
        radioInput.setAttribute("value",underAnswers);

        divBlockInput.appendChild(radioInput);
        divBlockInput.appendChild(label);
        answersClass.appendChild(divBlockInput);
    });
}




let btnLeave = document.querySelector(".leave");

function buttonNext(){
 indexQuestion++;
 
 if (indexQuestion<allAnswers.length) {
   showQuestions();
    allAnswers[indexQuestion].forEach( function(){
        radioInput = document.querySelectorAll("[type='radio']");
        label = document.querySelectorAll(".label");
        for(let i = 0; i<label.length; i++){
            label[i].textContent = allAnswers[indexQuestion][i];
            radioInput[i].setAttribute("value",allAnswers[indexQuestion][i]);
           /*  btnNext.disabled;
            btnNext.style.backgroundColor = "green"; */
        }
    }); 
    if(indexQuestion == allAnswers.length-1){
        btnNext.textContent = "Terminer";
    } 
 } else {
    showScore(nameInput, email);
 }  
}

btnNext.addEventListener('click',(e)=>{
    e.preventDefault();
    if(btnNext.disabled === true){
        return;
    }
    btnNext.disabled = true
    clear_interval();
    showscorFinal();
    btnNext.style.backgroundColor = "rgba(91, 170, 125, 0.42)";
   
    buttonNext();
    quizPage.reset();

})

let nameRecov = document.querySelector(".nameRecov");
let emailRecov = document.querySelector(".emailRecov");
let bilan = document.querySelector(".bilan");
let ok = document.querySelector(".icons");


//affiche le nameInput à la fin
function showScore(nameInput, email){
    nameRecov.textContent = nameInput.value;
    emailRecov.textContent = email.value;
    quizPage.style.display="none";
    bilan.style.display="block";
    scorFinal.textContent = `${scroreJoueur}/${questions.length}`;
    
    if (scroreJoueur >= allAnswers.length/2) {
        ok.innerHTML = `<i class="fa-regular fa-circle-check check"></i>`
        
    } else {
        ok.innerHTML =` <i class="fa-regular fa-circle-xmark check2"></i>`
        
    }
}

btnLeave.addEventListener('click',(e)=>{
    e.preventDefault();
    showscorFinal();
    showScore(nameInput, email);
})




//affiche scorFinal
function showscorFinal(){
    let check = document.querySelector("input[name='drone']:checked")
    if (check) {
        if(check.value == correct[indexQuestion] ){
            scroreJoueur++;
            console.log(document.querySelector("input[name='drone']:checked"));
           }
    } else {
    
    }
        
    }
   


    function progress_timer(){
        document.querySelector(".progressBar").setAttribute("style", "width:100%");
        let timeleft = 60;
        let timetotal = 60;
        document.getElementById("timeCounter").innerText = timeleft;
        let interv = setInterval(()=>{
            let progress_width = Math.ceil((timeleft * 100) / timetotal);
            document.querySelector(".progressBar").setAttribute("style", `width:${progress_width}%`);
            document.getElementById("timeCounter").innerText = timeleft;
            if (timeleft === 0) {
                showscorFinal();
                clearInterval(interv);
                quizPage.reset();
                buttonNext();
                btnNext.disabled = false;
                btnNext.style.backgroundColor = "rgba(91, 170, 125, 0.42)";
                document.getElementById("timeCounter").innerText = ""
            }
            timeleft--;
    },1000)
}

//
function clear_interval() {
    const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
    }
}

        

let btnhome = document.querySelector(".home");
btnhome.addEventListener("click", (e)=>{
    e.preventDefault();

    document.location.reload();
   
})


