/**
 * 
 * @param {Function} func 
 * @param {number} wait 
 * @param {boolean} immediate 
 */
export default function debounce(func, wait, immediate) {
    let timeout;

    // This is the function that is actually executed when
    // the DOM event is triggered.
    return function functionToExecute() {

        const args = arguments;

        // The function to be called after 
        // the debounce time has elapsed
        const callLater = ()=>{
            // null timeout to indicate the debounce ended
            timeout = null;

            // Call function now if you did not on the leading end
            if (!immediate) func.apply(this, args);
        };

       
        const callNow = immediate && !timeout;

        // This will reset the waiting every function execution.
        clearTimeout(timeout);

        // Restart the debounce waiting period.
        timeout = setTimeout(callLater, wait);

        // Call immediately if you're dong a leading
        // end execution
        if (callNow) func.apply(this, args);
    };
};