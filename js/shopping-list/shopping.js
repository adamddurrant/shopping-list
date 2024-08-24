// Fetch items
getItems();

// Shoot items into firebase on form submit
function addItem(event) {
  event.preventDefault();
  let text = document.getElementById('shopping-list-input');
  if (text && text.value) {
    db.collection('shopping-list').add({
      text: text.value,
      filter: 'active',
    });
    text.value = '';
  }
}

// Get database list of shopping items
function getItems() {
  db.collection('shopping-list').onSnapshot((snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    let itemCount = items.length;
    console.log('Total items:', itemCount); // Debugging log
    document.getElementById('total').innerText = itemCount;
    generateItems(items);
  });
}

// Take the data from getItems and add new HTML block
function generateItems(items) {
  console.log('Generating items:', items); // Debugging log
  let itemsHTML = '';
  items.forEach((item) => {
    itemsHTML += `
      <div class="shopping-item">
      <div class="check">
        <div data-id="${item.id}" class="check-mark ${
      item.filter == 'completed' ? 'checked' : ''
    }">
          <img src="/images/shopping-list/icon-check.svg" />
        </div>
      </div>
      <div class="shopping-item-text ${
        item.filter == 'completed' ? 'checked' : ''
      }">
        ${item.text}
      </div>
      <div data-id=${item.id} class="delete-item">
                <img src="/images/shopping-list/icon-cross.svg" alt="del-icon"></img>
                </div>
    </div>`;
  });

  document.querySelector('#shopping-list').innerHTML = itemsHTML;
  createEventListeners();
}

// Creates event listeners for each checkmark, delete button, and clear button
function createEventListeners() {
  let shoppingCheckMarks = document.querySelectorAll(
    '#shopping-list .check .check-mark'
  );
  let clear = document.querySelector('.shopping-list-wrapper .clear-complete');

  shoppingCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener('click', function () {
      markCompleted(checkMark.dataset.id);
    });

    clear.addEventListener('click', function () {
      clearCompleted(checkMark.dataset.id);
    });
  });

  let delItem = document.querySelectorAll('#shopping-list .delete-item');
  delItem.forEach((del) => {
    del.addEventListener('click', function () {
      deleteItem(del.dataset.id);
    });
  });
}

function deleteItem(id) {
  let del = db.collection('shopping-list').doc(id);
  del.delete();
}

// Mark items as completed in database
function markCompleted(id) {
  let item = db.collection('shopping-list').doc(id);
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

// Clear the completed items from firebase
function clearCompleted(id) {
  let tb = db.collection('shopping-list').doc(id);
  tb.get().then(function (doc) {
    if (doc.exists) {
      let deleteFilter = doc.data().filter;
      if (deleteFilter === 'completed') {
        tb.delete();
      }
    }
  });
}
