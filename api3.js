
const getData = async (paths) => {
  const promises = paths
    .map(path => fetch(`https://freerandomapi.cyclic.app/api/v1/${path}`)
    .then(r => r.json()));

  // const accounts = await Promise.all(promises);   
  // console.log(accounts);
  const accounts = await Promise.all(promises);
  console.log(accounts);

  [treatObj, dogObj] = accounts;
  let dogNamesArr = [];
  let treatObjArr = [];
  let ul = document.createElement('ul');
  dogObj.data.forEach(item => {
    // console.log(item.name);
    dogNamesArr.push(item.name); 
  })

  treatObj.data.forEach(item => {
    console.log(item.name);
    treatObjArr.push(item.name);
  })

  dogNamesArr.sort();
  treatObjArr.sort();  

  for (let dog of dogNamesArr) {
    let li = document.createElement('li');
    li.innerText = dog;
    ul.appendChild(li);
 
  }

  for (let treat of treatObjArr) {
    let li = document.createElement('li');
    li.innerText = treat;
    ul.appendChild(li);
  }



  const myHtml = elemFromHtml(`
  <h2>${dogObj.data[4].name}</h2>  
  `);

  document.body.appendChild(ul);
  
  
};
getData(["desserts?category=Ice_Cream&limit=50", "dogs"]);


const elemFromHtml = (html) => {
  const template = document.createElement("template");  
  template.innerHTML = html.trim();
  return template.content.firstElementChild;    
}

