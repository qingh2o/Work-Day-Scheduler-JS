$(document).ready(function () {
    //Display current day
    var currentDay = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDay);

    //Retrieve saved current day from localStorage for comparing new day
    var savedCurrentDay = localStorage.getItem('savedCurrentDay');

    var timeblock = $(".time-block");

    //Display color-code timeblocks 
    function colorCodeHours() {
        var currentTime = dayjs().hour();
        timeblock.each(function () {

            //Use the number in id to compare with the current hour
            var idValue = $(this).attr("id");
            var idHourValue = parseInt(idValue.split("-")[1]);

            //Color-code for past hour
            if (idHourValue < currentTime) {
                $(this).addClass('past');

                //Color-code for present hour
            } else if (idHourValue === currentTime) {
                $(this).removeClass('past').addClass('present');

                //Color-code for future hour
            } else {
                $(this).removeClass('past present').addClass('future');
            }
        });
    };

    colorCodeHours();

    //Save each input schedule individually in localStorage. 
    $(".saveBtn").on('click', function () {

        //Set key and value for localStorage when user inputs hourly Schedule
        var hourlyScheduleInput = $(this).parent().find('.description').val();
        var timeKeyOfInput = $(this).parent().find('.hour').text();

        //Check the input is vaild before save to localStorage.
        if (!hourlyScheduleInput) {
            return;
        } else {
            //Save current date to compare with new day
            localStorage.setItem('savedCurrentDay', currentDay);

            //Save key and value for localStorage 
            localStorage.setItem(timeKeyOfInput, hourlyScheduleInput);

            //Use Toastr for notification after user clicks the save button
            toastr.success("Event added to Local storage!");
        };
    });

    //Retrieve hourlySchedule from localStorage
    function displaySchedule() {
        timeblock.each(function () {
            //Get key
            var timeKey = $(this).find('.hour').text();

            //Get Vaue
            var hourlySchedule = localStorage.getItem(timeKey);

            //Display on the page
            $(this).find('.description').val(hourlySchedule);
        });
    };

    displaySchedule();

    //Check if a new day has started (reserve localStorage for new day input replacement)
    if (currentDay !== savedCurrentDay) {
        NewDayReset();
    };

    //Clear page input 
    function NewDayReset() {
        $("textarea").val('');
    };
});