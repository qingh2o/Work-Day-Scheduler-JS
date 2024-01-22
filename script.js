$(document).ready(function () {
    //Display current day
    var currentDay = dayjs().format('dddd, MMMM D');
    $('#currentDay').text(currentDay);

    // Retrieve saved current day from localStorage
    var savedCurrentDay = localStorage.getItem('savedCurrentDay');

    var timeblock = $(".time-block");

    //Color-code each timeblock 
    function colorCodeHours() {
        var currentTime = dayjs().hour();

        timeblock.each(function () {
            var idValue = $(this).attr("id");
            var idHourValue = parseInt(idValue.split("-")[1]);

            //Color-code for past hour
            if (idHourValue < currentTime) {
                $(this).addClass('past');

                //Color-code for present hour
            } else if (idHourValue === currentTime) {
                $(this).removeClass('past');
                $(this).addClass('present');

                //Color-code for future hour
            } else {
                $(this).removeClass('past present');
                $(this).addClass('future');
            }
        });

    };

    colorCodeHours();

    //Save each input schedule individually in localStorage. 
    $(".saveBtn").on('click', function () {

        //User input hourly Schedule
        var hourlyScheduleInput = $(this).parent().find('.description').val();
        var timeKeyOfInput = $(this).parent().find('.hour').text();

        //Check the input is vaild before save to localStorage.
        if (!hourlyScheduleInput) {
            return;
        } else {
            localStorage.setItem('savedCurrentDay', currentDay);
            localStorage.setItem(timeKeyOfInput, hourlyScheduleInput);
            //Use Toastr for notification
            toastr.success("Event added to Local storage!");
        };
    });

    //Retrieve hourlySchedule from local storage
    function displaySchedule() {
        timeblock.each(function () {
            //Get key
            var timeKey = $(this).find('.hour').text();

            //Get Vaue
            var hourlySchedule = localStorage.getItem(timeKey);

            //Display on the page
            $(this).find('.description').val(hourlySchedule);
        });
    }

    displaySchedule();

    // Check if a new day has started
    if (currentDay !== savedCurrentDay) {
        NewDayReset();
    };

    function NewDayReset() {
        //Clear page input
        $("textarea").val('');
    }

});