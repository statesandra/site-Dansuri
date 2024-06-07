import { Exercise } from "./exercise.js";

export function displayExercise(element, output, addButtons=false){
    if(output.children.length% 4===0){
        let row=document.createElement("div");
        row.classList.add("row");
        output.appendChild(row);
    }

    
let row= output.lastElementChild;

let cardCol= document.createElement("div");
cardCol.classList.add("col-md-4", "mb-3");

let card = document.createElement("div");
card.classList.add("card","transitionCard", "bg-info", "mb-3","sizeCard", "text-left");
card.style.maxWidth = "18rem";

let cardHeader = document.createElement("div");
cardHeader.classList.add("card-header");
cardHeader.textContent = "Exercise";

let cardBody = document.createElement("div");
cardBody.classList.add("card-body");

let cardTitle = document.createElement("h5");
cardTitle.classList.add("card-title");
cardTitle.textContent = element.name;

let cardText = document.createElement("p");
cardText.classList.add("card-text");
cardText.textContent = "Muscle: " + element.muscle;

cardBody.appendChild(cardTitle);
cardBody.appendChild(cardText);

card.appendChild(cardHeader);
card.appendChild(cardBody);

cardCol.appendChild(card);

row.appendChild(cardCol);

}

window.displayExercise= displayExercise;
export function displayExercises(exercises, buttons=true){
    let output= document.getElementById("content");
    console.log(output);
    exercises.forEach(element => {
        displayExercise(element, output, buttons);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('scroll', revealCards);

    function revealCards() {
        var cards = document.querySelectorAll('.transitionCard');
        cards.forEach(function(card) {
            var cardTop = card.getBoundingClientRect().top;
            var windowHeight = window.innerHeight;
            if (cardTop < windowHeight * 0.9) {
                card.style.opacity = '1';
            }
        });
    }
});
 window.displayExercises= displayExercises;

export function fetchExerciseData(exerciseNames){
    const baseUrl = "https://api.api-ninjas.com/v1/exercises";
    const apiKey = "IlmLGESKSGDasvyshqTvsA==eVzlV9KMuu7b13dL";

    const promises= exerciseNames.map(exerciseName=>{
        const url = `${baseUrl}?name=${exerciseName}`;

        return fetch(url, {
            headers: {
                "X-Api-Key": apiKey,
            },
    })
    .then(response => {
        if (response.ok) {
            console.log(response);
            

            return response.json();
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    })
    .then(data => {
        console.log(data);
        return data.map(item => new Exercise(item));
    });
});
    return Promise.all(promises)
    .then(exercisesData => {
        return exercisesData.flat();
    })
    .catch(error => {
        console.error("Error:", error.message);
        return []; 
    });
}

const exerciseNames = ['Landmine twist', 'Elbow plank', 'Pushups','Chest dip','Glute bridge','Kneeling Squat','Triceps dip']; 
document.addEventListener('DOMContentLoaded', () => {

  fetchExerciseData(exerciseNames)
      .then(exercises => {
        console.log(exercises);
          displayExercises(exercises);
      });
});
