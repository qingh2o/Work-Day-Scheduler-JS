// Display current day
var currentDay = dayjs().format('dddd, MMMM D');
$('#currentDay').text(currentDay);
console.log('currentDay: ' + currentDay);

var timeblock = $(".time-block");
var userInput = $(".description");


//Color-code each timeblock based on past, present, and future 
function colorCodeHours() {
    var currentTime = dayjs().hour();

    timeblock.each(function () {
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
var hourlySchedule = "";

//Save each input schedule individually in localStorage. 
$(".saveBtn").click(function (event) {
    event.preventDefault();
    hourlySchedule = $(this).siblings().next().val();
    var timeKey = $(this).siblings().text();

    //Check the input is vaild before save to localStorage.
    if (!hourlySchedule) {
        return;
    } else {
        localStorage.setItem(timeKey, hourlySchedule);
    };   
});




