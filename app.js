// Get all the slides
const slides = document.querySelectorAll('.slider-container .slide');
// The eraser
const eraser = document.querySelector('.eraser');
// Previous btn
const prev = document.getElementById('previous');
// Next btn
const next = document.getElementById('next');
// Time until nextSlide triggers in milliseconds
const intervalTime = 5000;
// Time to wait until the .eraser goes all the way
const eraserActiveTime = 700;
// Variable used to save the setInterval and clear it when needed
let sliderInterval;


// Automatically change slides every intervalTime
const nextSlide = () => {
  // 1. Add the .active class to the eraser - this will trigger the eraser to move to the left
  eraser.classList.add('active');

  // 2. Set a Timeout that will allow the eraser to move all the way to the left.
  // 2. This is where we will use the eraserActiveTime.
  setTimeout(() => {
    // 3. Get the active .slide and toggle the .active class on it (in this case, remove it)
    const active = document.querySelector('.slide.active');
    active.classList.toggle('active');

    // 4. Check if the .slide has a next element sibling. If it has, add the .active class to it.
    if (active.nextElementSibling) {
      active.nextElementSibling.classList.toggle('active');
    } else {
      // 5. Last element in the list, add the .active class to the first slide (index 0)
      slides[0].classList.toggle('active');
    }
    // 6. Remove the .active class from the eraser, the eraser will move back to the right.
    // 6. It waits 200 ms before doing this (enough time for the next .slide to move in place.)
    setTimeout(() => {
      eraser.classList.remove('active');
    }, 200);
  }, eraserActiveTime);
};

// We set an interval which will run every intervalTime milliseconds and it will change the slide
sliderInterval = setInterval(nextSlide, intervalTime);


// prevSlide function, manually change slide by pressing the buttons
const prevSlide = () => {
  eraser.classList.add('active');
  setTimeout(() => {
    const active = document.querySelector('.slide.active');
    active.classList.toggle('active');

    // The *changed* part from the nextSlide code
    if (active.previousElementSibling) {
      active.previousElementSibling.classList.toggle('active');
    } else {
      slides[slides.length - 1].classList.toggle('active');
    }
    // End of the changed part

    setTimeout(() => {
      eraser.classList.remove('active');
    }, 200);
  }, eraserActiveTime);
};

// eventListers to the buttons 
// reset the interval as we don't wait it to run while we are pressing the buttons.
// So we clear the old interval and create a new one.
next.addEventListener('click', () => {
  nextSlide();
  clearInterval(sliderInterval);
  sliderInterval = setInterval(nextSlide, intervalTime);
});

prev.addEventListener('click', () => {
  prevSlide();
  clearInterval(sliderInterval);
  sliderInterval = setInterval(nextSlide, intervalTime);
});
