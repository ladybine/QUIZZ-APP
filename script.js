let nom =   document.getElementById("nom");
let email = document.getElementById("email");
let erreur = document.getElementById("erreur"); 
let resultat = document.querySelector(".resultat");

let btnSuivant = document.querySelector(".suivant");
btnSuivant.disabled = true;

let indexQuestion=0;
let scroreJoueur=0;
let compteur = 59;

function validate(){
    const nomvalue = nom.value;
  

    if (nomvalue ==="" || nomvalue.length<2){ 
       
             if (nomvalue === ""){
                 erreur.innerHTML ="N’oubliez pas de renseigner votre nom avant de commencer le Quiz."
                 nom.focus();    
            } else{
              erreur.innerHTML = "veiller renseigner au moin deux charactère";
              }
              erreur.style.color="red";
              nom.style.border=" 1px solid red";
   
                }else{
                   
                    nom.style.border="1px solid black"
                    erreur.innerHTML="";
                    }
                   
}
    
let motifEmail = /^[a-z0-9._\-]+@[a-z0-9._\-]{2,}\.[a-z]{2,4}$/;
function validateEmail(){
   
   const emailvalue = email.value;


if (emailvalue ===""|| !motifEmail.test(emailvalue)){ 
   
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
//return isValid;

} 
                          

let contenairePage = document.querySelector(".contenairUn");
let btncommencer = document.querySelector(".bouton");
let questionContainer = document.getElementById("question-container");

btncommencer.addEventListener('click', (e)=>{
    e.preventDefault();
    const nomvalue = nom.value;
    const emailvalue = email.value;
   // const isValid = validate() && validateEmail();
    if (nomvalue && nomvalue.length>=2 && emailvalue && motifEmail.test(emailvalue)){
        //logique
        contenairePage.style.display = "none";
        questionContainer.style.display="block";
        affichQuestion();
        afficheReponse();
    } else{
        validate();
        validateEmail();
    }
})
const questions=["Quel est le type d'un fichier JavaScript?", "Comment faire un commentaire sur une ligne avec javaScript?", "Dans quel élément HTML place-t-on le JavaScript ?",
"window.confirm() affiche une boite de dialogue avec", "Une variable locale déclarée dans une fonction peut être utilisée ", "Qu'affiche String.fromCharCode(65) ?","Quel langage se prête le mieux à l'exécution d'une requête MySQL ?",
"Comment trouver la longueur de la variable Nom ?","La fonction javascript_info()","i += 1 est équivalent à","Le DOM","JavaScript ","Quelle fonction permet de temporiser l'exécution d'une commande ?",
"Comment supprimer les espaces en début et fin de la chaîne ch1 ?","Comment accéder au premier élément d'un tableau T1 ?",
];

const reponse=[[".ts",".jsx",".js",".j",], [" || ","/**/","\\\\","//",], ["<js>", "<javaScript>", "<script>", "<scripting>",],["un message, un champ de saisie et les boutons OK Annuler", "un message et le bouton OK seul","un message et les boutons OK Annuler","n'existe pas en JavaScript",], 
["dans toutes les fonctions mais pas dans le script appelant", "dans toutes les fonctions du document HTML", "dans cette fonction uniquement", "dans cette fonction et dans le script appelant",],
["A", "une erreur", "true", "1",],["JavaScript", "CSS", "HTML", "PHP",],["Nom.width","width(Nom)","Nom.length","length(Nom)",],["n'existe pas", "renvoie la version de JavaScript utilisée","permet de déboguer une variable","permet de connaître l'OS de l'utilisateur",],
["i > 1","i >= 1","n'existe pas en JavaScript","i = i + 1",],["est spécifique a JavaScript","est un moteur de bases de données","ne peut pas être manipulé par JavaScript","décrit la structure du document HTML ou XML",],["s'exécute sur le serveur uniquement","doit être compilé avant d'être exécuté","s'exécute sur le client","est un langage dérivé de l'ADA",],
["sleep()","setTimeout()","wait()","SetTimer()",],["supprespaces(ch1)", "ch1.trim()","trim(ch1)","ch1.supprespaces()",],
["T1(0)","T1(1)","T1[0]","T1[1]",]];

const correct =[".js","//", "<script>","un message et les boutons OK Annuler","dans cette fonction uniquement", "A","PHP","Nom.length","n'existe pas","i = i + 1","décrit la structure du document HTML ou XML","s'exécute sur le client",
"setTimeout()","ch1.trim()","T1[0]",];




let questionUn = document.querySelector(".question-un");
let progressquestion = document.querySelector(".progressquestion");

function affichQuestion(){

    progress_timer()

    if (questions.length === indexQuestion){
        showScore(nom, email)
    }else{
        questionUn.textContent = questions[indexQuestion];
        progressquestion.textContent= `Question ${indexQuestion+1}/${questions.length}`
    }   
}


let reponseClasse = document.querySelector(".reponse");
function afficheReponse(){
    reponse[indexQuestion].forEach( function(sousReponse, index) {
        let radioInput = document.createElement("input");
        radioInput.setAttribute("type", "radio");
        radioInput.setAttribute("name", "drone");
        radioInput.setAttribute("id","drone"+index)
        let div = document.createElement("div");
        div.classList.add("choix");
        div.addEventListener('click',()=>{
            radioInput.click();
            btnSuivant.disabled = false;
            btnSuivant.style.backgroundColor = "green";
        })
        let label = document.createElement("label");
        label.setAttribute("for","drone"+index);
        label.setAttribute("class","label");
        label.textContent = sousReponse;
        radioInput.setAttribute("value",sousReponse);

        div.appendChild(radioInput);
        div.appendChild(label);
        reponseClasse.appendChild(div);
    });
}




let btnQuitter = document.querySelector(".quitter");

function butnSuivant(){
 indexQuestion++;
 
 if (indexQuestion<reponse.length) {
    affichQuestion();
    reponse[indexQuestion].forEach( function(){
        radioInput = document.querySelectorAll("[type='radio']");
        label = document.querySelectorAll(".label");
        for(let i = 0; i<label.length; i++){
            label[i].textContent = reponse[indexQuestion][i];
            radioInput[i].setAttribute("value",reponse[indexQuestion][i]);
            
        }
    }); 
    if(indexQuestion == reponse.length-1){
        btnSuivant.textContent = "Terminer";
    } 
 } else {
    showScore(nom, email);
 }  
}

btnSuivant.addEventListener('click',(e)=>{
    e.preventDefault();
    clear_interval();
    showResultat();
    btnSuivant.style.backgroundColor = "rgba(91, 170, 125, 0.42)";
   
    butnSuivant();
    questionContainer.reset();

})

let nomRecup = document.querySelector(".nomrecup");
let emailRecup = document.querySelector(".emailrecup");
let result = document.querySelector(".result");
let ok = document.querySelector(".icons");


//affiche le nom à la fin
function showScore(nom, email){
    nomRecup.textContent = nom.value;
    emailRecup.textContent = email.value;
    questionContainer.style.display="none";
    result.style.display="block";
    resultat.textContent = `${scroreJoueur}/${questions.length}`;
    
    if (scroreJoueur >= reponse.length/2) {
        ok.innerHTML = `<i class="fa-regular fa-circle-check check"></i>`
        
    } else {
        ok.innerHTML =` <i class="fa-regular fa-circle-xmark check2"></i>`
        
    }
}

btnQuitter.addEventListener('click',(e)=>{
    e.preventDefault();
    showScore(nom, email);
})




//affiche resultat
function showResultat(){
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
        document.querySelector(".bar").setAttribute("style", "width:100%");
        let timeleft = 60;
        let timetotal = 60;
        document.getElementById("time").innerText = timeleft;
        let interv = setInterval(()=>{
            let progress_width = Math.ceil((timeleft * 100) / timetotal);
            document.querySelector(".bar").setAttribute("style", `width:${progress_width}%`);
            document.getElementById("time").innerText = timeleft;
            if (timeleft === 0) {
                
                clearInterval(interv);
                questionContainer.reset();
                butnSuivant();
                btnSuivant.disabled = false;
                btnSuivant.style.backgroundColor = "rgba(91, 170, 125, 0.42)";
                document.getElementById("time").innerText = ""
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

        

let btnAccueil = document.querySelector(".accueil");
btnAccueil.addEventListener("click", (e)=>{
    e.preventDefault();

    document.location.reload();
   
})


