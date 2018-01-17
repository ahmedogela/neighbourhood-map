// error message when google map had something wrong
function errorMessage(data) {
    if(data === 'jQuery' || data === 'Knockout') {
        alert('Something went wrong while loading ' + data + " !!!" );
    }
    document.getElementById('map').innerHTML = "<h1>Something Went Wrong with " + data + " !!!</h1>";
}