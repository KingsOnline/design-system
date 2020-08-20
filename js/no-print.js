/* blocks */
// hide administration block from students or teachers without editing rights
$("#block-region-side-pre .block:has(h5.card-title:contains('Administration')):not(:has(.content #settingsnav ul li ul li a:contains('Edit settings'))), #block-region-side-post .block:has(h5.card-title:contains('Administration')):not(:has(.content #settingsnav ul li ul li a:contains('Edit settings')))").addClass("hide");
// if there are no visible blocks in aside hide it and make main region full width
$("#block-region-side-pre:not(:has(.block:not(.hide)))").addClass("hide").siblings("#region-main").removeClass("span8 pull-right");

/*
// remove this for no-print.js
// pull print button from admin block and position at top of book
printButton = $('.block_settings .tree_item.hasicon.tree_item.leaf:contains("Print book") a').clone().find('img').remove().end();
$('<div id="print-btn-container">').insertAfter('#page-mod-book-view #maincontent');
printButton.addClass('btn btn-secondary print-book-btn').text("Print").appendTo('#print-btn-container');
*/

// toggle side bar menus
const blockHide = "#block-region-side-pre .block .title h2, #block-region-side-post .block .title h2";
$(document).on("click", blockHide, function(event) {
  $(this).parents(".block").toggleClass('hidden');
});

/* card deck */
// call function when document ready if card deck is present
$( document ).ready(function() {
  if ($(".card-deck .card-body:not(:only-child)").length > 0) {
    cardDeckEqualise();
  }
});
// and again on window resize
$(window).resize(function() {
  if ($(".card-deck .card-body:not(:only-child)").length > 0) {
    location.reload(true);
    cardDeckEqualise();
  }
});
function cardDeckEqualise() {
  // if window is larger than neo-breakpoint
  if ($(window).width() > 767) {
    // get heights of all cards within a single deck
    $(".card-deck").each(function(i) {
      var heights = $(this).find(".card-body:not(:only-child)").map(function() {
        return $(this).height();
      }).get();
      // find the largest
      maxHeight = Math.max.apply(null, heights);
      // apply to all cards within that deck
      $(this).find(".card-body:not(:only-child)").height(maxHeight);
    });
  } else {
    // reset height
    $(".card-body:not(:only-child)").height('auto');
  }
}

/* carousel */
$(document).on("click", ".carousel-control-prev, .carousel-control-next, .carousel-indicators li", function(event) {
  // prevent carousel from rising to top of page
  event.preventDefault();
  var carouselContainer = $(this).parents(".carousel");
  // count no of slides
  var maxSlides = carouselContainer.find(".carousel-item").length;
  $(this).is(".carousel-indicators li")
    ? newSlide = $(this).data("slide-to") + 1
    : (currentSlide = (carouselContainer.find(".carousel-item.active" ).index()) + 1,
      newSlide = $(this).hasClass("carousel-control-next")
      ? currentSlide + 1
      : currentSlide - 1);
  carouselContainer.removeClass("start finish").find(".carousel-item.active, .carousel-indicators li").removeClass("active");
  carouselContainer.find(".carousel-item:nth-child(" + newSlide + "), .carousel-indicators li:nth-child(" + newSlide + ")").addClass("active");
  // hide prev control on first slide
  if (newSlide === 1) carouselContainer.addClass("start");
  // hide next control on first slide
  if (newSlide === maxSlides) carouselContainer.addClass("finish");
  // override moodleism causing the second carousel indicator to not be active on the first cycle
  carouselContainer.find(".carousel-indicators li:nth-child(2)").css("background-color", newSlide === 2 ? "white" : "rgba(255, 255, 255, 0.5)");
});

/* collapse */
// hide and show collapse card
$(document).on("click", ".collapse-card .collapse-header", function(event) {
  $(this).parents(".collapse-card").toggleClass("collapsed");
});

// toggle transcript button text and transcript card
$(document).on("click", ".transcript-button-group a.view-close-transcript", function(event) {
  $(this).text($(this).text() == 'View transcript' ? 'Hide transcript' : 'View transcript');
  $(this).parents(".transcript-container").toggleClass("collapsed");
});

/* view answer */
// toggle view generic, view answer, model answer, and feedback button text and card
$(document).on("click", "a.view-hide-generic", function(event) {
  $(this).text($(this).text() == 'View' ? 'Hide' : 'View');
  $(this).parents(".view-generic-container").toggleClass("collapsed");
});
$(document).on("click", "a.view-hide-answer", function(event) {
  $(this).text($(this).text() == 'View answer' ? 'Hide answer' : 'View answer');
  $(this).parents(".view-answer-container").toggleClass("collapsed");
});
$(document).on("click", "a.view-hide-description", function(event) {
  $(this).text($(this).text() == 'View description' ? 'Hide description' : 'View description');
  $(this).parents(".view-description-container").toggleClass("collapsed");
});
$(document).on("click", "a.view-hide-feedback", function(event) {
  $(this).text($(this).text() == 'View feedback' ? 'Hide feedback' : 'View feedback');
  $(this).parents(".view-feedback-container").toggleClass("collapsed");
});
$(document).on("click", "a.view-hide-model-answer", function(event) {
  $(this).text($(this).text() == 'View model answer' ? 'Hide model answer' : 'View model answer');
  $(this).parents(".view-model-answer-container").toggleClass("collapsed");
});

