document.getElementById('tick-button').addEventListener('click', function(event)  {
    // if (validateX() && validateR()) {
        const tickButton = document.getElementById("tick-button")
        const replacement = document.getElementById('replacement');
        tickButton.style.display = 'none';  // Hide button
        replacement.style.display = 'block';

        setTimeout(() => {
            replacement.style.display = 'none';
            tickButton.style.display = 'inline';  // Show button after 5 seconds
        }, 1000);

    //     let x = getX();
    //     let y = getY();
    //     let R = getR();
    //     console.log("checked values", x, y, R);
    //     cleanErrorLabel();
    //     sendRequest(x, y, R);
    // }

    s
})