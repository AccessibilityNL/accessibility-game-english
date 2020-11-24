/*

    Timer class
    for Accessibility Game

*/

function Timer() {

    const startTime = new Date().getTime();
    let endTime = 0;

    return {
        // stop and get timer value
        stopAndGet: () => {
            endTime = (new Date().getTime()) - startTime;
            return endTime / 60000; // in minutes
        },
        // get current timer value
        get: () => ((endTime !== 0 ? endTime : (new Date().getTime()) - startTime) / 60000)
    }

}