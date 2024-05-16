
interface global_data {
    [key: string]: string;
 }
let global_data:global_data = {};

function set_global_data(keys, value){ 
    global_data[keys] = value
    return set_global_data
}

function get_global_data(keys){
    return global_data[keys]
}

export {set_global_data,get_global_data}