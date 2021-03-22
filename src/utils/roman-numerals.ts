/**
 * RomanNumerals class - utility class to convert numbers to roman numerals and vice versa
 */
export default class RomanNumerals {
    /**
     * toRoman function
     * @function
     *
     * @throws errors
     *
     * @param {number | string} input
     *
     * @return {string}
     */
    public static toRoman(input: number | string): string {
        let num: number = Number(input);

        if (isNaN(num)) {
            throw new Error(`"${input}" is not a number that can be converted to Roman numerals.`);
        }

        if (!Number.isInteger(num) || !(/^-?\d+$/.test(`${input}`))) {
            throw new Error(`Only integers can be converted to Roman numerals.`);
        }

        if (num < 0) {
            throw new Error(`Only positive numbers can be converted to Roman numerals.`);
        }

        if (num > 999999) {
            throw new Error(`"${input}" is to big. Keep it less than 1000000.`);
        }

        const numerals: Record<string, number> = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
        };
        let roman: string = "";
        let key: string;
        for (key of Object.keys(numerals)) {
            const q: number = Math.floor(num / numerals[key]);
            num -= q * numerals[key];
            roman += key.repeat(q);
            if (num === 0) {
                break;
            }
        }
        return roman;
    }

    /**
     * toNumber function
     * @function
     *
     * @throws errors
     *
     * @param {string} input
     *
     * @return {number}
     */
    public static toNumber(input: string): number {
        const numerals: Record<string, number> = {I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000};

        let roman: string[] = input.toUpperCase().split("");
        let num: number = 0;
        let val: number = 0;

        while (roman.length) {
            const ch: string | undefined = roman.shift();
            if (!ch || !(ch in numerals)) {
                throw new Error(`"${input}" is not a Roman numerals.`);
            }

            val = numerals[ch];
            num += val * (val < numerals[roman[0]] ? -1 : 1);
        }
        return num;
    }
}