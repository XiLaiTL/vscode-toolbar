export function intersectionList(list1: any[], list2: any[]) {
    return list1.filter(item => list2.includes(item));
}