/* book activity */
// copy chapterlist to book nav and remove .action-list
booknav = $(".block_fake .content > div > ul").clone().find(".action-list").remove().end();
$(".navbottom.clearfix.navtext a.bookprev").length
  ? booknav.insertAfter(".navbottom.clearfix a.bookprev")
  : booknav.insertBefore(".navbottom.clearfix a.booknext");
//$(".book_toc_indented ul").clone().find(".action-list").remove().end().insertAfter(".navbottom.clearfix.navtext a.bookprev");
$(".navbottom.clearfix ul li").removeClass("clearfix").addClass("chapter");
$(".navbottom.clearfix ul li a, .navbottom.clearfix ul li strong").each(function(i) {
  $(this).text(i+1);
});
// add current class to current page
$(".navbottom.clearfix ul li strong").parents("li").addClass("current");
// add prev and next class to li before and after current for mobile
$(".chapter.current").prev("li").addClass("prev");
$(".chapter.current").next("li").addClass("next");
// show one more page if first or last page on mobile
if ($(".navbottom a.bookprev").length == 0) {
  $("li.chapter:nth-child(3), li.chapter:nth-child(4)").addClass("next");
} else if ($(".navbottom a.booknext").length == 0) {
  $("li.chapter:nth-last-child(3), li.chapter:nth-last-child(4)").addClass("prev");
}
// remove text from previous and next buttons
$(".navbottom.clearfix > a").empty();

// hide toc for single chapter book
$(".block_book_toc .content ul > li:only-child strong:only-child").parents(".block_book_toc").hide();

// add single-chapter-book class to screen and print to hide toc and title
$(".block_book_toc .content ul > li:only-child, #page-mod-book-print .book_toc_numbered ul li:only-child").parents("#page-content").addClass("single-chapter-book");

// remove stupid arrows from prev and next activity links
$(".activity-navigation a#prev-activity-link").text(function(i, text) {
  return text.slice(2);
});
$(".activity-navigation a#next-activity-link").text(function(i, text) {
  return text.slice(0, -2);
});

/* activity labels */
// move .accesshide from within .instancename and append to .activityinstance
// affected the prefix title modification in original location
$("li.activity .instancename .accesshide").each(function() {
    $(this).parents(".activityinstance").prepend(this);
});

// week overview page activity label code
$("li.activity .activityinstance a:not(.quickeditlink)").append('<div class="activity-label-container"><div class="activity-label"><i></i><span class="label-text"></span></div><div class="group-icon"><i></i></div><div class="media-icon"><i></i></div></div>');

// set defaults
$("li.activity").each(function() {
  // activity type no icon
  if ($(this).is('.attendance, .attendanceregister, .choice, .chat, .checklist, .feedback, .hvp, .kalvidassign, .oublog, .questionnaire, .quiz, .scheduler, .survey')) {
    $(this).addClass("type-activity");
  // activity type with group icon
  } else if ($(this).is(".data, .forum, .choicegroup, .ouwiki, .connecthosted, .wiki")) {
    $(this).addClass("type-activity i-group");
  // assessed type no icon
  } else if ($(this).is(".assign, .turnitintooltwo, .workshop")) {
    $(this).addClass("type-assessed");
  } else if ($(this).is(".lti")) {
    $("img").each(function(i, elem){
      // image is only way to differentiate echo360 from other lti activities
      $(this).parents(".lti").addClass($(this).attr("src") == "https://www.kcl.ac.uk/newimages/it/echo-icon-play.png" ? "echo360 type-study i-media" : "type-study");
    });
  } else {
    // if not a label, then study type
    if (!$(this).hasClass("label")) $(this).addClass("type-study");
  }
  // remove label
  $(this).find(".instancename:contains('-stu')").parents("li.activity").removeClass("type-activity type-assessed").addClass("type-study");
  // override activity type
  $(this).find(".instancename:contains('-act')").parents("li.activity").removeClass("type-study type-assessed").addClass("type-activity");
  // add assessed label
  $(this).find(".instancename:contains('-ass')").parents("li.activity").removeClass("type-study type-activity").addClass("type-assessed");
  // add icon
  $(this).find(".instancename:contains('-gro')").parents("li.activity").addClass("i-group");
  $(this).find(".instancename:contains('-med')").parents("li.activity").addClass("i-media");
  $(this).find(".instancename:contains('-ngr')").parents("li.activity").removeClass("i-group");
  $(this).find(".instancename:contains('-nme')").parents("li.activity").removeClass("i-media");
  // strip keywords from activity title
  $(this).find(".instancename:contains('activity-label')").text(function(i, currentText) {
    return currentText.substring(27);
  });
  // add indent class and remove keyword
  $(this).find("span:contains('-indent')").hide().parents("li.activity").addClass("indent");
});
// add assessed text to assessed type label
$("li.activity.type-assessed .activityinstance a .activity-label-container .activity-label .label-text").text("assessed");
// add activity text to activity type label
$("li.activity.type-activity .activityinstance a .activity-label-container .activity-label .label-text").text("activity");
// remove activity type label
$("li.activity.type-study .activityinstance a .activity-label-container .activity-label .label-text").empty();
// add group icon to activity type label
$("li.activity.i-group .activityinstance a .activity-label-container .group-icon i").addClass("fas fa-user-friends");
// add media icon
$("li.activity.i-media .activityinstance a .activity-label-container .media-icon i").addClass("fas fa-play-circle");

