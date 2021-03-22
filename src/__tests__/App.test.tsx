import {shallow, ShallowWrapper} from "enzyme";
import App, {AppState} from "../App";
import {findByTestAttr} from "../test/utils";
import React from "react";
import RomanNumerals from "../utils/roman-numerals";

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 *
 * @returns {ShallowWrapper}
 */
const setup = (): ShallowWrapper => {
    return shallow(<App/>);
};

describe("renders component and elements without erros", () => {
    const wrapper: ShallowWrapper = setup();

    test("renders input component", () => {
        const componentApp = findByTestAttr(wrapper, "component-app");

        expect(componentApp.length).toEqual(1);
    });

    test("renders input number element", () => {
        const elementInputNumber = findByTestAttr(wrapper, "element-input-number");

        expect(elementInputNumber.length).toEqual(1);
    });

    test("renders input roman element", () => {
        const elementInputRoman = findByTestAttr(wrapper, "element-input-roman");

        expect(elementInputRoman.length).toEqual(1);
    });
});

describe("inputs on change events", () => {
    let wrapper: ShallowWrapper;
    const originalUseState = React.useState;
    const mockSetState: jest.Mock<number> = jest.fn();
    const initState: AppState = {
        number: "1",
        roman: RomanNumerals.toRoman("1").toString()
    };

    beforeEach(() => {
        mockSetState.mockClear();
        React.useState = jest.fn(() => [initState, mockSetState]) as any;
        wrapper = setup();
    });

    afterEach(() => {
        React.useState = originalUseState;
    });

    test("input number element's on change event", () => {
        const elementInputNumber = findByTestAttr(wrapper, "element-input-number");

        (elementInputNumber.prop("onChange") as Function)("100");
        expect(mockSetState).toHaveBeenCalled();
    });

    test("input roman element's on change event", () => {
        const elementInputRoman = findByTestAttr(wrapper, "element-input-roman");

        (elementInputRoman.prop("onChange") as Function)("M");
        expect(mockSetState).toHaveBeenCalled();
    });
});