/* Blocks
   ========================================================================== */
// If sharing cart is enabled, add class to body
$('.block-region:has(.block_sharing_cart)').parents('body')
.addClass('sharing-cart-enabled');

// Add networking-block- class
$('.block ul[id*=networking-list]').each(function() {
  $(this).parents('.block').addClass($(this).attr('id')
  .replace('-list-', '-block-'));
});

// Remove old CSS from Rumdoodle
const fontAwesomeCSS =
$('link[href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css"]')
if (fontAwesomeCSS.length > 0) {
  fontAwesomeCSS.remove();
}

/* External links in paragraphs
   ========================================================================== */

// If external links are present
const externalLink = $('a[target="_blank"]');
if ((externalLink).length) {
  $(window).on('load', function() {
    addNewWindowIcon();
    addNewWindowMessage();
  });
}

function addNewWindowIcon() {
  $(externalLink).each(function(i) {
    // Only add icon if in region main and icon not already present
    if ($(this).parents('#region-main').length && $(this).children('i')
    .filter('.open-icon').length == 0) {
      $(this).append(`<i class='open-icon fas fa-external-link-alt fa-xs' aria-hidden='true'></i>`);
    }
  });
}

function addNewWindowMessage() {
  $(externalLink).each(function(i) {
    // Add span if not already present
    if ($(this).find('.sr-link-message').length == 0) {
      $(this).append(`<span class='sr-only sr-link-message'>(opens in a new tab)</span>`);
      $(this).attr('rel', 'noopener');
    }
  });
}

/* Carousel
   ========================================================================== */

$(document).on('click', '.carousel-control-prev, .carousel-control-next, .carousel-indicators li', function(event) {
  // prevent carousel from rising to top of page
  event.preventDefault();
  let carouselContainer = $(this).parents('.carousel');
  // count no of slides
  let maxSlides = carouselContainer.find('.carousel-item').length;
  $(this).is('.carousel-indicators li')
    ? newSlide = $(this).data('slide-to') + 1
    : (currentSlide = (carouselContainer.find('.carousel-item.active' ).index() + 1),
      newSlide = $(this).hasClass('carousel-control-next')
      ? currentSlide + 1
      : currentSlide - 1);
  carouselContainer.removeClass('start finish');
  // hide prev control on first slide
  newSlide === 1
    ? carouselContainer.addClass('start')
    // hide next control on last slide
    : newSlide === maxSlides
      ? carouselContainer.addClass('finish') : '';
});

/* New carousel
   ========================================================================== */

// On window load, set width
$(window).on('load', function() {
  resetCarWidth();
});
// Also on re-size
$(window).resize(function() {
  resetCarWidth();
});
function resetCarWidth() {
  // Resize to make integer width so scroll will work
  // Remove the in-line attribute if it has been set in the editor
  $('.new-carousel').removeAttr('style');
  var loadWidth = Math.floor($('.new-carousel').width());
  $('.new-carousel').each(function() {
    $(this).width(loadWidth);
  });
};

// Change slide when previous/next buttons or indicators are clicked
$('.new-carousel').on('click', '.nc-previous, .nc-next, .indic-dots li', function(event) {
  // get component width
  var ncGallery = $(this).parents('.new-carousel').find('.nc-gallery');
  var slideWidth = Math.floor($(ncGallery).width());
  // scroll value is -/+ depending on button being previous/next
  // or slide width * index if indicator
  scrollDistance = $(this).hasClass('nc-previous')
    ? '-=' + slideWidth
    : $(this).hasClass('nc-next')
      ? '+=' + slideWidth
      : slideWidth * $(this).index();
  $(ncGallery).animate({opacity:'0'}, 300)
  .animate({scrollLeft: scrollDistance}, 2).animate({opacity:'1'}, 300);
});

