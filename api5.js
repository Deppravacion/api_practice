// https://favorites-api.vercel.app/
const body = document.body;
const newDiv = document.createElement('div');
const container = document.querySelector('.container');
const main = document.querySelector('[data-section="main"]');
const master = document.querySelector('[data-section="master"]');
const favorites = document.querySelector('[data-section="favorites"]');
const categoryTotal = document.querySelector('[data-section="totals"]');

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

  giveMewhatIWant([iceCreamObj, cookieObj, donutObj], mainArr);
};

getData(["desserts?category=Ice_Cream&limit=10", "desserts?category=Cookie&limit=10", "desserts?category=Donut&limit=10"]);

//grab object key/value data
const giveMewhatIWant = (api, arr) => {
  api.forEach(obj => {
    obj.data.forEach(item => {
      [name, category,  description, photo, favorited=!true,] = [item.name, item.category, item.description, item.photoUrl ];
      arr.push({name, category, description, photo, favorited}); 
    })
  })
}

//create html cards
const createCards = (arr, section) => {
  const cards = arr

    .map(({name, category, description, photo, favorited}) => (
      `
      <div id="card-wrapper" ${favorited ? `class="card-wrapper favorites"` : `class="card-wrapper"`}  data-cardName="${name}" data-fav-status=${favorited}>
        <div class="card-header">
          <h2>${name}</h2>         
        </div>
        <div class="card-content">         
          ${description ? `<p class="text-scroll">${description}</p>` : ''}
    
    
          <div class="img-wrapper">
            <img src="${photo}">
          </div>
          <div class="button" id="button" title="${name.toLowerCase()}" data-button="true" data-is-fav="false" data-get-fav=${favorited}>
            add/remove
          </div>
          <div id="star-div" ${favorited ? `class="star yellow"` : `class="star"`}></div>
        </div>
      </div>

      `

    )).join('')
  section.innerHTML = cards;
}

//update category totals html
const createTotals = (favorites, node) => { //use arraySet[1]

  let creamTally = 0;
  let cookieTally = 0;
  let donutTally = 0;
  favorites.forEach(favorite => {
    const category = favorite.category;

    if (category === 'Ice_Cream') {
      creamTally ++;
    }
    if (category === 'Cookie') {
      cookieTally ++;
    }
    if (category === 'Donut') {
      donutTally ++;
    }

  })

  printTotals(creamTally, cookieTally, donutTally);
}



//click event can stack methods from movingTruck()
document.addEventListener('click', (e) => {
  const divCardWrapper = document.querySelector('#card-wrapper');
  const divStar = document.getElementById('star-div');
  const wrapperData = document.querySelector('[data-get-fav]');


  const target = e.target;
  const data = target.dataset;
  const title = target.title;

  const button = data.button; // this is to verify button for click event
  const favStatus = data.isFav; // this is where we need to do work
  const newFav = data.getFav;


  if (!(button == 'true')) {
    return
  }

  if (newFav === 'false') {
    movingElements(title, mainArr, favoritesArr);
    divCardWrapper.setAttribute('data-get-fav', 'true');
  } else {    
    movingElements(title, favoritesArr, mainArr);
    divCardWrapper.setAttribute('data-get-fav', 'false');
  }

  printAll();
})

//click event for sorting function
document.addEventListener('click', e => {
  const alpha = 'alpha';
  const sortOrder = e.target.dataset.sort;

  sortOrder == alpha ? alphaSort(favoritesArr) : reversoSort(favoritesArr);
  printFavorites();
})


//function n is the string to match, arr1 is the array to search, arr2 arr to push

const movingElements = (n, arr1, arr2) => {
  arr1.forEach(elm => {
    let name = elm.name.toLowerCase();
    if (name === n) {
      
      let index = (arr1.indexOf(elm));
      arr1.splice((index), 1);
      arr2.push(elm);   
      
      elm.favorited = !elm.favorited;
      // elm.favorited = elm.favorited ? false : true;
    }
  })
}

//add class   this is NOT adding the class...
const classToggler = (elm) => {
  elm.classList.toggle('yellow');
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
  createTotals(favoritesArr, categoryTotal);
}

const printTotals = (aSum, bSum, cSum) => { // parameters are the totals
  const spanCream = document.getElementById('cream');
  const spanCookie = document.getElementById('cookie');
  const spanDonut = document.getElementById('donut');

  spanCream.innerText = aSum;
  spanCookie.innerText = bSum;
  spanDonut.innerText = cSum;
}

setTimeout(() => {
  printAll();
}, 800);
