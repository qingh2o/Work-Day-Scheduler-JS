// Display current day
var currentDay = dayjs().format('dddd, MMMM D');
$('#currentDay').text(currentDay);
console.log('currentDay: ' + currentDay);

var timeblock = $(".time-block");

//Color-code each timeblock based on past, present, and future 
function colorCodeHours() {
    var currentTime = dayjs().hour();

    timeblock.each(function () {
        var idValue = $(this).attr("id");
        var idHourValue = parseInt(idValue.split("-")[1]);
      
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


//Save each input schedule individually in localStorage. 
$(".saveBtn").click(function (event) {
    event.preventDefault();

    //User input hourly Schedule
    var hourlyScheduleInput = $(this).parent().find('.description').val();
    var timeKeyOfInput = $(this).parent().find('.hour').text();

    //Check the input is vaild before save to localStorage.
    if (!hourlyScheduleInput) {
        return;
    } else {
        localStorage.setItem(timeKeyOfInput, hourlyScheduleInput);
        $('#feedback').text("Event added to LocalStorage!")   
    }; 
       
});

//Retrieve hourlySchedule from local storage
function displaySchedule() {
    timeblock.each(function () {
        //Get key
        var timeKey = $(this).find('.hour').text();
        console.log(timeKey);
        //Get Vaue
        var hourlySchedule = localStorage.getItem(timeKey);
        console.log(hourlySchedule);
        //Display on the page
        $(this).find('.description').val(hourlySchedule);
    });
}
displaySchedule();

