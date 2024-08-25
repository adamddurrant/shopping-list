// Fetch todo items
document.addEventListener("DOMContentLoaded", (event) => {
  getTodoItems();
});

// Shoot items into firebase on form submit
function addTodoItem(event) {
  event.preventDefault();

  let text = document.getElementById('todo-list-input');
  let confettiAnimation = document.getElementById('confetti-todo');

  db.collection('todo-list').add({
    text: text.value,
    filter: 'active',
  });

  // Reset the animation to the first frame and then play it
  confettiAnimation.stop();
  confettiAnimation.seek(0);
  confettiAnimation.play();

  text.value = '';
}

// Get database list of todo items
function getTodoItems() {
  db.collection('todo-list').onSnapshot((snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // total number of items count
    let itemCount = items.length;
    // Add count of total items to total counter
    document.getElementById('todo-total').innerHTML = itemCount;
    generateTodoItems(items);
  });
}

// Take the data from getTodoItems and add new HTML block
function generateTodoItems(items) {
  let itemsHTML = '';

  if (items.length > 0) {
    items.forEach((item) => {
      itemsHTML += `
        <div class="todo-item">
          <div class="check">
            <div data-id="${item.id}" class="check-mark ${item.filter == 'completed' ? 'checked' : ''}">
              <img src="/images/shopping-list/icon-check.svg" />
            </div>
          </div>
          <div class="todo-item-text ${item.filter == 'completed' ? 'checked' : ''}">
            ${item.text}
          </div>
          <div data-id=${item.id} class="delete-item">
            <img src="/images/shopping-list/icon-cross.svg" alt="del-icon"></img>
          </div>
        </div>`;
    });
  } else {
    // No items, show the empty template
    itemsHTML = `
      <div class="meals-item">
        <div class="shopping-item-text empty-meal">
          No Items :(
        </div>
      </div>`;
  }

  // Add the HTML block to the DOM
  document.querySelector('#todo-list').innerHTML = itemsHTML;

  // Call event listener function if there are items
  if (items.length > 0) {
    createTodoEventListeners();
  }
}

// Creates event listeners for each checkmark, delete button, and clear button in todo
function createTodoEventListeners() {
  let todoCheckMarks = document.querySelectorAll('#todo-list .check .check-mark');
  let clear = document.querySelector('.todo-list-wrapper .clear-complete');

  todoCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener('click', function () {
      markTodoCompleted(checkMark.dataset.id);
    });

    // Create function for clear button & run clearCompleted
    clear.addEventListener('click', function () {
      clearTodoCompleted(checkMark.dataset.id);
    });
  });

  let delItem = document.querySelectorAll('#todo-list .delete-item');
  delItem.forEach((del) => {
    del.addEventListener('click', function () {
      deleteTodoItem(del.dataset.id);
    });
  });
}

// Delete a todo item from the database
function deleteTodoItem(id) {
  let del = db.collection('todo-list').doc(id);
  del.delete();
}

// Mark todo items as completed in the database
function markTodoCompleted(id) {
  let item = db.collection('todo-list').doc(id);
  item.get().then(function (doc) {
    if (doc.exists) {
      let filter = doc.data().filter;
      if (filter == 'active') {
        item.update({
          filter: 'completed',
        });
      } else if (filter == 'completed') {
        item.update({
          filter: 'active',
        });
      }
    }
  });
}

// Clear the completed todo items from Firebase
function clearTodoCompleted(id) {
  let tb = db.collection('todo-list').doc(id);

  tb.get().then(function (doc) {
    if (doc.exists) {
      let deleteFilter = doc.data().filter;
      if (deleteFilter === 'completed') {
        tb.delete();
      }
    }
  });
}
