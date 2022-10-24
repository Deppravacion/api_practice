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


//grab data from API's
const getData = async (paths) => {
  const promises = paths
    .map(path => fetch(`https://freerandomapi.cyclic.app/api/v1/${path}`)
    .then(r => r.json()));
  const accounts = await Promise.all(promises);


  [iceCreamObj, cookieObj, donutObj] = accounts;
  console.log(accounts);
  console.log(arraySet);

  giveMewhatIWant([iceCreamObj, cookieObj, donutObj], mainArr);
};

getData(["desserts?category=Ice_Cream&limit=10", "desserts?category=Cookie&limit=10", "desserts?category=Donut&limit=10"]);

//grab object key/value data
const giveMewhatIWant = (api, arr) => {
  api.forEach(obj => {
    obj.data.forEach(item => {
      [name, category,  description, photo, favorited=false,] = [item.name, item.category, item.description, item.photoUrl ];
      arr.push({name, category, description, photo, favorited}); 
    })
  })
}

//create html cards
const createCards = (arr, section) => {
  const cards = arr

    .map(({name, category, description, photo, favorited}) => (
      `
      <div id="card-wrapper" class="card-wrapper " data-cardName="${name}">
        <div class="card-header">
          <h2>${name}</h2>         
        </div>
        <div class="card-content">         
          ${description ? `<p>${description}</p>` : ''}
    
    
          <div class="img-wrapper">
            <img src="${photo}">
          </div>
          <div class="button" id="button" title="${name.toLowerCase()}" data-button="true" data-is-fav="false" data-get-fav=${favorited}>
            add/remove
          </div>
          <div id="star-div" class="star"></div>
        </div>
      </div>

      `

    )).join('')
  section.innerHTML = cards;
}


//click event can stack methods from movingTruck()
document.addEventListener('click', (e) => {
  const divCardWrapper = document.querySelector('#card-wrapper');
  const divStar = document.getElementById('star-div');


  const target = e.target;
  const data = target.dataset;
  const title = target.title;

  const button = data.button; // this is to verify button for click event
  const favorite = data.isFav; // this is where we need to do work
  const newFav = data.getFav;


  if (!button == 'true') {
    return
  }
  
  
  
  
  console.log(`this is the newFav '${typeof(newFav)}'`);

  newFav === false ? movingTrucks(title, mainArr, favoritesArr) : movingTrucks(title, favoritesArr, mainArr);
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
  const style = 'yellow';
  elm.classList.toggle(style);
}





// create the favorite key on the object in order to handle this better
const favToggler = (elm) => {


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