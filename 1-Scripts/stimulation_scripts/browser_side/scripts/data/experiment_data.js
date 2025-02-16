"use strict";
/* 
============================================================
+++++++++++++++++++ Experimental Variables +++++++++++++++++
============================================================
*/

const SOA = 400;
const blink = 300; //actual visual duration of the stimuli in ms
const set_delay = 750; //Short delay after end of presentation
var presentation_time = false; // Tracks if a sequence is currently being presented
var txt_counter = 0; // Counter for the text elements

/* 
============================================================
+++++++++++++++ Participant Device Parameters ++++++++++++++
============================================================
*/

const bodyElement = document.body;
const containerFigureElement = document.querySelector(".container-figure");
const keyEvent = "click"; //'touchend' (smartphone) or 'click' (computer) depending on the device

/* 
============================================================
+++++++++++++++ Instructions and text ++++++++++++++
============================================================
*/

const instruction_training_end_eng = [
  "Sequences of dots will be presented to you.",
  "Please rate their complexity.",
  "Please maintain your gaze on the fixation cross at the center of the screen",
  "The rating scale is the following <br><br>1: very simple <br>... to <br>7: very complex.",
  "As a starter, here is a very simple sequence.",
];

const instruction_training_end_fr = [
  "Des séquences de points vont vous être présentées.",
  "Veuillez évaluer leur complexité.",
  "Veuillez maintenir votre regard sur la croix de fixation au centre de l'écran.",
  "L'échelle d'évaluation est la suivante <br><br>1 : très simple <br>... à <br>7 : très complexe.",
  "Pour commencer, voici une séquence très facile.",
];

const training_prompt_txt_eng = [
  "This sequence was really simple ! <br>So you should click 1.",
  "This sequence was super complex ! <br>So you should click 7.",
  "Now it's your turn ! What was the complexity of this sequence?",
];
const training_prompt_txt_fr = [
  "Cette séquence était vraiment simple ! <br>Donc vous devez cliquer sur 1.",
  "Cette séquence était vraiment complexe ! <br>Donc vous devez cliquer sur 7.",
  "A vous de jouer ! Quelle était la complexité de cette séquence ?",
];

const training_feedback_eng = [
  "This sequence was easy. <br> Let's see a very complex one.",
  "This sequence was difficult. The next one will be simple.",
  "Well done. The next sequence is the last of the training.<br> It is a complexe one",
  "The training is over. Good job!",
];
const training_feedback_fr = [
  "Cette séquence était facile. <br> Voyons une très complexe. ",
  "Cette séquence était difficile. La prochaine sera simple. ",
  " Bien joué. La prochaine séquence est la dernière de l'entraînement. <br> C'est une séquence complexe. ",
  "L'entraînement est terminé. Bien joué!",
];

const transition_instructions_eng =
  "<div>The experiment will now start.<br>Stay focused!</div>";
const transition_instructions_fr =
  "<div>L'expérience va maintenant commencer.<br>Restez concentré.e !</div>";

// --------------------------------------------------------------
// -- Trial Prompts
//
const prompt_txt_eng =
  "How difficult was that sequence to memorize ?<br> 1: Very Simple [...] 7: Very Complex";

const prompt_txt_fr =
  "Quelle est le niveau de difficulté de mémorisation de cette séquence ?<br> 1 : Très facile [...] 7 : Impossible";

// --------------------------------------------------------------
// -- Ending Text
//
const end_txt_fr =
  "L'expérience est terminée. Merci d'avoir participé ! Si vous avez des questions, vous pouvez nous contacter à l'adresse suivantes: online.psyexp+complexity@gmail.com<br>. Le code Prolific est le CDJMLRZP";
const end_txt_eng =
  "You successfully completed the experiment. Thank you for your efforts ! If you have any question, send them to the email address:  online.psyexp+complexity@gmail.com<br>. The Prolific code is CDJMLRZP";

const next_txt_fr = "Vous avez répondu";
const next_txt_eng = "You responded";

// --------------------------------------------------------------
// -- Language selection
//

if (lan_selected === "fr") {
  var instruction_training_end = instruction_training_end_fr;
  var prompt_txt = prompt_txt_fr;
  var end_txt = `<div style="font-size:35px">${end_txt_fr}</div>`;
  var next_txt = next_txt_fr;
  var training_prompt_txt = training_prompt_txt_fr;
  var training_feedback_txt = training_feedback_fr;
  var transition_instructions = transition_instructions_fr;
} else {
  var instruction_training_end = instruction_training_end_eng;
  var prompt_txt = prompt_txt_eng;
  var end_txt = `<div style="font-size:35px">${end_txt_eng}</div>`;
  var next_txt = next_txt_eng;
  var training_prompt_txt = training_prompt_txt_eng;
  var training_feedback_txt = training_feedback_eng;
  var transition_instructions = transition_instructions_eng;
}

/* 
============================================================
+++++++++++++++++++ Game dynamics Variables +++++++++++++++++
============================================================
*/
const instruction_elements = ["btn_ok", "txt_container"]; // Elements to be displayed to read the instructions.
const experimental_elements = ["circles", "fixation"]; // Elements to be displayed all throughout presentation and response phase.
const page_next_elements = ["txt_container", "btn_next"]; // Elements that needs to be displayed during the presentation phase.
const response_phase_elements = [
  "container_estimation_complexity",
  "progression_bar",
  "prompt",
]; // Elements that needs to be displayed during the response phase.
var counter_presentation = 0;
var last_click = Date.now();
var state = ""; // Tracks the state of the experiment
