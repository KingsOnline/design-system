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

/* toc */
// identify single chapter books
$("#page-content").has('[class^="book_toc"] ul li:only-child').addClass("single-chapter-book")
  .find(".book_info + .w-100").addClass("toc-container");

/* footnotes */
// create footer for reference list
$(".footnotes-article").append('<div class="footnotes-footer" role="doc-footnote"><ol></ol></div>');
// for each citation
$(".footnotes-article .footnotes-body span.quote").each(function(i) {
  const footnotesArticle = $(this).parents(".footnotes-article");
  i++;
/*
  // add link to ref from quote
  $(this).attr("class", "quote-text").wrap(`
    <a id="quote${i}" class="quote" role="doc-noteref" title="Jump to reference" href="#ref${i}"></a>
  `);
*/
  // move each ref into ref list
  //$(this).find(".ref").appendTo($(this).parents(".footnotes-article").find(".footnotes-footer ol")).wrap(`<li id="ref${i}"></li>`);
  $(this).find(".ref").appendTo((footnotesArticle).find(".footnotes-footer ol")).wrap(`<li id="ref${i}"></li>`);
});
