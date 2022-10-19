const body = document.body;
const div = document.createElement('div');
const container = document.querySelector('.container');



const cardArr = [];
const favoritesArr = [];

const getData = async (paths) => {
  const promises = paths
    .map(path => fetch(`https://freerandomapi.cyclic.app/api/v1/${path}`)
    .then(r => r.json()));
  const accounts = await Promise.all(promises);

  [treatObj, dogObj] = accounts;
  console.log(accounts);

  giveMewhatIWant([treatObj, dogObj], cardArr);
};

getData(["desserts?category=Ice_Cream&limit=50", "dogs"]);

const giveMewhatIWant = (arr, card) => {
  arr.forEach(obj => {
    obj.data.forEach(item => {
      [name, description, breed, age, photo] = [item.name, item.description, item.breed, item.age,  item.photoUrl];
      card.push({name, description, breed, age, photo}); 
    })
  })
}


const createCards = (arr) => {
  const cards = arr
    .map(({name, description, breed, age, photo}) => (
      `
        <div class="card-wrapper blue">
          <div class="card-header">
            <h2>${name}</h2>         
          </div>
          <div class="card-content">         
            ${description ? `<p>${description}</p>` : ''}
            ${breed ? `<p>${breed}</p>` : ''}
            ${age ? `<p>${age} years old!</p>` : ''}
            <div class="img-wrapper">
              <img src="${photo}">
            </div>
            <div class="button" id="${name.toLowerCase()}">
              Favorite
            </div>
          </div>
        </div>
      `
    )).join('')
  console.log(cards);
  container.innerHTML = cards;
}



//click accepts only class button
document.addEventListener('click', (e) => {
  if (e.target.className == 'button') {
  console.log(`ID: ${e.target.id}`);
  console.log(`Class: ${e.target.className}`);
  }

})

//function to match click event button id value within an array
const matching = (elm, arr) => {
  
}

// bringing this function outside of movingTrucks has caused issues... undefined results





// array, indexvariable

const cutArr = (arr, i) => {
  arr.slice(i, 1)
}

const pushArr = (arr, elm) => {
  arr.push(elm);
}

//function n is the string to match, arr1 is the array to search, arr2 arr to push
const movingTrucks = (n, arr1, arr2) => {
  arr1.forEach(elm => {
    let name = elm.name.toLowerCase();

    if (name === n) {
      let index = (arr1.indexOf(elm));
      cutArr(arr1, index);
      pushArr(arr2, arr1[index]);
    }

  })
}


//move to favorite/add class
const classPush = (elm, arr) => {
  //toggle the arrloation and the class


}



const printMain = () => {
  createCards(cardArr);
}

const printFavorites = () => {
  createCards(favoritesArr);
}



setTimeout(() => {
  createCards(cardArr);
}, 500);
 
div.textContent = "hey boosh";
body.append(div)