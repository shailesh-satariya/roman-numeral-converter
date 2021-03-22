import RomanNumerals from "../roman-numerals";

interface toRomanData {
    input: string | number;
    output: string;
}

interface toNumberData {
    input: string;
    output: number | string;
}

describe("toRoman function", () => {
    describe("returns a roman numeral when a valid number is passed", () => {
        const testItems: toRomanData[] = [
            {
                input: 1,
                output: "I"
            },
            {
                input: 100,
                output: "C"
            },
            {
                input: 1990,
                output: "MCMXC"
            },
            {
                input: 2008,
                output: "MMVIII"
            }
        ];

        for (const item of testItems) {
            const {input, output}: toRomanData = item;
            test(`returns ${output} when input is ${input}`, () => {
                expect(RomanNumerals.toRoman(input)).toEqual(output);
            });
        }
    });

    describe("throws an error when a invalid number is passed", () => {
        const testItems: toRomanData[] = [
            {
                input: "",
                output: "Only integers can be converted to Roman numerals."
            },
            {
                input: 10.10,
                output: "Only integers can be converted to Roman numerals."
            },
            {
                input: "abc",
                output: "\"abc\" is not a number that can be converted to Roman numerals."
            },
            {
                input: -10,
                output: "Only positive numbers can be converted to Roman numerals."
            },
            {
                input: 1000000000000,
                output: "\"1000000000000\" is to big. Keep it less than 1000000."
            }
        ];

        for (const item of testItems) {
            const {input, output}: toRomanData = item;
            test(`returns ${output} when input is ${input}`, () => {
                let errorMessage: string = "";
                try {
                    RomanNumerals.toRoman(input);
                } catch (e) {
                    errorMessage = e.message;
                }

                expect(errorMessage).toEqual(output);
            });
        }
    });
});

describe("toNumber function", () => {
    describe("returns a number when a valid roman numeral is passed", () => {
        const testItems: toNumberData[] = [
            {
                input: "I",
                output: 1
            },
            {
                input: "C",
                output: 100
            },
            {
                input: "MCMXC",
                output: 1990
            },
            {
                input: "MMVIII",
                output: 2008
            }
        ];

        for (const item of testItems) {
            const {input, output}: toNumberData = item;
            test(`returns ${output} when input is ${input}`, () => {
                expect(RomanNumerals.toNumber(input)).toEqual(output);
            });
        }
    });

    describe("throws error when a invalid roman numeral is passed", () => {
        const testItems: toNumberData[] = [
            {
                input: "ABC",
                output: "\"ABC\" is not a Roman numerals."
            },
            {
                input: "DCS",
                output: "\"DCS\" is not a Roman numerals."
            }
        ];

        for (const item of testItems) {
            const {input, output}: toNumberData = item;
            test(`returns ${output} when input is ${input}`, () => {
                let errorMessage: string = "";
                try {
                    RomanNumerals.toNumber(input);
                } catch (e) {
                    errorMessage = e.message;
                }

                expect(errorMessage).toEqual(output);
            });
        }
    });
});