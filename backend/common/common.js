module.exports = {

    isNullOrEmpty: function(value) {
        return !(typeof value === "string" && value.length > 0);
    }
};