function customRound(value) {
    if (value > 0.5) {
        return 1;
    } else {
        return 0;
    }
}

module.exports = customRound;