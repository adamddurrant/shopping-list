// Reorder buttons and accordions based on current date
document.addEventListener("DOMContentLoaded", function () {

  const today = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)
  const dateSelect = document.getElementById('dateSelect');
  const mealsList = document.querySelector('.meals-list');

  for (let i = 0; i < today - 1; i++) {
    dateSelect.appendChild(dateSelect.firstElementChild);
  }

  for (let i = 0; i < today - 1; i++) {
    mealsList.appendChild(mealsList.children[0]);
    mealsList.appendChild(mealsList.children[0]);
  }

});

// Hide and show the day buttons after input
function handleInput(inputValue) {
  
  document.getElementById("meals-input").focus();

  const dateWrapper = document.getElementById('date-wrap');
  const reset = document.getElementById('reset-meals');

  if (inputValue.trim() === "") {
    dateWrapper.classList.remove('active');
  } else {
    dateWrapper.classList.add('active');
  }

  reset.addEventListener("click", function () {
    dateWrapper.classList.remove('active');
  });

}
