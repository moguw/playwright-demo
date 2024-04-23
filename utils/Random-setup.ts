const characters ='abcdefghijklmnopqrstuvwxyz0123456789';
/**随机生成string */
export function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
/**随机获取一个列表的值 */
export function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    
    return shuffled.slice(min).join();
}
// var array = ['1','2','4','5','6','7','8','9','10'];
// console.log( getRandomArrayElements(array, 5) );
