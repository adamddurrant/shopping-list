function snack() {
    var snackBar = document.getElementById("snackbar");
    snackBar.className = "show";
    setTimeout(function(){ snackBar.className = snackBar.className.replace("show", ""); }, 3000);
}