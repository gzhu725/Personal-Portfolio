window.onload = function () {

  const baseWikiUrl = "https://en.wikipedia.org/wiki/";

  const interests = [

    "Aespa",

    "Blackpink",

    "Twice",

    "Itzy",

    "Mamamoo",

    "Red_Velvet_(group)",

    "Momoland",

    "Sunmi",

    "Chungha",

    "Iz*One",

    "Banana_slug",

    "Budgerigar",

    "Bird",

    "K-pop",

    "LGBT",

    "Gender_expression",

    "Linguistics",

    "Tennis",

    "Basketball",

    "Taekwondo",

    "Animals",

    "Religion",

    "Abrahamic_religions",

    "Music",

    "Coco_Gauff",

    "Roger_Federer",

    "Denis_Shapovalov",

    "Carlos_Alcaraz",

  ]; //TO DO: make this not hard coded

 

  let button = document.getElementById("teleportbutton");

  if (button) {

    button.addEventListener("click", function () {

      // Do something when the button is clicked

      let randomIndex = Math.floor(Math.random() * interests.length);

      window.open(baseWikiUrl + interests[randomIndex], "_blank");

    });

  }

};