fetch("site.json")
  .then((response) => response.json())
  .then((data) => {
    generateSections(data);
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors du chargement du fichier JSON :",
      error
    );
  });

  const audioPlayer = document.getElementById('audio-player');
  audioPlayer.volume = 0.1; // Set the volume to 10%

function generateSections(data) {
  const wrapper = document.querySelector("main");
  data.forEach((item) => {
    const section = document.createElement("section");
    section.id = item.key;

    const heading = document.createElement("h2");
    heading.textContent = item.type;

    const ul = document.createElement("ul");
    ul.classList.add("list-site");

    item.site.forEach((site, index) => {
      const li = document.createElement("li");
      const anchor = document.createElement("a");
      const thumbnail = document.createElement("img");
      const title = document.createElement("p");

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
}

const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - 150; // Adjust the scroll position by 50 pixels higher
    const duration = 50; // Adjust the duration of the scroll animation (in milliseconds)
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(
        0,
        easeInOutCubic(progress, startPosition, distance, duration)
      );
      if (progress < duration) window.requestAnimationFrame(step);
    }

    // Easing function for smooth scrolling
    function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    }
  });
});
