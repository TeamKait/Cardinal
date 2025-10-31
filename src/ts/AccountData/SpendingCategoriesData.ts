export class SpendingCategory {
    public name: string;
    public color: string;
    public icon: string;

    public constructor(name: string, color: string, icon: string) {
        this.name = name;
        this.color = color;
        this.icon = icon;
    }
}

export class Spending {
    public amount: number;
    public date: Date;
    public category: SpendingCategory;

    public constructor(amount: number, date: Date, category: SpendingCategory) {
        this.amount = amount;
        this.date = date;
        this.category = category;
    }
}

export function IsSpending(sp: { category: SpendingCategory }): boolean {
    // Helper that works with plain objects too (no class instance required)
    return sp?.category?.name != IncomeSpendingCategory.name;
}

export function NewIncomeSpending(amount: number){
    //TODO: make date assigment automatic
    return new Spending(amount, new Date(Date.now()), IncomeSpendingCategory)
}

export const SpendingCategories: SpendingCategory[] = [
    new SpendingCategory("Без категории", "#4a4a4a", "radix-icons:slash"),
    new SpendingCategory("Продукты", "#ff2e8c", "lucide:lollipop"),
    new SpendingCategory("Развлечения", "#d5ba10", "radix-icons:accessibility"),
    new SpendingCategory("Техника", "#1f70ff", "radix-icons:gear"),
    new SpendingCategory("Здоровье", "#ff2e2e", "lucide:cross"),
    new SpendingCategory("Необходимое", "#c42eff", "radix-icons:cube")
]

export const IncomeSpendingCategory = new SpendingCategory("Зачисление", "#00c680", "lucide:russian-ruble")