fetch('contacts.json')
.then(response=>response.json())
.then(appFn);

function appFn(contactList){

const list=document.getElementById('list')
const ul=document.createElement('ul');

contactList.sort((a, b)=>{
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
})

let letter='';
contactList.forEach((contact)=>{
    const {name}=contact;
    const li=document.createElement('li')
    const currentLetter=name.charAt(0);
    if(currentLetter!==letter)
    {
        letter=currentLetter;
        const letterLi=document.createElement('li');
        letterLi.innerHTML=`<span class="letter">${currentLetter}</span>`
        ul.appendChild(letterLi);
    }
    li.innerHTML+=`<span class="name">${contact.name}</span>`
    ul.appendChild(li);
})

list.appendChild(ul);

}