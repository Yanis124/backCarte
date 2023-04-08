

const nextBtn = document.querySelector('.right-button');
const prevBtn = document.querySelector('.left-button');
const images = document.querySelectorAll('img');

let first=images.length-1

let currentIndex = images.length-1;

function slideIn() {

    if(first<=0){

      images[currentIndex].classList.add('slide-in');
    }

  

  
  
  
}

function slideOut() {
  images[currentIndex].classList.add('slide-out');
  images[currentIndex].classList.remove('active')
}

function slideOutPrev(){
    console.log(currentIndex)
    images[currentIndex].classList.add('slide-out-prev')
    images[currentIndex].classList.remove('active')
    
}


function changeImage() {
  images[currentIndex].classList.remove('slide-in', 'slide-out','slide-out-prev');
  images[currentIndex].classList.add('active');
  
}

nextBtn.addEventListener('click', () => {

  slideOut();
  first--;
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  slideIn();
  setTimeout(changeImage, 500);
});

prevBtn.addEventListener('click', () => {
  slideOutPrev();

  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  slideIn();
  setTimeout(changeImage, 500);
  
});

nextBtn.click()
 

setInterval(function(){
  nextBtn.click()
},5000)



