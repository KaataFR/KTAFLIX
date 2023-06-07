fetch('/site.json')
  .then(response => response.json())
  .then(data => {
    generateSections(data);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
  });

  function generateSections(data) {
    const wrapper = document.querySelector('main');
  
    data.forEach(item => {
      const section = document.createElement('section');
      section.id = item.key;
  
      const heading = document.createElement('h2');
      heading.textContent = item.type;
  
      const ul = document.createElement('ul');
      ul.classList.add('list-site');
  
      item.site.forEach((site, index) => {
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        const thumbnail = document.createElement('img');
        const title = document.createElement('p');
  
        title.textContent = item.site[index];
  
        anchor.target = "_blank";
        anchor.href = item.link[index];
        thumbnail.src = `/images/thumbnail/${item.key}/${site}.png`;
  
        anchor.appendChild(thumbnail);
        li.appendChild(anchor);
        li.appendChild(title);
        ul.appendChild(li);
      });
  
      section.appendChild(heading);
      section.appendChild(ul);
      wrapper.appendChild(section);
    });
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



