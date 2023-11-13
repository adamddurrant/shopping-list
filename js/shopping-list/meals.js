document.addEventListener('DOMContentLoaded', function () {

  // Fetch items
  getMeals();

  // Submit data to Firebase
  function submitData(day) {
    console.log('submit run');
    const inputData = document.getElementById('meals-input').value;

    // Add data to the Firestore collection based on the selected day
    db.collection('meals-list').add({
      text: inputData,
      filter: 'active',
      day: day
    })
      .then(() => {
        document.getElementById('meals-input').value = '';
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
    console.log(meals);

    let mondayHTML = '';
    let tuesdayHTML = '';

    meals.forEach((meal) => {
      const mealHTML = `
      <div class="shopping-item">
        <div class="check">
          <div data-id="${meal.id}" class="check-mark ${meal.filter == 'completed' ? 'checked' : ''}">
            <img src="/images/shopping-list/icon-check.svg" />
          </div>
        </div>
        <div class="shopping-item-text ${meal.filter == 'completed' ? 'checked' : ''}">
          ${meal.text}
        </div>
        <div data-id=${meal.id} class="delete-item">
          <img src="/images/shopping-list/icon-cross.svg" alt="del-icon"></img>
        </div>
      </div>`;

      if (meal.day === 'Monday') {
        console.log('monday');
        mondayHTML += mealHTML;
      } else if (meal.day === 'Tuesday') {
        console.log('tuesday');
        tuesdayHTML += mealHTML;
      }
    });

    document.querySelector('#monday-panel').innerHTML = mondayHTML;
    document.querySelector('#tuesday-panel').innerHTML = tuesdayHTML;

    //call event listener function
    // createEventListeners();
  }


});