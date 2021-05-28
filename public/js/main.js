(function ($) {
  "use strict";

  //     jQuery('#mobile-menu').meanmenu({
  //     meanMenuContainer: '.mobile-menu',
  //     meanScreenWidth: "991",
  //   });

  /* ==========================================================================
  // header stickey activation
========================================================================== */
  // $(window).on("scroll", function () {
  //   var scroll = $(window).scrollTop();
  //   if (scroll < 100) {
  //     $(".header-sticky").removeClass("sticky");
  //   } else {
  //     $(".header-sticky").addClass("sticky");
  //   }
  // });

  /* ==========================================================================
   //nav
  ========================================================================== */

  var topMenu = jQuery(
      ".header-section #mobile-menu ,.mobile-menustyle1.mean-container .mean-nav"
    ),
    offset = 150,
    topMenuHeight = topMenu.outerHeight() + offset,
    // All list items
    menuItems = topMenu.find('a[href*="#"]'),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
      var href = jQuery(this).attr("href"),
        id = href.substring(href.indexOf("#")),
        item = jQuery(id);
      //console.log(item)
      if (item.length) {
        return item;
      }
    });

  // Bind to scroll
  // jQuery(window).scroll(function () {
  //   // Get container scroll position
  //   var fromTop = jQuery(this).scrollTop() + topMenuHeight;

  //   // Get id of current scroll item
  //   var cur = scrollItems.map(function () {
  //     if (jQuery(this).offset().top < fromTop) return this;
  //   });

  //   // Get the id of the current element
  //   cur = cur[cur.length - 1];
  //   var id = cur && cur.length ? cur[0].id : "";

  //   menuItems.parent().removeClass("active");
  //   if (id) {
  //     menuItems
  //       .parent()
  //       .end()
  //       .filter("[href*='#" + id + "']")
  //       .parent()
  //       .addClass("active");
  //   }
  // });
  //nice select
  $("#number,#country").niceSelect();
})(jQuery);

const navbar = document.querySelector(".navbar-nav");
a = navbar.querySelectorAll("a");

a.forEach(function (element) {
  element.addEventListener("click", function () {
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove("active");
    }

    this.classList.add("active");
    document.querySelector(".navbar-nav").classList.toggle("show");
    $(".navbar-collapse").collapse("hide");
  });
});
