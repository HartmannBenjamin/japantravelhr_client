/**
 * @param {Integer} status
 *
 * @return {boolean}
 */
function isOpen(status) {
  return status.name === 'Open';
}

/**
 * @param {Integer} status
 *
 * @return {boolean}
 */
function isHRReviewed(status) {
  return status.name === 'Hr Reviewed';
}

/**
 * @param {Integer} status
 *
 * @return {boolean}
 */
function isProcessed(status) {
  return status.name === 'Processed';
}

export {isOpen, isHRReviewed, isProcessed};
