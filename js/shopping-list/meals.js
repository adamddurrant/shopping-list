
// Function to submit data to Firebase
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