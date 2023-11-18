const __author__ = "Jerry Overton"
const __copyright__ = "Copyright (C) 2023 appliedAIstudio"
const __version__ = "0.1"


export function createIDfromTitleAndIndex(title, index){
    // turn everything to lowercase
    var id = title.toLowerCase();

    // replace spaces with underscores
    id = id.split(' ').join('_')

    // get rid of non alphanumeric characters
     id = id.replace(/\W/g, '');

    // add an index at the end
    var id = id + "_" + index

    return id;
}