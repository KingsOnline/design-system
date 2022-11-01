// strip activity label keywords from activity title
$(`#page-mod-book-print #page-content h1:first-of-type:contains('activity-label'),
   #page-mod-book-print #page-content .book_info td:contains('activity-label')`
  ).html(function(i, currentText) {
  return currentText.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
})
if (window.matchMedia('print').matches) {
  $(`#page-content h1:first-of-type:contains('activity-label'),
     #page-content .book_info td:contains('activity-label')`
  ).html(function(i, currentText) {
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
$('#page-content').has('[class^="book_toc"] > ul > li:only-child').addClass('single-chapter-book')
  .find('.book_info + .w-100').addClass('toc-container');

/* footnotes for print */
// create footer for reference list
$('#page-mod-book-print .footnotes-article').each(function() {
  // if footer does not exist
  if ($(this).find('.footnotes-footer').length == 0) {
    // create footer
    $(this).append(`<div class='footnotes-footer' role='doc-footnote'><ol></ol></div>`);
    // for each citation
    $(this).find('.footnotes-body span.quote').not('.footnotes-article .footnotes-article span.quote').each(function(i) {
      const footnotesArticle = $(this).parents('.footnotes-article').not('.footnotes-article .footnotes-article');
      i++;
      // move each ref into ref list
      $(this).find('.ref').appendTo((footnotesArticle).find('.footnotes-footer ol').not('.footnotes-article .footnotes-article .footnotes-footer')).wrap(`<li id='ref${i}'></li>`);
    });
  }
  // nested footnotes in Transcript or View/hide components only
  $(this).find('[class*="view-"][class*="-container"] .footnotes-article, .transcript-container .footnotes-article').each(function(i) {
    // if nested footer does not exist
    if ($(this).find('.footnotes-footer').length == 0) {
      // create nested footer
      $(this).append(`<div class='footnotes-footer' role='doc-footnote'><ol></ol></div>`);
      i++;
      // for each nested citation
      $(this).find('.footnotes-body span.quote').each(function(j) {
        const nestedFootnotesArticle = $(this).parents('.footnotes-article [class*="view-"][class*="-container"] .footnotes-article, .footnotes-article .transcript-container .footnotes-article');
        j++;
        // move each nested ref into nested ref list
        $(this).find('.ref').appendTo((nestedFootnotesArticle).find('.footnotes-footer ol')).wrap(`<li id='ref${i}-${j}'></li>`);
      });
    }
  });
});
