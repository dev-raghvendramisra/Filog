export default function getFormattedTime(milliseconds = false) {
    const crrDate = new Date();
    let formattedDate = crrDate.toDateString();
    formattedDate = formattedDate.substring(
        formattedDate.indexOf(" ") + 1,
        formattedDate.length
    );
    let time = crrDate.toTimeString();
    
    // Format hours and minutes
    time = time.substring(0, time.lastIndexOf(":"));

    // Add seconds and milliseconds if the parameter is true
    if (milliseconds) {
        const seconds = crrDate.getSeconds().toString().padStart(2, "0");
        const millis = crrDate.getMilliseconds().toString().padStart(3, "0");
        time += `:${seconds}.${millis}`;
    }

    // Append AM/PM
    if (crrDate.getHours() < 12) {
        time += " AM";
    } else {
        time += " PM";
    }

    formattedDate += " " + time;
    return formattedDate;
}
