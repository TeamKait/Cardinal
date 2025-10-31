import type {Spending} from "@/ts/AccountData/SpendingCategoriesData.ts";
import type {ColorTheme} from "@/ts/ColorTheme.ts";
import {ref, type Ref} from "vue";

export class AccountData {
    public budget: number;
    public spendings: Spending[];
    public colorTheme: ColorTheme;
    public periodType: PeriodType;
    public spendingMode: SpendingMode;

    public constructor(
        budget: number = 0,
        spendings: Spending[] = [],
        colorTheme: ColorTheme = 'auto',
        periodType: PeriodType = 'day',
        spendingMode: SpendingMode = 'period') {

        this.budget = budget;
        this.spendings = spendings;
        this.colorTheme = colorTheme;
        this.periodType = periodType;
        this.spendingMode = spendingMode;
    }
}

export type PeriodType = 'day' | 'week';
export type SpendingMode = 'period' | 'budget';

export const PERIOD_LABELS: Record<PeriodType, string> = {
    day: 'День',
    week: 'Неделя',
};

export const SPENDING_MODE_LABELS: Record<SpendingMode, string> = {
    period: 'Период',
    budget: 'Бюджет',
};
