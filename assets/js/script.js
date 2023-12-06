let slider_mom = document.querySelector(".slider-mom");
let slider_children = document.querySelector(".slider-children");

let slider_mom_computed_style = window.getComputedStyle(slider_mom);
let slider_children_computed_style = window.getComputedStyle(slider_children);

let slider_mom_gap_value = parseInt(slider_mom_computed_style.gap, 10);
let slider_mom_padding_right_value = parseInt(
  slider_mom_computed_style.paddingRight,
  10
);
let slider_mom_padding_left_value = parseInt(
  slider_mom_computed_style.paddingLeft,
  10
);
let slider_children_width_value = parseInt(
  slider_children_computed_style.width,
  10
);

let preview_button = document.querySelector(".preview");

let next_button = document.querySelector(".next");

// desativando o scroll com o mouse
slider_mom.addEventListener("mouseover", () => {});

// slider_mom.addEventListener("mouseout", () => {
//   slider_mom.style.overflow = "auto";
// });

let max_scroll_left = slider_mom.scrollWidth - slider_mom.clientWidth;
console.log("max_scroll_left", max_scroll_left);

let slider_positions = [];
let position = 0;

while (position < max_scroll_left) {
  slider_positions.push(position);
  position += slider_children_width_value + slider_mom_gap_value;
}

console.log(slider_positions);

window.addEventListener("resize", () => {
  max_scroll_left = slider_mom.scrollWidth - slider_mom.clientWidth;

  // slider_positions = [];
  // position = 0;

  // while (position < max_scroll_left) {
  //   slider_positions.push(position);
  //   position += slider_children_width_value + slider_mom_gap_value;
  // }
});

preview_button.onclick = () => {
  if (slider_mom.scrollLeft == max_scroll_left) {
    slider_mom.scrollLeft -= max_scroll_left - slider_positions.slice(-1);
  } else {
    slider_mom.scrollLeft -= slider_children_width_value + slider_mom_gap_value;
  }
};

next_button.onclick = () => {
  if (slider_mom.scrollLeft == 0) {
    slider_mom.scrollLeft +=
      slider_children_width_value + slider_mom_padding_left_value;
  } else {
    slider_mom.scrollLeft += slider_children_width_value + slider_mom_gap_value;
  }
};

slider_mom.onscroll = () => {
  if (slider_mom.scrollLeft <= 0) {
    preview_button.disabled = true;
  } else {
    preview_button.disabled = false;
  }

  if (slider_mom.scrollLeft >= max_scroll_left) {
    next_button.disabled = true;
  } else {
    next_button.disabled = false;
  }
};

slider_mom.addEventListener("scrollend", () => {
  let closest = slider_positions.reduce(function (prev, curr) {
    return Math.abs(curr - slider_mom.scrollLeft) <
      Math.abs(prev - slider_mom.scrollLeft)
      ? curr
      : prev;
  });

  if (slider_mom.scrollLeft == max_scroll_left) {
    return;
  }

  if (!slider_positions.includes(slider_mom.scrollLeft)) {
    slider_mom.scrollLeft = closest;
  }
});
