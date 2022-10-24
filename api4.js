//1. toggle class function is non Oper
//2. moving trucks needs to be dynamic, move to and for Favs
//add data attributes as pointers instead of targeting using class names

//attempted to use movingTrucks to move into favs and into main, but it only moves one way, into favs
//attempted some destructuring and object.values().includes methods in order to search but was did not find the efficient path

// modify objects from api to include key/value pairs that are useful to me. ie. a favorites set






const body = document.body;
const newDiv = document.createElement('div');
const container = document.querySelector('.container');
const main = document.querySelector('[data-section="main"]');
const master = document.querySelector('[data-section="master"]');
const favorites = document.querySelector('[data-section="favorites"]');




const mainArr = [];
const favoritesArr = [];
const arraySet = [mainArr, favoritesArr];



//cors error fix

// var express = require('express')
// var cors = require('cors')
// var app = express()

// app.use(cors())

// app.get('/products/:id', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })


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
// getData(["desserts?category=Ice_Cream&limit=50", "dogs"]);
// getData(["desserts?category=Ice_Cream&limit=25", "desserts?category=Cookie&limit=25"]);
getData(["desserts?category=Ice_Cream&limit=10", "desserts?category=Cookie&limit=10", "desserts?category=Donut&limit=10"]);

//grab object key/value data
const giveMewhatIWant = (arr, card) => {
  arr.forEach(obj => {
    obj.data.forEach(item => {
      [name, description, breed, age, photo] = [item.name, item.description, item.breed, item.age,  item.photoUrl];
      card.push({name, description, breed, age, photo}); 
    })
  })
}

//create html cards
const createCards = (arr, section) => {
  const cards = arr
    .map(({name, description, breed, age, photo}) => (
    
      `
        <div id="card-wrapper" class="card-wrapper " data-cardName="${name}">
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
            <div class="button" id="button" title="${name.toLowerCase()}" data-button="true" data-is-fav="false" data-name="${name.toLowerCase()}">
              Favorite
            </div>
          </div>
        </div>
      `
    )).join('')
  section.innerHTML = cards;
}


//click event can stack methods from movingTruck()
document.addEventListener('click', (e) => {
  const divCardWrapper = document.querySelector('#card-wrapper')
  const target = e.target;
  const id = target.id;
  const className = target.className;
  const title = target.title;
  const data = target.dataset;
  const favorite = data.isFav;
  const button = data.button;
  const name = data.name;

  console.log(button);
  console.log(target);

  if (!button == 'true') {
    return
  }


  favorite == 'false' ? movingTrucks(name, mainArr, favoritesArr) : movingTrucks(name, favoritesArr, mainArr);

  // favorite == 'false' ? cargoShip(name) : movingTrucks(name, favoritesArr, mainArr);
  // methodStack(divCardWrapper, className, name, target);

  printAll();
})



//click event for sorting function
document.addEventListener('click', e => {
  const alpha = 'alpha';
  const sortOrder = e.target.dataset.sort;

  sortOrder == alpha ? alphaSort(favoritesArr) : reversoSort(favoritesArr);
  printFavorites();
})

    

// put conditionals in these functions
// then load them into movingTrucks()
const cutArr = (arr, i) => { 
   
  arr.slice(i, 1) 
}

const pushArr = (arr, elm) => { 
  arr.push(elm); 
}

//function n is the string to match, arr1 is the array to search, arr2 arr to push

//a better version of movingTrucks

const cargoShip = (clickedName) => {
  let [arr1, arr2] = arraySet;
  // console.log(Object.values(arr1));//this is giving me thelist of objects. not the values from each individual object
  // console.log(Object.values(arr1).includes(clickedName));

  
  arr1.forEach(elm => {
    let name = elm.name.toLowerCase();
    let nameArr = [];

    // nameArr.push(name);
    // console.log('includes method:' + Object.values(arr1).includes(clickedName));
    // console.log('includes method:' + nameArr.includes(clickedName));


    if (!name === clickedName) { return }
    if (name === clickedName) {
      // boomBoom(arr1, arr2, elm); // this function deleted 
    }

  })

  arr2.forEach(elm => {
    let name = elm.name.toLowerCase();

    if (!name === clickedName) { return }
    if (name === clickedName) {

    }
  })
}
  



const movingTrucks = (n, arr1, arr2) => {
  console.log(n);
  arr1.forEach(elm => {
    let name = elm.name.toLowerCase();
    if (name === n) {
    
      let index = (arr1.indexOf(elm));
      arr1.splice((index), 1);
      arr2.push(elm);     
    }
  })
}


//add class   this is NOT adding the class...
const classToggler = (elm) => {
  const button = document.querySelector('[data-button]');
  // elm.classList.toggle('favorites');
  // elm.classList == '!favorites' ? elm.classList.add('favorites') : console.log('testing erros');
  // console.log(elm);
  console.log(button);
  button.classList.add('.favorites');

  // elm.button.classList.add('favorites');
}

const favToggler = (elm) => {
  // console.log(`favToggler report elm was "${fav}"`);
  

  // elm == 'true' ? elm = 'false' : elm = 'true';
  if (!fav == 'true') {
    return fav = 'true';
  }
  
  if (fav == 'true') {
    return fav = 'false';
  }

  // console.log(`favToggler report elm now is "${fav}"`);
}




//sorting functions  
const alphaSort = (arr) => {
  arr.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  })
}

const reversoSort = (arr) => {
  arr.sort((a, b) => {
    if (a.name < b.name) {
      return 1;
    }
    if (a.name > b.name) {
      return -1;
    }
    return 0;
  })
}

const shuffleSort = (arr) => {
  arr.sort(() => Math.random() - 0.5);
}



//printing machines
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
}, 700);
 
// newDiv.textContent = "hey its a new Div here";
// body.append(newDiv)