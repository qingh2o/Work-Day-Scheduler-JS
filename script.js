// Display current day
var currentDay = dayjs().format('dddd, MMMM D');
$('#currentDay').text(currentDay);
console.log('currentDay: '+ currentDay);

//Color-code each timeblock based on past, present, and future 
function colorCodeHours() {
    var currentTime = dayjs().hour();

    $(".time-block").each(function () {
        var idValue = $(this).attr("id");

        var idHourValue = parseInt(idValue.split("-")[1]);
        console.log(idHourValue);

        if (idHourValue < currentTime) {
            $(this).addClass('past');
        } else if (idHourValue === currentTime) {
            $(this).removeClass('past');
            $(this).addClass('present');
        } else {
            $(this).removeClass('past');
            $(this).removeClass('present');
            $(this).addClass('future');
        }
    });
    console.log('currentTime: '+ currentTime);
};
colorCodeHours();

