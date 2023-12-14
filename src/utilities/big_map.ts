

export class BigMap{
    private static count = 0;
    private static readonly bigMap = new Map<string, string>();
    public static get(id:string):string {
        if (this.bigMap.has(id) && this.bigMap.get(id)) {
            return this.bigMap.get(id)!;
        }
        this.bigMap.set(id, (this.count++).toString());
        return this.bigMap.get(id)!;
    }
}