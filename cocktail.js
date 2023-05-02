let result = document.getElementById('result');
let searchBtn = document.getElementById('drink-btn');

let url = 'https://thecocktaildb.com/api/json/v1/1/search.php?s=';

let getDrink = () => {
  let cocktail = document.getElementById('cocktail-inp').value;

  if (cocktail.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter cocktail name </h3>`;
  } else {
    fetch(url + cocktail)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        console.log(data.drinks[0]);
        let myDrink = data.drinks[0];
        console.log(myDrink.strDrink);
        console.log(myDrink.strDrinkThumb);
        console.log(myDrink.strInstructions);
        let count = 1;
        let ingredients = [];
        for (let i in myDrink) {
          let ingredient = '';
          let measure = '';
          if (i.startsWith('strIngredient') && myDrink[i]) {
            ingredient = myDrink[i];
            if (myDrink[`strMeasure` + count]) {
              measure = myDrink[`strMeasure` + count];
            } else {
              measure = '';
            }
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        console.log(ingredients);
        result.innerHTML = `<img src=${myDrink.strDrinkThumb}>
            <h2> ${myDrink.strDrink}</h2>
            <h3>Ingredients:</h3>
            <ul class="ingredients"></ul>
            <h3>Instructions:</h3>
            <p> ${myDrink.strInstructions}</p>`;
        let ingredientsCon = document.querySelector('.ingredients');
        ingredients.forEach((item) => {
          let listItem = document.createElement('ul');
          listItem.innerText = item;
          ingredientsCon.appendChild(listItem);
        });
      }).catch(() => {
        result.innerHTML = `<h3 class="msg"> Not vaild</h3>`;
      });
  }
};
window.addEventListener('load', getDrink);
searchBtn.addEventListener('click', getDrink);
