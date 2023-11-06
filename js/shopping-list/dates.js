// const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const today = new Date();
// const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.

// const todayName = daysOfWeek[dayOfWeek];
// console.log(`Today is: ${todayName}`);

function handleInput(inputValue) {
  // Perform your action with the input value
  const dateWrapper = document.getElementById('date-wrap');
  const reset = document.getElementById('reset-meals');

  if (inputValue.trim() === "") {
    dateWrapper.classList.remove('active');
  } else {
    dateWrapper.classList.add('active');
  }

  reset.addEventListener("click", function(){
    dateWrapper.classList.remove('active');
  });

}
