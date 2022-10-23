//1. toggle class function is non Oper
//2. moving trucks needs to be dynamic, move to and for Favs
//add data attributes as pointers instead of targeting using class names




const body = document.body;
const newDiv = document.createElement('div');
const container = document.querySelector('.container');
const main = document.querySelector('[data-section="main"]');
const master = document.querySelector('[data-section="master"]');
const favorites = document.querySelector('[data-section="favorites"]');




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

  if (!button == 'true') {
    return
  }

    favorite == 'false' ? movingTrucks(name, mainArr, favoritesArr) : movingTrucks(name, favoritesArr, mainArr);
    // methodStack(divCardWrapper, className, name, target);
    

    
    printAll();
  // if (id == 'button') { 
  // console.log(`ID: ${id}`);
  // console.log(`Class: ${className}`);
  // // console.log(className == 'favorites' ? 'true favs' : button);
 
  // ////toggle favorites class. 
  // classToggler(target);
  // ////toggle array location, favs/main
  // movingTrucks(title, mainArr, favoritesArr)
  // printAll();
  // }

})



//method sandwich

// const methodStack = (className, favorite, name, target) => {
//   //run the total functions needed for click event
//   //move from array to array
//   favorite == 'false' ? movingTrucks(name, mainArr, favoritesArr) : movingTrucks(name, favoritesArr, mainArr);

//   //toggle data-isFav
//   //toggle class
//   //printAll()

// }



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

const movingTrucks = (n, arr1, arr2) => {
  arr1.forEach(elm => {
    let name = elm.name.toLowerCase();
    if (name === n) {
      let index = (arr1.indexOf(elm));
      // cutArr()
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
  

  // // elm == 'true' ? elm = 'false' : elm = 'true';
  // if (!fav == 'true') {
  //   return fav = 'true';
  // }
  
  // if (fav == 'true') {
  //   return fav = 'false';
  // }

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
}, 690);
 
// newDiv.textContent = "hey its a new Div here";
// body.append(newDiv)