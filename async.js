const gitData = async () => {
  const p1 =  fetch("https://api.github.com/users/jradness");
  const p2 =  fetch("https://api.github.com/users/devslopes");
  const res = await Promise.all([p1, p2]);
  const gitPromises = res.map(r => r.json());
  const [jrad, dvslps] = await Promise.all(gitPromises);
  console.log(jrad, dvslps);

  
};

// gitData();

const getData = async (names) => {
  const promises = names
    .map(name => fetch(`https://api.github.com/users/${name}`)
    .then(r => r.json()));

  const accounts = await Promise.all(promises);
  console.log(accounts);


};
getData(["jradness", "devslopes"]);


let treatObj;
let dogObj;

const dogTreatsData = async (paths) => {
  const promises = paths
    .map(path => fetch(`https://freerandomapi.cyclic.app/api/v1/${path}`)
    .then(res => res.json()));
  
  const sources = await Promise.all(promises);
  // console.log(sources);
  [treats, dogs] = sources;
  console.log([treats, dogs]);
  return [treatObj, dogObj] = sources;
  
};

dogTreatsData(["desserts?category=Ice_Cream&limit=50", "dogs"]);

const elemFromHtml = (html) => {
  const template = document.createElement("template");
  
  template.innerHTML = html.trim();

  return template.content.firstElementChild;
}

console.log(treatObj);

const myHtml = elemFromHtml(`

<h2>this works, </h2>
`);

document.body.appendChild(myHtml);
