import * as actions from "../actions";

describe("ui actions tests:", () => {
    test("startFetching test", () => {
        expect(actions.startFetching()).toMatchSnapshot();
    });
    test("stopFetching test", () => {
        expect(actions.stopFetching()).toMatchSnapshot();
    });
});
