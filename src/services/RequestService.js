function isOpen (status) {
    return status.name === 'Open'
}

function isHRReviewed (status) {
    return status.name === 'Hr Reviewed'
}

function isComplete(status) {
    return status.name === 'Complete'
}

export { isOpen, isHRReviewed, isComplete }