// Upon slide change - triggered by clicking on previous/next buttons
// or indicators, update indicators and disable buttons if appropriate
$('.new-carousel .nc-gallery').scroll(function() {
  var newCarousel = $(this).parents('.new-carousel');
  // Get component width
  var slideWidth = Math.floor($(this).width());
  // Get how far we scrolled left rounded to the nearest slideWidth
  // multiple
  var leftNumber = Math.floor($(this).scrollLeft() / slideWidth) * slideWidth;
  // Divide our scroll distance by component width to calculate which slide
  // we're on
  // (+1 to count first slide)
  var currSlideNum = (leftNumber / slideWidth) + 1;
  // Total no of slides
  var totalSlideNum = $(newCarousel).find('.nc-gallery li').length;
  // Find the indicator dot with the same index and make that dot active,
  // removing active from others
  $(newCarousel).find('.indic-dots .active').removeClass('active');
  $(newCarousel).find('.indic-dots li:nth-child(' + currSlideNum + ')')
  .addClass('active');
  // For buttons
  var ncNextButton = $(newCarousel).find('.nc-next');
  var ncPreviousButton = $(newCarousel).find('.nc-previous');
  // If slide number is last (equal to number of slides), make next button
  // inactive
  currSlideNum === totalSlideNum
    ? $(ncNextButton).attr('disabled', 'disabled')
    : $(ncNextButton).removeAttr('disabled');
  // If slide number is 1, make previous button inactive
  currSlideNum === 1
    ? $(ncPreviousButton).attr('disabled', 'disabled')
    : $(ncPreviousButton).removeAttr('disabled');
});

/* Collapse
   ========================================================================== */

// Hide and show collapse card
$(document).on('click', '.collapse-card .collapse-header', function(event) {
  event.preventDefault();
  $(this).parents('.collapse-card').toggleClass('collapsed');
  // Toggle aria that tells if expanded
  $(this).find('button').attr('aria-expanded', function (i, attr) {
    return attr == 'true' ? 'false' : 'true'
  });
});

/* Footnotes
   ========================================================================== */

// Create footer for reference list
$('.footnotes-article')
.append(`<div class='footnotes-footer' role='doc-footnote'><ol></ol></div>`);
// For each citation
$('.footnotes-article .footnotes-body span.quote')
.not('.footnotes-article .footnotes-article span.quote').each(function(i) {
  const footnotesArticle =
  $(this).parents('.footnotes-article').not('.footnotes-article .footnotes-article');
  i++;
  // Add link to ref from quote
  $(this).attr('class', 'quote-text').wrap(`
    <a id='quote${i}' class='quote' role='doc-noteref' title='Jump to reference' href='#ref${i}'></a>
  `);
  // Move each ref into ref list
  $(this).find('.ref').appendTo((footnotesArticle).find('.footnotes-footer ol')
  .not('.footnotes-article .footnotes-article ol'))
  .wrap(`<li id='ref${i}'></li>`);
  $(this).parents('a').on('click', function() {
    $('.footnotes-footer li').removeClass('selected');
    $('a.back-to-quote').each(function() {
      $(this).replaceWith($(this).html());
    });
    footnotesArticle.find(`.footnotes-footer li#ref${i}`)
    // Wrap ref in back to quote link
    .addClass('selected').find('.ref')
    .wrap(`<a class='back-to-quote' title='Back to quote' href='#quote${i}'></a>`);
    // Remove 'selected' class and a wrapper upon click
    $('a.back-to-quote').on('click', function() {
      $(this).parents('li').removeClass('selected');
      $(this).replaceWith($(this).html());
    });
  });
});

