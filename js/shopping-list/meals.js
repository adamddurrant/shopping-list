
// Fetch items
getMeals();

// Submit data to Firebase
function submitData(day) {

  const dateWrapper = document.getElementById('date-wrap');
  dateWrapper.classList.remove('active');

  const inputData = document.getElementById('meals-input').value;

  // Add data to the Firestore collection based on the selected day
  db.collection('meals-list').add({
    text: inputData,
    filter: 'active',
    day: day
  })
    .then(() => {
      document.getElementById('meals-input').value = '';
      document.getElementById("meals-input").focus();
      snack();
    })
    .catch((error) => {
      console.error('Error submitting data: ', error);
    });
}

// get database list of shopping items
function getMeals() {
  db.collection('meals-list').onSnapshot((snapshot) => {
    let mealItems = [];
    snapshot.docs.forEach((doc) => {
      mealItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // total number of items count
    let itemCount = mealItems.length;

    // Add count of total items to total counter
    document.getElementById('meals-total').innerHTML = itemCount;

    generateMeals(mealItems);

  });
}

// take the data from getItems and add new HTML block
function generateMeals(meals) {

  let mondayHTML = '';
  let tuesdayHTML = '';
  let wednesdayHTML = '';
  let thursdayHTML = '';
  let fridayHTML = '';
  let saturdayHTML = '';
  let sundayHTML = '';

  meals.forEach((meal) => {
    const mealHTML = `
      <div class="meals-item">
        <div class="check">
          <div data-id="${meal.id}" class="check-mark ${meal.filter == 'completed' ? 'checked' : ''}">
            <img src="/images/shopping-list/icon-check.svg" />
          </div>
        </div>
        <div class="meal-item-text ${meal.filter == 'completed' ? 'checked' : ''}">
          ${meal.text}
        </div>
        <div data-id=${meal.id} class="delete-meal">
          <img src="/images/shopping-list/icon-cross.svg" alt="del-icon"></img>
        </div>
      </div>`;

    if (meal.day === 'Monday') {
      mondayHTML += mealHTML;
    } else if (meal.day === 'Tuesday') {
      tuesdayHTML += mealHTML;
    } else if (meal.day === 'Wednesday') {
      wednesdayHTML += mealHTML;
    } else if (meal.day === 'Thursday') {
      thursdayHTML += mealHTML;
    } else if (meal.day === 'Friday') {
      fridayHTML += mealHTML;
    } else if (meal.day === 'Saturday') {
      saturdayHTML += mealHTML;
    } else if (meal.day === 'Sunday') {
      sundayHTML += mealHTML;
    }

  });

  const emptyHTML = `
  <div class="meals-item">
    <div class="shopping-item-text empty-meal">
      No meals :(
    </div>
  </div>`;

  document.querySelector('#monday-panel').innerHTML = mondayHTML || emptyHTML;
  document.querySelector('#tuesday-panel').innerHTML = tuesdayHTML || emptyHTML;
  document.querySelector('#wednesday-panel').innerHTML = wednesdayHTML || emptyHTML;
  document.querySelector('#thursday-panel').innerHTML = thursdayHTML || emptyHTML;
  document.querySelector('#friday-panel').innerHTML = fridayHTML || emptyHTML;
  document.querySelector('#saturday-panel').innerHTML = saturdayHTML || emptyHTML;
  document.querySelector('#sunday-panel').innerHTML = sundayHTML || emptyHTML;

  // call event listener function
  createMealEventListeners();

  const mealsText = document.querySelectorAll('.meals-item .meal-item-text');
  mealsText.forEach((mealText) => {
    const mealBaseText = mealText.innerText.toLowerCase();
    if (mealBaseText.includes('breakfast:')) {
      mealText.parentNode.classList.add("one");
    } else if (mealBaseText.includes('lunch:')) {
      mealText.parentNode.classList.add("two");
    } else if (mealBaseText.includes('dinner:')) {
      mealText.parentNode.classList.add("three");
    }
  });

}

//creates event listeners for each checkmark, delete button and clear button
function createMealEventListeners() {

  let mealsCheckMarks = document.querySelectorAll(
    '.meals-list .check .check-mark'
  );

  let mealClear = document.querySelector('.meals-complete');

  mealsCheckMarks.forEach((mealCheckMark) => {
    mealCheckMark.addEventListener('click', function () {
      markMealCompleted(mealCheckMark.dataset.id);
    });

    //create function for clear button & run clearCompleted
    mealClear.addEventListener('click', function () {
      clearMealCompleted(mealCheckMark.dataset.id);
    });

  });

  let delMealItem = document.querySelectorAll('.meals-item .delete-meal');
  delMealItem.forEach((delMeal) => {
    delMeal.addEventListener('click', function () {
      deleteMeal(delMeal.dataset.id);
    });
  });

}

function deleteMeal(id) {
  let del = db.collection('meals-list').doc(id);
  del.delete();
}

// Mark items as completed in database
function markMealCompleted(id) {
  let mealItem = db.collection('meals-list').doc(id);
  mealItem.get().then(function (doc) {
    if (doc.exists) {
      let filter = doc.data().filter;
      if (filter == 'active') {
        mealItem.update({
          filter: 'completed',
        });
      } else if (filter == 'completed') {
        mealItem.update({
          filter: 'active',
        });
      }
    }
  });
}

// clear the completed items from firebase
function clearMealCompleted(id) {
  let tb = db.collection('meals-list').doc(id);

  tb.get().then(function (doc) {
    if (doc.exists) {
      let deleteFilter = doc.data().filter;
      if (deleteFilter === 'completed') {
        tb.delete();
      }
    }
  });
}