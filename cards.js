const container = document.querySelector('.container');

const cardArr = [
  {color: 'red', header: 'howdy', des1: 'lorem tu solem', des2: 'Odio amet hindint.'},
  {color: 'green', header: 'sukkafish', des1: 'lorem tu solem', des2: 'Odio amet hindint.'},
  {color: 'blue', header: 'TeeMoney', des1: 'lorem tu solem', des2: 'Odio amet hindint.'},
];

const createCards = () => {
  const cards = cardArr
  .map(({color, header, des1, des2}) => (
    `
      <div class="card-wrapper ${color}">
        <div class="card-header">
          <h2>${header}</h2>
          <p>${color}</p>
        </div>
        <div class="card-content">
          <p>${des1}</p>
          <p>${des2}</p>
        </div>
      </div>

    `

  )).join('')
  console.log(cards);
  container.innerHTML = cards;
}

createCards();


