var hiddenClassName = "rapids-selector--hidden";
var selectorContainers = document.querySelectorAll(
  ".rapids-selector__container"
);

/**
 * Closes all open menus. If a click handler event argument is given,
 * that event target's associated menu will not be closed.
 * @param {*} e - click event
 */
function closeOpenedMenusExcept(e) {
  e = e || false;
  for (var i = 0; i < selectorContainers.length; i++) {
    var selectorContainer = selectorContainers[i];
    if (e && e.target.parentNode === selectorContainer) continue;
    selectorContainer.classList.add(hiddenClassName);
  }
}

/**
 * Toggles the menu associated with clicked selector
 * @param {*} container - selector container element
 */
function toggleMenu(e) {
  var container = e.target.parentNode;
  container.classList.toggle(hiddenClassName);
}

/**
 * Returns true if the click event is outside of any of the
 * selector containers.
 * @param {*} e - click event
 */
function clickIsOutsideOfSelectContainers(e) {
  var targetEl = e.target;

  do {
    for (var i = 0; i < selectorContainers.length; i++) {
      var selector = selectorContainers[i];
      if (targetEl === selector) return false;
    }
    targetEl = targetEl.parentNode;
  } while (targetEl);

  return true;
}

/**
 * Returns true if any of the given elements are clicked
 * @param {*} e - click event
 * @param {*} elements - array of elements from document.querySelectorAll
 */
function anyElementIsClicked(e, elements) {
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element === e.target) return true;
  }
  return false;
}

/**
 * Returns true if a selector is clicked
 * @param {*} e - click event
 */
function selectorIsClicked(e) {
  return anyElementIsClicked(
    e,
    document.querySelectorAll(".rapids-selector__selected")
  );
}

/**
 * Returns true if the already selected option is clicked
 * @param {*} e - click event
 */
function selectedOptionIsClicked(e) {
  return anyElementIsClicked(
    e,
    document.querySelectorAll(".rapids-selector__menu-item--selected")
  );
}

// Calculate height for dropdown animations
for (var i = 0; i < selectorContainers.length; i++) {
  var selector = selectorContainers[i];
  var menu = selector.querySelector(".rapids-selector__menu");
  menu.style.height = menu.scrollHeight + "px";
}

// Selectors click handler
document.addEventListener("click", function(e) {
  // Open/close menus on selector click
  if (selectorIsClicked(e)) {
    closeOpenedMenusExcept(e);
    toggleMenu(e);
  }

  // Close menus on outside click
  if (clickIsOutsideOfSelectContainers(e)) {
    closeOpenedMenusExcept();
  }

  // Prevent navigation and close menu when selected option is clicked
  if (selectedOptionIsClicked(e)) {
    e.preventDefault();
    closeOpenedMenusExcept();
  }
});
