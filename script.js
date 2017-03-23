fetch('contacts.json')
    .then(response => response.json())
    .then(appFn);

function appFn(contactList) {
    const list = document.getElementById('list')
    const ul = document.createElement('ul');

    contactList.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    })

    let letter = '';
    contactList.forEach((contact) => {
        const { name } = contact;
        const li = document.createElement('li');
        const currentLetter = name.charAt(0);
        if (currentLetter !== letter) {
            letter = currentLetter;
            const letterLi = document.createElement('li');
            letterLi.innerHTML = `<span class="letter">${currentLetter}</span>`;
            ul.appendChild(letterLi);
        }
        li.innerHTML = `<span class="name">${contact.name}</span>`;
        ul.appendChild(li);
    })

    list.appendChild(ul);
    const letters = document.getElementsByClassName('letter');
    let closerLi = null;
    let movingLi = null;
    let distance=0;
    window.onscroll = function() {
        closerLi = null;
        movingLi = null;
        for (let i=0;i<letters.length;i++) {
            const li = letters[i].parentNode;
           distance=li.nextSibling.offsetTop - 45;
                if (distance < window.pageYOffset) {
                    closerLi = li
                }
                else if (distance-45 < window.pageYOffset) {
                    movingLi = li
                }
                li.style.position = 'static';
        }
        if (movingLi && closerLi) {
            closerLi.style.position = 'relative';
            closerLi.style.top = (movingLi.offsetTop - closerLi.nextSibling.offsetTop)+'px';
        }
        else if (closerLi) {
            closerLi.style.position = 'relative';
            closerLi.style.top = (window.pageYOffset - closerLi.nextSibling.offsetTop + 45)+'px';
        }
    }
}