function isOpen (status) {
    return status.name === 'Open'
}

function isHRReviewed (status) {
    return status.name === 'Hr Reviewed'
}

function isProcessed (status) {
    return status.name === 'Processed'
}

export { isOpen, isHRReviewed, isProcessed }
