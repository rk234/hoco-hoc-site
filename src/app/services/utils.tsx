export function loadFromCache(cacheArr: any[], id: string): any {
    let filter = cacheArr.filter(item => item.id == id);
    
    if(filter.length > 0) {
        return filter[0]
    } else {
        return null;
    }
}

export function upperCaseFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1)
}

export const ALL_LANGUAGES = [
    "Python",
    "Java",
    "CPP"
]
