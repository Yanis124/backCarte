let mybutton = document.getElementById("back2Top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});

}



function appearMessageImg(link){ //show images in the footer  when we hover over links and emails 
    var img=link.children[1]
    img.style.display="block"
}

function hideMessageImg(link){
    var img=link.children[1]
    img.style.display="none"
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  
  document.getElementById("main").style.marginRight = "250px";
  document.getElementById("main").style.visibility="visible"
  document.getElementById("main").style.opacity=".8"

  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.filter="blur(2px)";
  
    
  
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
  document.getElementById("main").style.visibility="visible"
  document.getElementById("main").style.opacity="1"
  document.getElementById("main").style.filter="blur(0px)";
}

