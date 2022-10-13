let dogNamesArr = [];
let treatNamesArr = [];


const getData = async (paths) => {
  const promises = paths
    .map(path => fetch(`https://freerandomapi.cyclic.app/api/v1/${path}`)
    .then(r => r.json()));

  // const accounts = await Promise.all(promises);   
  // console.log(accounts);
  const accounts = await Promise.all(promises);
  console.log(accounts);

  [treatObj, dogObj] = accounts;

  let div = document.createElement('div');
  let ul = document.createElement('ul');



  dogObj.data.forEach(item => {
    // console.log(item.name);
    dogNamesArr.push(item.name); 
  })

  treatObj.data.forEach(item => {
    console.log(item.name);
    treatNamesArr.push(item.name);
  })

  dogNamesArr.sort();
  treatNamesArr.sort();  

  for (let name of dogNamesArr) {
    let li = document.createElement('li');
    li.innerText = name;
    ul.appendChild(li);
 
  }
  // DRY principal here on the for loops, bring them out side create a function to use here

  for (let name of treatNamesArr) {
    let li = document.createElement('li');
    li.innerText = name;
    ul.appendChild(li);
  }

  // for (let)








  document.body.appendChild(ul);
  
  
};
getData(["desserts?category=Ice_Cream&limit=50", "dogs"]);


const elemFromHtml = (html) => {
  const template = document.createElement("template");  
  template.innerHTML = html.trim();
  return template.content.firstElementChild;    
}

