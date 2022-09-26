fetch(`https://freerandomapi.cyclic.app/api/v1/dogs`);
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => console.log(err));