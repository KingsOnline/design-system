// hide administration block from students or teachers without editing rights
$("#block-region-side-pre .block:has(.header .title h2:contains('Administration')):not(:has(.content #settingsnav ul li ul li a:contains('Edit settings'))), #block-region-side-post .block:has(.header .title h2:contains('Administration')):not(:has(.content #settingsnav ul li ul li a:contains('Edit settings')))").addClass("hide");
// if there are no visible blocks in aside hide it and make main region full width
$("#block-region-side-pre:not(:has(.block:not(.hide)))").addClass("hide").siblings("#region-main").removeClass("span8 pull-right");

// pull print button from admin block and position at top of book
printButton = $('.block_settings .tree_item.hasicon.tree_item.leaf:contains("Print book") a').clone().find('img').remove().end();
$('<div id="print-btn-container">').insertAfter('#page-mod-book-view #maincontent');
printButton.addClass('btn btn-secondary print-book-btn').text("Print").appendTo('#print-btn-container');

// toggle side bar menus
const blockHide = "#block-region-side-pre .block .title h2, #block-region-side-post .block .title h2";
$(document).on("click", blockHide, function(event) {
  $(this).parents(".block").toggleClass('hidden');
});

// hide carousel controls on first and last slide
$(document).on("click", ".carousel-control-prev, .carousel-control-next", function(event) {
  var crsl = $(this).parent(".carousel");
  var start = crsl.find(".carousel-item:nth-child(2)")
  var finish = crsl.find(".carousel-item:nth-last-child(2)")
  crsl.removeClass("start").removeClass("finish");
  if ($(this).hasClass("carousel-control-next") && finish.hasClass("active")) {
   crsl.addClass("finish");
  } else if ($(this).hasClass("carousel-control-prev") && start.hasClass("active")) {
   crsl.addClass("start");
  }
  // override moodleism causing the second carousel indicator to not be active on the first cycle
  var first = crsl.find(".carousel-item:first-child")
  var third = crsl.find(".carousel-item:nth-child(3)")
  var indicator = crsl.find(".carousel-indicators li:nth-child(2)")
  if (($(this).hasClass("carousel-control-next") && first.hasClass("active")) || ($(this).hasClass("carousel-control-prev") && third.hasClass("active"))) {
   indicator.css("background-color","white");
  } else {
   indicator.css("background-color","rgba(255, 255, 255, 0.5)");
  }
 });

// hide and show collapse card
$(document).on("click", ".collapse-card .collapse-header", function(event) {
  $(this).parents(".collapse-card").toggleClass("collapsed");
});

// toggle transcript button text and transcript card
$(document).on("click", ".transcript-button-group a.view-close-transcript", function(event) {
  $(this).text($(this).text() == 'View transcript' ? 'Hide transcript' : 'View transcript');
  $(this).parents(".transcript-container").toggleClass("collapsed");
});

// toggle view answer, model answer, and feedback button text and card
$(document).on("click", "a.view-hide-answer", function(event) {
  $(this).text($(this).text() == 'View answer' ? 'Hide answer' : 'View answer');
  $(this).parents(".view-answer-container").toggleClass("collapsed");
});
$(document).on("click", "a.view-hide-model-answer", function(event) {
  $(this).text($(this).text() == 'View model answer' ? 'Hide model answer' : 'View model answer');
  $(this).parents(".view-model-answer-container").toggleClass("collapsed");
});
$(document).on("click", "a.view-hide-feedback", function(event) {
  $(this).text($(this).text() == 'View feedback' ? 'Hide feedback' : 'View feedback');
  $(this).parents(".view-feedback-container").toggleClass("collapsed");
});

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
$(".navbottom.clearfix ul li :not(a)").parents("li").addClass("current");
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

// remove stupid arrows from prev and next activity links
$(".row-fluid.rtl-compatible a#prev-activity-link").text(function(i, text) {
  return text.slice(2);
});
$(".row-fluid.rtl-compatible a#next-activity-link").text(function(i, text) {
  return text.slice(0, -2);
});

// move .accesshide from within .instancename and append to .activityinstance
// affected the prefix title modification in original location
$("li.activity .instancename .accesshide").each(function() {
    $(this).parents(".activityinstance").prepend(this);
});

