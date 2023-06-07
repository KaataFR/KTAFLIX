fetch('site.json')
  .then(response => response.json())
  .then(data => {
    generateSections(data);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
  });


  function setupCarousel() {
    const carousel = document.querySelector('.list-site');
    const carouselItems = Array.from(carousel.children);
    const carouselItemWidth = carouselItems[0].offsetWidth;
  
    let currentPosition = 0;
  
    function animateCarousel() {
      carousel.style.transform = `translateX(${currentPosition}px)`;
    }
  
    function moveCarousel(direction) {
      currentPosition += direction * carouselItemWidth;
      animateCarousel();
    }
  
    // Déplacer le carrousel vers la droite
    function moveRight() {
      moveCarousel(-1);
    }
  
    // Déplacer le carrousel vers la gauche
    function moveLeft() {
      moveCarousel(1);
    }
  
    // Cloner les premiers éléments pour créer une apparence de carrousel infini
    const clonedItems = carouselItems.slice(0, 2).map(item => item.cloneNode(true));
    carousel.append(...clonedItems);
  
    // Ajouter des écouteurs d'événements pour les boutons de défilement
    document.querySelector('.carousel-button-right').addEventListener('click', moveRight);
    document.querySelector('.carousel-button-left').addEventListener('click', moveLeft);
  }



  function generateSections(data) {
    const wrapper = document.querySelector('main');
  
    data.forEach(item => {
      const section = document.createElement('section');
      section.id = item.key;
  
      const heading = document.createElement('h2');
      heading.textContent = item.type;
  
      const ul = document.createElement('ul');
      ul.classList.add('list-site');
      ul.classList.add('carousel'); // Ajout de la classe carousel au ul
  
      item.site.forEach((site, index) => {
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        const thumbnail = document.createElement('img');
        const title = document.createElement('p');
  
        title.textContent = item.site[index];
  
        anchor.target = "_blank";
        anchor.href = item.link[index];
        thumbnail.src = `images/thumbnail/${item.key}/${site}.png`;
  
        anchor.appendChild(thumbnail);
        li.appendChild(anchor);
        li.appendChild(title);
        ul.appendChild(li);
      });
  
      section.appendChild(heading);
      section.appendChild(ul);
      wrapper.appendChild(section);
    });
  
    setupCarousel(); // Appel de la fonction setupCarousel une fois que les sections et le carrousel sont générés
  }
  
  











// Sélectionnez tous les liens d'ancre avec la classe "scroll-link"
const scrollLinks = document.querySelectorAll('.scroll-link');

// Parcourez chaque lien d'ancre
scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault(); // Empêche le comportement de défilement par défaut

        // Obtenez l'élément cible en utilisant l'attribut "href" du lien d'ancre
        const target = document.querySelector(link.getAttribute('href'));

        // Faites défiler la fenêtre jusqu'à l'élément cible en utilisant scrollIntoView avec le comportement "smooth"
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});




