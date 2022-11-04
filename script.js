//shoot items into firebase on form submit
function addItem(event) {
  event.preventDefault();
  let text = document.getElementById('list-input');
  db.collection('shopping-list').add({
    text: text.value,
    filter: 'active',
  });
}

// get database list of shopping items
function getItems() {
  db.collection('shopping-list').onSnapshot((snapshot) => {
    console.log(snapshot);
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // total number of items count
    let itemCount = items.length;
    // change count of total items
    document.getElementById('total').innerHTML = itemCount;
    generateItems(items);
  });
}

// take the data from getItems and add new HTML block
function generateItems(items) {
  let itemsHTML = '';
  items.forEach((item) => {
    itemsHTML += `
      <div class="shopping-item">
      <div class="check">
        <div data-id="${item.id}" class="check-mark ${
      item.filter == 'completed' ? 'checked' : ''
    }">
          <img src="./images/icon-check.svg" />
        </div>
      </div>
      <div class="shopping-item-text ${
        item.filter == 'completed' ? 'checked' : ''
      }">
        ${item.text}
      </div>
    </div>`;
  });
  // add in the new HTML block
  document.querySelector('.shopping-list').innerHTML = itemsHTML;
  //call event listener function
  createEventListeners();
}

//creates event listeners for each checkmark and runs markCompleted on click
function createEventListeners() {
  let shoppingCheckMarks = document.querySelectorAll(
    '.shopping-list .check .check-mark'
  );
  shoppingCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener('click', function () {
      markCompleted(checkMark.dataset.id);
    });
  });
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

getItems();
