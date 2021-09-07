import moment from 'moment';

/**
 * @param {String} string
 *
 * @return {number}
 */
function calculateLongestWord(string) {
  const words = string.split(' ');
  let maxLength = 0;

  words.forEach((word) => {
    maxLength = word.length > maxLength ? word.length : maxLength;
  });

  return maxLength;
}

/**
 * @param {String} date
 *
 * @return {string}
 */
function formatDate(date) {
  if (date === null) {
    return 'None';
  }

  return moment(date).utc().format('MMMM Do YYYY, h:mm a');
}

/**
 * @param {File} file
 *
 * @return {boolean}
 */
function fileHasValidExtension(file) {
  return ['jpg', 'png', 'jpeg'].some(
      (x) => x.toLowerCase() === file.name.split('.').pop().toLowerCase(),
  );
}

export {calculateLongestWord, formatDate, fileHasValidExtension};
