import React from "react";
import "./App.css";
import Input from "./components/input";
import RomanNumerals from "./utils/roman-numerals";

export interface AppState {
    number: string;
    roman: string;
    numberError?: string;
    romanError?: string;
}

const initState: AppState = {
    number: "1",
    roman: RomanNumerals.toRoman("1").toString()
};

/**
 * App component - renders app
 * @function App
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const App: React.FC = (): JSX.Element => {
    const [state, setState] = React.useState(initState);

    const onNumberChange: (number: string, currState: AppState) => void = React.useCallback((number: string, currState: AppState): void => {
        try {
            const roman: string = RomanNumerals.toRoman(number);
            setState({number, roman});
        } catch (e) {
            setState({...currState, number, numberError: e.message});
        }
    }, []);

    const onRomanChange: ((roman: string, currState: AppState) => void) = React.useCallback((roman: string, currState: AppState): void => {
        try {
            const number: string = RomanNumerals.toNumber(roman).toString();
            setState({number, roman});
        } catch (e) {
            setState({...currState, roman, romanError: e.message});
        }
    }, []);

    return (
        <div data-test="component-app" className="card m-5">
            <h5 className="card-header">
                Roman Numeral Converter
            </h5>
            <div className="card-body">
                <div className="form-row">
                    <div className="col-md-5">
                        <Input data-test="element-input-number" type="number" name="number" label="Number"
                               onChange={(value: string) => onNumberChange(value, state)}
                               value={state.number}
                               title={state.number} {...(state.numberError ? {error: state.numberError} : {})}/>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                        <h2 className="mt-4">=</h2>
                    </div>
                    <div className="col-md-5">
                        <Input data-test="element-input-roman" type="text" name="roman" label="Roman"
                               onChange={(value: string) => onRomanChange(value, state)}
                               value={state.roman}
                               title={state.roman} {...(state.romanError ? {error: state.romanError} : {})}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
