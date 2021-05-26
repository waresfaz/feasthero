$(".grid").isotope({
  itemSelector: ".grid-item",
  percentPosition: true,
  masonry: {
    // use outer width of grid-sizer for columnWidth
    columnWidth: ".grid-item",
  },
});
