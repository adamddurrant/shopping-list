function hide(page) {
  if (page === 'shopping') {
    document.getElementById('shopping').style.display = 'block';
    document.getElementById('shopping').style.opacity = '1';

    document.getElementById('to-do').style.display = 'none';
    document.getElementById('to-do').style.opacity = '0';

    document.getElementById('meals').style.display = 'none';
    document.getElementById('meals').style.opacity = '0';

  } else if (page === 'meals') {
    
    document.getElementById('shopping').style.display = 'none';
    document.getElementById('shopping').style.opacity = '0';

    document.getElementById('to-do').style.display = 'none';
    document.getElementById('to-do').style.opacity = '0';

    document.getElementById('meals').style.display = 'block';
    document.getElementById('meals').style.opacity = '1';

  } else if (page === 'todo') {

    document.getElementById('shopping').style.display = 'none';
    document.getElementById('shopping').style.opacity = '0';

    document.getElementById('meals').style.display = 'none';
    document.getElementById('meals').style.opacity = '0';

    document.getElementById('to-do').style.display = 'block';
    document.getElementById('to-do').style.opacity = '1';

  }

}