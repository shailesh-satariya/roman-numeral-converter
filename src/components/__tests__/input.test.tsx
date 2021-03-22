import {shallow, ShallowWrapper} from "enzyme";
import Input, {InputProps} from "../input";
import {findByTestAttr} from "../../test/utils";

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 *
 * @param {InputProps} props
 *
 * @returns {ShallowWrapper}
 */
const setup = (props: InputProps): ShallowWrapper => {
    return shallow(<Input {...props}/>);
};

describe("renders component and elements without erros", () => {
    const wrapper: ShallowWrapper = setup({
        label: "Number",
        type: "number",
        name: "number",
        onChange: (value => void (0))
    });

    test("renders input component", () => {
        const componentInput = findByTestAttr(wrapper, "component-input");

        expect(componentInput.length).toEqual(1);
    });

    test("renders label element", () => {
        const elementLabel = findByTestAttr(wrapper, "element-label");

        expect(elementLabel.length).toEqual(1);
    });

    test("renders input element", () => {
        const elementInput = findByTestAttr(wrapper, "element-input");

        expect(elementInput.length).toEqual(1);
    });

    test("does not render error div when error prop is not set", () => {
        const elementErrorDiv = findByTestAttr(wrapper, "element-error-div");

        expect(elementErrorDiv.length).toEqual(0);
    });

    test("renders error div when error prop is set", () => {
        wrapper.setProps({error: "Error"});
        const elementErrorDiv = findByTestAttr(wrapper, "element-error-div");

        expect(elementErrorDiv.length).toEqual(1);
    });
});

test("input on change event", () => {
    const mockOnClose: jest.Mock = jest.fn();
    const wrapper: ShallowWrapper = setup({
        label: "Number",
        type: "number",
        name: "number",
        onChange: mockOnClose
    });

    const value: string = "11";
    const elementInput = findByTestAttr(wrapper, "element-input");
    elementInput.simulate("change", {target: {value}});
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledWith(value);
});