// Nested footnotes in Transcript or View/hide components only
$('.footnotes-article [class*="view-"][class*="-container"] .footnotes-article, .footnotes-article .transcript-container .footnotes-article').each(function(i) {
  i++;
  $(this).find('.footnotes-body span.quote').each(function(j) {
    const nestedFootnotesArticle = $(this).parents('.footnotes-article [class*="view-"][class*="-container"] .footnotes-article, .footnotes-article .transcript-container .footnotes-article');
    j++;
    // Add link to ref from quote
    $(this).attr('class', 'quote-text').wrap(`
      <a id='quote${i}-${j}' class='quote' role='doc-noteref' title='Jump to reference' href='#ref${i}-${j}'></a>
    `);
    // Move each ref into ref list
    $(this).find('.ref').appendTo((nestedFootnotesArticle).find('.footnotes-footer ol')).wrap(`<li id='ref${i}-${j}'></li>`);
    $(this).parents('a').on('click', function() {
      $('.footnotes-footer li').removeClass('selected');
      $('a.back-to-quote').each(function() {
        $(this).replaceWith($(this).html());
      });
      nestedFootnotesArticle.find(`.footnotes-footer li#ref${i}-${j}`)
      .addClass('selected');
      footnotesArticle.find(`.footnotes-footer li#ref${i}`)
      .addClass('selected').find('.ref')
      // Wrap ref in back to quote link
      .wrap(`<a class='back-to-quote' title='Back to quote' href='#quote${i}-${j}'></a>`);
      // Remove 'selected' class and a wrapper upon click
      $('a.back-to-quote').on('click', function() {
        $(this).parents('li').removeClass('selected');
        $(this).replaceWith($(this).html());
      });
    });
  });
});

/* Transcript
   ========================================================================== */

// Toggle transcript button text and transcript card
$(document).on('click', '.transcript-button-group .view-close-transcript', function(event) {
  event.preventDefault();
  $(this).text($(this).text() == 'View transcript' 
    ? 'Hide transcript'
    : 'View transcript');
  $(this).parents('.transcript-container').toggleClass('collapsed');
  // Toggle aria that tells if expanded
  $(this).attr('aria-expanded', function (i, attr) {
    return attr == 'true' ? 'false' : 'true'
  });
});

/* View/hide
   ========================================================================== */

// Toggle view generic, view answer, model answer, and feedback button text
// and card
var viewHideOptions = [
  'View', 'Hide',
  'View answer', 'Hide answer',
  'View description', 'Hide description',
  'View feedback', 'Hide feedback',
  'View model answer', 'Hide model answer'
];

$(document).on('click', '[class*="view-hide-"]', function(event) {
  event.preventDefault();
  // Toggle aria that tells if expanded
  $(this).attr('aria-expanded', function (i, attr) {
    return attr == 'true' ? 'false' : 'true'
  });
  // Toggle button text
  $(this).text(function(i, currentText) {
    if (viewHideOptions.includes($(this).text())) {
      $(this).parents('div[class^="view-"][class*="-container"]')
      .toggleClass('collapsed');
      if($(this).is(':contains("View")')) {
        return currentText.replace('View', 'Hide');
      } else {
        return currentText.replace('Hide', 'View');
      }
    }
  });
});

/* Moodle activity type label
   ========================================================================== */

const modActTypeOverrides = {
  assign: 'Assignment',
  choicegroup: 'Group choice',
  customcert: 'Custom certificate',
  data: 'Database',
  facetoface: 'Face-to-face',
  hvp: 'h5p',
  kalvidassign: 'Kaltura media assignment',
  hsuforum: 'Open forum',
  oublog: 'OU blog',
  ouwiki: 'OU wiki',
  pdfannotator: 'PDF annotator',
  resource: 'File',
  scorm: 'SCORM package',
  tab: 'Tab display'
};

// When not in editing mode, the Moodle activity type is not shown
// Restore this for students
$('body:not(.editing) li.activity').each(function() {
  let modActType = $.grep(this.className.split(' '), function(v, i){
     return v.indexOf('modtype_') === 0;
  }).join().substring(8);
  // Check if override is required
  if (Object.keys(modActTypeOverrides).includes(modActType)) {
    modActType = modActTypeOverrides[modActType];
  }
  // Append Moodle activity type above activity title
  $(this).find('.media-body')
  .prepend(`<div class="text-uppercase small">${modActType}</div>`);
});

/* Activity labels
   ========================================================================== */

// To do:
// Check for not yet available activities

const actLabRegex = /activity-label-/g;
const actLabContainer = `<div class="activity-label-container"></div>`;