// set defaults
// study type no icon
// 'file' activity type has 'resource' class
$("li.activity.book, li.activity.folder, li.activity.page, li.activity.resource, li.activity.glossary, li.activity.lesson, li.activity.lti, li.activity.url").addClass("type-study");
// study type with icon
$("li.activity.kalvidres").addClass("type-study i-media");
// activity type no icon
$("li.activity.assign, li.activity.choice, li.activity.feedback, li.activity.hvp, li.activity.kalvidassign, li.activity.oublog, li.activity.questionnaire, li.activity.quiz, li.activity.turnitintooltwo, li.activity.workshop").addClass("type-activity");
// activity type with icon
$("li.activity.data, li.activity.forum, li.activity.connecthosted, li.activity.wiki").addClass("type-activity i-group");

// add assessed label
$("li.activity .instancename:contains('-ass')").parents("li.activity").removeClass("type-study type-activity").addClass("type-assessed");
// override activity type
$("li.activity .instancename:contains('-act')").parents("li.activity").removeClass("type-study type-assessed").addClass("type-activity");
// remove activity label
$("li.activity .instancename:contains('-stu')").parents("li.activity").removeClass("type-activity type-assessed").addClass("type-study");
// add or remove icon
$("li.activity .instancename:contains('-gro')").parents("li.activity").addClass("i-group");
$("li.activity .instancename:contains('-ngr')").parents("li.activity").removeClass("i-group");
$("li.activity .instancename:contains('-med')").parents("li.activity").addClass("i-media");
$("li.activity .instancename:contains('-nme')").parents("li.activity").removeClass("i-media");

/*
strip keywords from activity title
section view activity title, activity page title
print page title, print book info title
breadcrumb
previous/next activity buttons
webinar title
course module navitation block
logs
forum new post confirmation
*/
$("li.activity .instancename:contains('activity-label'), #region-main h2:first-of-type:contains('activity-label'), #page-mod-book-print #page-content h1:first-of-type:contains('activity-label'), #page-mod-book-print #page-content .book_info td:contains('activity-label'), .breadcrumb li a span:contains('activity-label'), .breadcrumb li a:contains('activity-label'), .row-fluid.rtl-compatible .span4 a:contains('activity-label'), .chosted-info .chosted-info-value p:contains('activity-label'), .alert p:contains('activity-label'), .block_course_modulenavigation .activityname:contains('activity-label'), #page-report-log-index td a:contains('actted-info .chosted-info-value p:contains('activity-label'), .alert p:contains('activity-label'), .block_course_modulenavigation .activityname:contains('activity-label'), #page-report-log-index td a:contains('activity-label'), #page-report-outline-index td a:contains('activity-label')").text(function(i, currentText) {
  return currentText.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
})
// completion progress activity title
$(".course-content ul.section li.activity .actions button img.icon, .course-content ul.section li.activity .actions .autocompletion img.icon").attr("title", function(i, currentText) {
  return currentText.replace(/activity-label-[a-z]{3}-[a-z]{3}-[a-z]{3} /g, '');
});

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
  if ($(this).text().match(/[1-9]{1}.[0-9]+\s{1}/g)) $(this).html(function(i, currentText) {
    return currentText.replace(/ |&nbsp;/, "</span><span class='activity-title'>");
  });
});

// week overview page activity label code
$("li.activity .activityinstance a:not(.quickeditlink) .instancename").prepend('<div class="activity-label-container"><div class="activity-label"><i></i><span class="label-text"></span></div><div class="group-icon"><i></i></div><div class="media-icon"><i></i></div></div>');

// add indent class and remove keyword span
$("li.activity.label span:contains('-indent')").hide().parents("li.activity").addClass("indent");

// add assessed text to assessed type label
$("li.activity.type-assessed .activityinstance a .activity-label-container .activity-label .label-text").text("assessed");
// add activity text to activity type label
$("li.activity.type-activity .activityinstance a .activity-label-container .activity-label .label-text").text("activity");
// add group icon to activity type label
$("li.activity.i-group .activityinstance a .activity-label-container .group-icon i").addClass("fas fa-user-friends");
// add media icon
$("li.activity.i-media .activityinstance a .activity-label-container .media-icon i").addClass("fas fa-play-circle");

// completion progress class added to section with tracked activities
$(".section.main:has(.activity .actions .autocompletion, .activity .actions .togglecompletion)").addClass("completion-progress-section");
$(".activity:has(.actions .autocompletion, .actions .togglecompletion)").addClass("completion-progress-activity");
// clone completion progress tooltip to each section with completion progress activities
$(".course-content .completion-progress-section .content .sectionbody > .section, .course-content .single-section .completion-progress-section .content > .section").prepend($("#completionprogressid").clone());
