// strip activity label keywords from activity title
$("#page-mod-book-print #page-content h1:first-of-type:contains('activity-label'), #page-mod-book-print #page-content .book_info td:contains('activity-label')").text(function(i, currentText) {
  return currentText.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
})
if (window.matchMedia('print').matches) {
  $("#page-content h1:first-of-type:contains('activity-label'), #page-content .book_info td:contains('activity-label')").text(function(i, currentText) {
    return currentText.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
  })
}
// and document title
var documentTitle = document.title;
if (documentTitle.includes('activity-label')) {
  documentTitle = documentTitle.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
  $(document).attr('title', documentTitle);
}

// disable keats print css
if (window.matchMedia('print').matches) {
  var keatsPrintCss = document.querySelectorAll('link[href="https://keats.kcl.ac.uk/mod/book/tool/print/print.css"]');
  keatsPrintCss[0].disabled = true;
}