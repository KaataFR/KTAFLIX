document.addEventListener('DOMContentLoaded', function() {
    var parentElements = document.querySelectorAll('section#mangas h2');
  
    parentElements.forEach(function(parent) {
      var h2Elements = parent.querySelectorAll('h2');
  
      h2Elements.forEach(function(h2) {
        var text = h2.textContent;
        var letters = text.split('');
  
        h2.textContent = '';
  
        letters.forEach(function(letter) {
          var span = document.createElement('span');
          span.textContent = letter;
          h2.appendChild(span);
        });
      });
    });
  });
  