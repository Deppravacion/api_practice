const body = document.body;
const div = document.createElement('div');
const container = document.querySelector('.container');
const main = document.querySelector('.main');
const master = document.querySelector('.master');
const button = 'button';
const favorites = 'favorites';
const mainArr = [];
const favoritesArr = [];



//grab data from API's
const getData = async (paths) => {
  const promises = paths
    .map(path => fetch(`https://freerandomapi.cyclic.app/api/v1/${path}`)
    .then(r => r.json()));
  const accounts = await Promise.all(promises);

  [treatObj, dogObj] = accounts;
  console.log(accounts);

  giveMewhatIWant([treatObj, dogObj], mainArr);
};

getData(["desserts?category=Ice_Cream&limit=50", "dogs"]);

//grab object key/value data
const giveMewhatIWant = (arr, card) => {
  arr.forEach(obj => {
    obj.data.forEach(item => {
      [name, description, breed, age, photo] = [item.name, item.description, item.breed, item.age,  item.photoUrl];
      card.push({name, description, breed, age, photo}); 
    })
  })
}

//create html
const createCards = (arr, section) => {
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
            <div class="button" id="button" title="${name.toLowerCase()}" data>
              Favorite
            </div>
          </div>
        </div>
      `
    )).join('')
  console.log(cards);
  section.innerHTML = cards;
}



//click accepts only class button
//click event can stack methods from movingTruck()
document.addEventListener('click', (e) => {
  let id = e.target.id;
  let className = e.target.className;
  let title = e.target.title;
  let target = e.target;

  if (id == button) { 
  console.log(`ID: ${id}`);
  console.log(`Class: ${className}`);
  console.log(`Class: ${title}`);
  //toggle favorites class. 
  classToggler(target)
  //toggle array location, favs/main
  // movingTrucks()
  }

})





const cutArr = (arr, i) => { arr.slice(i, 1) }

const pushArr = (arr, elm) => { arr.push(elm); }

//function n is the string to match, arr1 is the array to search, arr2 arr to push
//DRY SRP
//1.find match
//2.cut from arr
//3.push to  arr
//
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
const classToggler = (elm) => {
  const fav = 'favorites';
  elm.classList.toggle(fav);
}


const printAll = () => {
  printFavorites();
  printMain();
}

const printMain = () => {
  createCards(mainArr, main);
}

const printFavorites = () => {
  createCards(favoritesArr, favorites);
}

setTimeout(() => {
  printAll();
}, 690);
 
div.textContent = "hey boosh";
body.append(div)