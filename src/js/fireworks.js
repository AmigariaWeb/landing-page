
let isFired = false;
const FOOTER = document.getElementsByTagName("footer")[0]
const sectionOptions = {
	root: null,
  rootMargin: "-300px"
};

const sectionObserver = new IntersectionObserver(function(entries, sectionObserver) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
    } else {
        if (!isFired) {
            isFired = true;
            confettiFirework();
            confettiFlow();
        }
    }
  });
}, sectionOptions);

sectionObserver.observe(FOOTER);

function confettiFirework(){
  var duration = 15 * 1000;
var animationEnd = Date.now() + duration;
var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

    

        var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            isFired = false;
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    
}

function confettiFlow(){
        var end = Date.now() + (15 * 100);

      // go Buckeyes!
      var colors = ['#003a70', '#002140', '#007d8a', '#71cc98', '#f8e08e', '#fff'];

      (function frame() {
        confetti({
          particleCount: 10 ,
          angle: 90,
          spread: 10,
          origin: { y: 1 },
          colors: colors
        });
        confetti({
          particleCount: 10,
          spread: 50,
          angle: 80,
          origin: { y: 1.3 , x:0.6 }
        });
        confetti({
          particleCount: 10,
          spread: 50,
          angle: 100,
          origin: { y: 1.3 , x:0.4 }
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
}