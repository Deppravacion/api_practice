const container = document.querySelector('.container');

const cardArr = [];

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
      [name, description, photo] = [item.name, item.description, item.photoUrl];
      card.push({name, description, photo}); 
    })
  })
}

const createCards = () => {
  const cards = cardArr
  // .map(({color, header, des1, des2}) => (
  .map(({name, description, photoUrl}) => (
    `
      <div class="card-wrapper blue">
        <div class="card-header">
          <h2>${name}</h2>
         
        </div>
        <div class="card-content">
          <p>${description}</p>
          <p>${photoUrl}</p>
        </div>
      </div>

    `

  )).join('')
  console.log(cards);
  container.innerHTML = cards;
}

createCards();


// partial works. the desctrucutre object for treats work, but dogs needs keys