if ($(window.parent.document.body).is("#page-mod-book-print")) {
  $(".validationerror, .im-controls").hide();  
  document.querySelector(".que").insertAdjacentHTML("beforebegin", "<div class='embedded-question'></div>");  
}
