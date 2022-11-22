import sum from './A'
let name = 'B'



const average = function average(...params) {
    return (sum(...params) / params.length).toFixed(2);
};

export default average