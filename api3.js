
const getData = async (paths) => {
  const promises = paths
    .map(path => fetch(`https://freerandomapi.cyclic.app/api/v1/${path}`)
    .then(r => r.json()));

  // const accounts = await Promise.all(promises);   
  // console.log(accounts);
  const accounts = await Promise.all(promises);
  console.log(accounts);

  [treatObj, dogObj] = accounts;

  const myHtml = elemFromHtml(`
  <h2>${dogObj.data[4].name}</h2>  
  `);

  const firstHtml = elemFromHtml(`
  <h3>${treatObj.data[4].name}</h3>
  `)
  document.body.appendChild(firstHtml, myHtml);
  
  
};
getData(["desserts?category=Ice_Cream&limit=50", "dogs"]);

{/* <h3>${treatObj.data[4].name}</h3> */}

const elemFromHtml = (html) => {
  const template = document.createElement("template");  
  template.innerHTML = html.trim();
  return template.content.firstElementChild;    
}

