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
$(document).on("click", ".collapse-card .collapse-header button", function(event) {
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

// home page add forum class to activtiy title containing 'discussion'
$("li.activity .instancename:contains('Discussion')").parents("li.activity").addClass("forum");

// hide activity labels on certain pages
$(".hero.hide-activity-labels").parents("#region-main").addClass("hide-activity-labels");

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
