// Display current day
var currentDay = dayjs().format('dddd, MMMM YY');
$('#currentDay').text(currentDay);

//Color-code each timeblock based on past, present, and future 
function colorCodeHours() {
    var currentTime = dayjs().hour();

    $(".hour ").each(function () {
        var idValue = $(this).attr("id");

        var idHourValue = parseInt(idValue.split("-")[1]);
        console.log(idHourValue);

        if (idHourValue < currentTime) {
            $('.description').addClass('past text-dark');
        } else if (idHourValue === currentTime) {
            $('.description').addClass('present text-dark');
        } else {
            $('.description').addClass('future text-dark');
        }
    });
    console.log(currentTime);
};
colorCodeHours();

