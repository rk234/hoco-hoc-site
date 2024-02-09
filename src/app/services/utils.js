export function loadFromCache(cacheArr, id) {
    let filter = cacheArr.filter(item => item.id == id);
    
    if(filter.length > 0) {
        return filter[0]
    } else {
        return null;
    }
}