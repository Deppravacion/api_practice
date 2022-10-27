

const iceCreams = fetch('https://freerandomapi.cyclic.app/api/v1/desserts?category=Ice_Cream&limit=50');
const dogs = fetch('https://freerandomapi.cyclic.app/api/v1/dogs');

iceCreams
.then((data) => data.json())

.then((data) => {
 const iceCream = data;
 const dessertObj = Object.values(iceCream);
 console.log(dessertObj);
 console.log(data);
 dessertObj[3].forEach(item => {
  console.log(item.name);
  let dessertList = [];
  dessertList = dessertList.push(item.name);
 })
})
.catch((err) => console.log(err));




// dogs
// .then((data) => data.json())
// .then((data) => console.log(data))
// .catch((err) => console.log(err));


// Promise
//   .all([iceCreams, dogs])
//   .then((response) => {
//     return Promise
        // .all(response
        // .map((res) => res.json()));
//   })
//   .then((data) => {


//     const [iceCream, pup] = data;
//     console.log(pup);
//     console.log(iceCream.data[0].name);

// });


let cardItems = `<h2>${iceCreams.data[0].name}</h2>`;
let myDiv = document.querySelector('div');

for (let card of cards) {
  cardItems += `
  <div class="card-body">
    <h2>${card.name}</h2>
    <img src="${card.photo}">
  </div>
  `
  myDiv.innerHTML = cardItems;
}


//%^%^%^^%^%^%^%^%^%^^%^%^%^%^%^%




// const promise = new Promise((resolve, reject) => {
//   // resolve('oh heck ya');
// setTimeout(() => {
//   reject({});
// }, 3000);
// });

// promise
// .then((data) => console.log(data))
// .catch((err) => console.log(err, ' no data'));


// const youTubePost = { id: 1, comment: 'You are awesome'};
// const hobbies = ['skateboarding', 'snowboarding', 'chicks'];

// const post = new Promise((res, err) => {
//   setTimeout(() => {
//     res(youTubePost);
//   }, 4000);
//  });

// const hobby = new Promise((res, err) => {
//   setTimeout(() => {
//     res(hobbies);
//   }, 1000);
// });

// Promise
// .all([post, hobby])
// .then((data) => {
//   const [ytPost, myHobbies] = data;
//   console.log(ytPost, myHobbies);
// });