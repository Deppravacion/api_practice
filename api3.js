
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
  let ul = document.createElement('ul');
  dogObj.data.forEach(item => {
    console.log(item.name);
    dogNamesArr.push(item.name);
 
  })

  dogNamesArr.sort();
  dogNamesArr.reverse();

  for (let dog of dogNamesArr) {
    let li = document.createElement('li');
    li.innerText = dog;
    ul.appendChild(li);
  }

  const myHtml = elemFromHtml(`
  <h2>${dogObj.data[4].name}</h2>  
  `);

  document.body.appendChild(ul);
  
  
};
getData(["desserts?category=Ice_Cream&limit=50", "dogs"]);

{/* <h3>${treatObj.data[4].name}</h3> */}



const elemFromHtml = (html) => {
  const template = document.createElement("template");  
  template.innerHTML = html.trim();
  return template.content.firstElementChild;    
}

