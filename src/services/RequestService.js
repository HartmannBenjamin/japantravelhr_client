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

export {isOpen, isHRReviewed};