/*
strip keywords from elsewhere:
section view activity title, activity page title
print page title, print book info title
breadcrumb
previous/next activity buttons
webinar title
course module navitation block
logs
forum new post confirmation
question bank question page dropdown, question category page and export page
question editing page
*/
$("#region-main h2:first-of-type:contains('activity-label'), #page-mod-book-print #page-content h1:first-of-type:contains('activity-label'), #page-mod-book-print #page-content .book_info td:contains('activity-label'), .breadcrumb li a span:contains('activity-label'), .breadcrumb li a:contains('activity-label'), .activity-navigation .col-md-4 a:contains('activity-label'), .chosted-info .chosted-info-value p:contains('activity-label'), .alert p:contains('activity-label'), .block_course_modulenavigation .activityname:contains('activity-label'), #page-report-log-index td a:contains('actted-info .chosted-info-value p:contains('activity-label'), .alert p:contains('activity-label'), .block_course_modulenavigation .activityname:contains('activity-label'), #page-report-log-index td a:contains('activity-label'), #page-report-outline-index td a:contains('activity-label'), #page-question-edit select option:contains('activitiy-label'), #page-question-category h3:contains('activity-label'), #page-question-category ul li b a:contains('activity-label'), #page-question-category ul li .text_to_html:contains('activity-label'), #page-question-category select option:contains('activity-label'), #page-question-export select option:contains('activity-label'), .path-question-type #fitem_id_categorymoveto select optgroup option:contains('activity-label')").text(function(i, currentText) {
  return currentText.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
})
// completion progress activity title
$(".course-content ul.section li.activity .actions button img.icon, .course-content ul.section li.activity .actions .autocompletion img.icon").attr("title", function(i, currentText) {
  return currentText.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
});
// question bank select optgroup label
$("#page-question-edit select optgroup, #page-question-category select optgroup, #page-question-export select optgroup").attr("label", function(i, currentText) {
  return currentText.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
});
// question ediitng page current category
if ($('#fgroup_id_currentgrp fieldset').length) {
  var currentCategory = $("#fgroup_id_currentgrp fieldset").contents().filter(function(){
    return this.nodeType == 3;
  })[0];
  currentCategory.nodeValue = currentCategory.nodeValue.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
}

if (window.matchMedia('print').matches) {
  $("#page-content h1:first-of-type:contains('activity-label'), #page-mod-book-print #page-content .book_info td:contains('activity-label')").text(function(i, currentText) {
    return currentText.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
  })
}
// and document title
var documentTitle = document.title;
if (documentTitle.includes('activity-label')) {
  documentTitle = documentTitle.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
  $(document).attr('title', documentTitle);
}

// create activity title span to control spacing between activity number and title text
$("li.activity span.instancename").each(function() {
  if ($(this).text().match(/^[1-9]{1}\.[0-9]+\s{1}/g)) $(this).html(function(i, currentText) {
    $(this).addClass('is-numbered');
    return currentText.replace(/ |&nbsp;/, "</span><span class='activity-title'>");
  });
});

// hide activity labels within a specific course section
$(".summary span.section-hide-activity-labels").parents("li.section.main").addClass("section-hide-activity-labels");

/* completion progress */
// completion progress class added to section with tracked activities
$(".section.main:has(.activity .actions .autocompletion, .activity .actions .togglecompletion)").addClass("completion-progress-section");
$(".activity:has(.actions .autocompletion, .actions .togglecompletion)").addClass("completion-progress-activity");
// clone completion progress tooltip to each section with completion progress activities
$(".course-content .completion-progress-section .content .sectionbody > .section, .course-content .single-section .completion-progress-section .content > .section").prepend($("#completionprogressid").clone());
