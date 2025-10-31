export class DropdownFunction {
    public text: string;
    public icon: string | null;
    public func: Function;

    public constructor(text: string, icon: string | null, func: Function) {
        this.text = text;
        this.icon = icon;
        this.func = func;
    }
}