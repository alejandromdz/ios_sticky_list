fetch('contacts.json')
    .then(response => response.json())
    .then(appFn);

function appFn(contactList) {
    const list = document.getElementById('list')
    const ul = document.createElement('ul');
    const anchorsUl = document.createElement('ul');
    anchorsUl.classList.add('anchors');

    contactList.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    })

    let letter = '';
    scrollTo = (letter) => {
        return function () {
            const li = document.getElementById(letter).parentNode;

            window.scroll({
                left: 0,
                top: li.nextSibling.offsetTop - 45,
                behavior: 'smooth'
            });
        }
    }
    contactList.forEach((contact) => {
        const { name } = contact;
        const li = document.createElement('li');
        const currentLetter = name.charAt(0);
        if (currentLetter !== letter) {
            letter = currentLetter;
            const letterLi = document.createElement('li');
            const anchorLi = document.createElement('li');
            letterLi.innerHTML = `<span class="letter" id="${currentLetter}">${currentLetter}</span>`;
            anchorLi.innerHTML = `<a>${currentLetter}</a>`;
            anchorLi.onclick = scrollTo(currentLetter);
            anchorsUl.appendChild(anchorLi);
            ul.appendChild(letterLi);
        }
        li.innerHTML = `<span class="name">${contact.name}</span>`;
        ul.appendChild(li);
    })

    list.appendChild(ul);
    list.appendChild(anchorsUl);
    const letters = document.getElementsByClassName('letter');
    let closerLi = null;
    let movingLi = null;
    let distance = 0;



    for (let i = 0; i < letters.length; i++) {
        const li = letters[i].parentNode;
        li.style.zIndex = i;
    }
    window.onscroll = function () {
        closerLi = null;
        movingLi = null;
        for (let i = 0; i < letters.length; i++) {
            const li = letters[i].parentNode;
            distance = li.nextSibling.offsetTop - 45;

            if (distance < window.pageYOffset) {
                closerLi = li;
                continue;

            }
            else if (distance < window.pageYOffset + 45) {
                movingLi = li;

            }
            li.nextSibling.style.marginTop = '0px'
            li.style.top = '0px'
            li.style.position = 'static';
        }
        if (movingLi && closerLi) {
            closerLi.style.position = 'relative';
            closerLi.style.top = (movingLi.offsetTop - closerLi.nextSibling.offsetTop) + 'px';
            closerLi.nextSibling.style.marginTop = '0px';
        }
        else if (closerLi) {
            closerLi.style.position = 'fixed';
            closerLi.style.top = 0 + 'px';
            closerLi.nextSibling.style.marginTop = '45px';
        }
    }
}