// toggle side bar menus
const blockHide = "#block-region-side-pre .block .title h2, #block-region-side-post .block .title h2";
$(document).on("click", blockHide, function(event) {
  $(this).parents(".block").toggleClass('hidden');
});

// hide and show collapse card
$(document).on("click", ".collapse-card .collapse-header button", function(event) {
  $(this).parents(".collapse-card").toggleClass("collapsed");
});

// toggle transcript button text and transcript card
$(document).on("click", ".transcript-button-group a.view-close-transcript", function(event) {
  $(this).text($(this).text() == 'View transcript' ? 'Hide transcript' : 'View transcript');
  $(this).parents(".transcript-container").toggleClass("collapsed");
});
      