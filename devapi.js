const body = document.body
const div = document.querySelector('div')
const spanHi = document.querySelector("#hi")
const spanBye = document.querySelector('#bye')


// spanBye.remove();
// div.append(spanBye)


// div.removeChild(spanHi)

// spanBye.id = "asdf" 
// spanBye.title = "mogo"

// spanHi.removeAttribute('id')


console.log(spanHi.dataset.name);

spanBye.classList.remove('.bye2')
spanBye.classList.toggle('.bye2')

spanHi.style.color = "Red"
spanHi.style.boxShadow = "1px 1px 4px 10px red"