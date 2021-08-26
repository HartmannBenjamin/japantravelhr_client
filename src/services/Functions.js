import moment from "moment";

function calculateLongestWord(variable) {
    const words = variable.split(" ");
    let maxLength = 0;

    words.forEach((word) => {
        maxLength = word.length > maxLength ? word.length : maxLength;
    })

    return maxLength;
}

function formatDate(date) {
    if(date === null) {
        return 'None'
    }
    return moment(date).utc().format('MMMM Do YYYY, h:mm a')
}

function fileHasValidExtension(file) {
    return ['jpg', 'png', 'jpeg'].some(x => x.toLowerCase() === file.name.split('.').pop().toLowerCase())
}

export { calculateLongestWord, formatDate, fileHasValidExtension };
