let name = 'A'

const sum = function sum(...params) {
    return params.reduce((result, item) => {
        return result + item;
    });
};

export default sum;