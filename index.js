 
let nom =   document.getElementById("nom");
let email = document.getElementById("email");
let erreur = document.getElementById("erreur"); 


let questionContainer = document.getElementById("question-container"); 

let optionContenair = document.querySelector(".option-contenair");
let result = document.querySelector(".result");

const questions = [{
    id:1,
    question:"Quel est le type d'un fichier JavaScript?",
    correct:".js",
    options:[
                ".ts",
                ".jsx",
                ".js",
                ".j",
    ]},
    {
        id:2,
        question:"Comment fair un commentaire sur une ligne avec javaScript?",
        correct: "//",
        options:[
            " || ",
            "/**/",
            "\\\\",
            "//",
        ]

    }
]
//sortir de question d'une maniere aleatoire!
/*let rotation = questions.sort(() => Math.random() - 0.5);
for (let i = 0; i < questions.length; i++) {
    questions[i].options.sort(() => Math.random() - 0.5);
};*/

// affichage de question!
let indexQuestion = 0;
let resultatJoueur = 0;
let optionChoisis = "";

let questionUn = document.querySelector(".question-un");
let progressquestion = document.querySelector(".progressquestion");
let progressBar = document.querySelector(".bar");
let reponse = document.querySelector(".reponse");

function affichQuestion(indexQuestion){
    //indexQuestion++
    document.title = "JavaScript Quiz APP | Questions";
    let text=`<div>${questions[indexQuestion].question}</div>`; 
    questionUn.innerHTML = text;

    progressquestion.innerHTML = `<p> Question ${indexQuestion}/15 </p>`

   optionContenair.innerHTML = 
   `<div class="reponse">
     <div class="choix">
        <input type="radio" id="reponse1"  name="drone" value="${questions[indexQuestion].options[3]}"> 
        <label for="reponse1">${questions[indexQuestion].options[3]}</label>
     </div>
     <div class="choix">
     <input type="radio" id="reponse2"  name="drone" value="${questions[indexQuestion].options[2]}">
     <label for="reponse2">${questions[indexQuestion].options[2]}</label>
     </div>
     <div class="choix">
     <input type="radio" id="reponse3"  name="drone" value="${questions[indexQuestion].options[1]}">
     <label for="reponse3">${questions[indexQuestion].options[1]}</label>
    </div>
    <div class="choix">
        <input type="radio" id="reponse4"  name="drone" value="${questions[indexQuestion].options[0]}">
        <label for="reponse4">${questions[indexQuestion].options[0]}</label>
    </div>
   </div>
   <div class="bouton-deux">
   <button class="quitter">Quitter</button>
                 <button class="suivant" >Suivant</button>
    </div>`

    
    
}
console.log(questions[2].options[2]);

const answers = document.querySelectorAll("input[name='drone']");

function validate(){
    const nomvalue = nom.value;
   let isValid = true;

    if (nomvalue ==="" || nomvalue.length<2){ 
        isValid=false;
             if (nomvalue === ""){
                 erreur.innerHTML ="N’oubliez pas de renseigner votre nom avant de commencer le Quiz."
                 nom.focus();    
            } else{
              erreur.innerHTML = "veiller renseigner au moin deux charactère";
              }
              erreur.style.color="red";
              nom.style.border=" 1px solid red";
   
                }else{
                    isValid = true;
                    nom.style.border="1px solid black"
                    erreur.innerHTML="";
                    }
                    return isValid;
}
    
   
function validateEmail(){
    let motifEmail = /^[a-z0-9._\-]+@[a-z0-9._\-]{2,}\.[a-z]{2,4}$/;
   const emailvalue = email.value;

   let isValid = true;
if (emailvalue ===""|| !emailvalue ===motifEmail.test(emailvalue)){ 
    isValid = false;
    if (emailvalue === ""){
        error.innerHTML ="N’oubliez pas de renseigner votre email avant de commencer le Quiz"
       
    }
    else{
        error.innerHTML="veiller renseigner un email valide"
    }
    error.style.color= "red";
    email.style.border=" 1px solid red";
}
   

else{
    email.style.border="1px solid black"
    error.innerHTML = "";
   
}
return isValid;

}                            

let contenairePage = document.querySelector(".contenairUn");
let btncommencer = document.querySelector(".bouton");

btncommencer.addEventListener('click', (e)=>{
    e.preventDefault();
    const isValid = validate() && validateEmail();
    if (isValid){
        //logique
        contenairePage.style.display = "none";
        questionContainer.style.display="block";
        affichQuestion(0);  }   
});

let btnSuivant = document.querySelector(".suivant");
const suivantQuestion = () => {
    if(indexQuestion < questions.length-1){
        indexQuestion++;
        affichQuestion(indexQuestion);
    }
    
}
btnSuivant.addEventListener('click', (e)=>{
    e.preventDefault();
    suivantQuestion();
    affichQuestion(indexQuestion);
    questionContainer.style.display="block";

})
