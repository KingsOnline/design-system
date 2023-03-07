const externalLink = $('a[target="_blank"]');
if ((externalLink).length) {
  $(window).on('load', function() {
    addNewWindowIcon();
    addNewWindowMessage();
  });
}
function addNewWindowIcon() {
  $(externalLink).each(function(i) {
      // only add icon if in embedded question iframe and icon not already present
      if ($(this).parents('#page-filter-embedquestion-showquestion').length && $(this).children('i').filter('.open-icon').length == 0) {
        $(this).append(`<i class='open-icon fas fa-external-link-alt fa-xs' aria-hidden='true'></i>`);
      }
  });
}
function addNewWindowMessage() {
  $(externalLink).each(function(i) {
    // add span if not already present
    if ($(this).find('.sr-link-message').length == 0) {
      $(this).append(`<span class='sr-only sr-link-message'>(opens in a new tab)</span>`);
      $(this).attr('rel', 'noopener');
    }
  });
}