// Custom labels
const customActLabs = [
  { prefix: '-ass', full: 'assessed', icon: 'clipboard-check' },
  { prefix: '-med', full: 'media', icon: 'circle-play' },
  { prefix: '-gro', full: 'group', icon: 'user-group' }
];

// Default labels
const actTypes = {
  assessed: [ 'assign', 'turnitintooltwo', 'workshop' ],
  media: [ 'kalvidres' ],
  group: [ 'data', 'forum', 'choicegroup', 'ouwiki', 'connecthosted', 'wiki' ]
};

// Create activity label structure
let actLabFns = function() {
  return customActLabs.map(function(actLab) {
    return `<div class="activity-label-${actLab.full}">
  <i class="fa-solid fa-${actLab.icon}"></i>
  <span class="activity-label-text">${actLab.full.charAt(0).toUpperCase() + actLab.full.slice(1)}</span>
</div>`
  })
};

// Filter activity title for prefixes, apply type classes to activity
// append label container, apply inidividual labels and remove prefixes
$('li.activity').each(function() {
  // If activity title contains prefixes
  if ($(this).find('.instancename').text().match(actLabRegex)) {
    // Append label container
    $(this).find('.activity-basis').after(actLabContainer);
    let actTitle = $(this).find('.instancename');
    $(customActLabs).each(function(i, actLab) {
      // Append label type for each prefix present
      if (actTitle.text().match(actLab.prefix)) {
        actTitle.parents('.activity').addClass(`type-${actLab.full}`);
        actTitle.parents('.activity-item').find('.activity-label-container')
        .append(actLabFns()[i]);
      };
    });
    // Remove prefixes
    actTitle.html(function(i, currentText) {
      return currentText.substring(27);
    });
  };
  // Set defaults
  let act = $(this);
  Object.entries(actTypes).forEach(([key, values], index) => {
    $(values).each(function(i, value) {
      if (act.hasClass(value)) {
        // If activity already has a label container then return
        if (act.find('.activity-label-container').length > 0) {
          return;
        // Else append container and default labels
        } else {
          act.addClass(`type-${key}`);
          act.find('.activity-basis').after(actLabContainer);
          act.find('.activity-label-container').append(actLabFns()[index]);
        };
      };
    });
  });
});

// Remove prefixes from other locations

// Document title
let documentTitle = document.title;
if (documentTitle.includes('activity-label')) {
  documentTitle = documentTitle.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
  $(document).attr('title', documentTitle);
}

// Activity page title
// Activity page breadcrumb current page
// Activity page breadcrumb link
$(`.page-header-headings h1:contains('activity-label'),
  ol.breadcrumb .breadcrumb-item > span:contains('activity-label'),
  ol.breadcrumb .breadcrumb-item > a:contains('activity-label')`).text(function(i, currentText) {
  return currentText.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
});

// Completion progress button on both section page and activity page
$(`[data-region='completion-info'] > button`).attr('title', function(i, currentText) {
  if (currentText) return currentText.replaceAll(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} |<i>|<\/i>/g, '');
});

// Course overview is generated after page load so set delay before removing
// prefix
setTimeout(function (){
  $(`.courseindex-link:contains('activity-label')`).text(function(i, currentText) {
    return currentText.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
  });
}, 2000);

// Hide activity labels within a specific course section
$('.summary span.section-hide-activity-labels').parents('li.section.main').addClass('section-hide-activity-labels');

/* OU Wiki
   ========================================================================== */

// Adding sr-only class to the 'added' and 'deleted' img tags for the OU
// Wikii history page
$('#page-mod-ouwiki-diff .ouw_diff.ouwiki_content img').each(function() {
  var altTextValue = $(this).attr('alt');
  var addedDeletedAltTextValues = [
    '[Deleted text follows]',
    '[End of deleted text]',
    '[Added text follows]',
    '[End of added text]'
  ];
  if (addedDeletedAltTextValues.includes(altTextValue)) {
    $(this).addClass('sr-only');
  }
});
