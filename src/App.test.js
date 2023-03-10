import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import App from "./App";

import {Provider} from "react-redux";
import {store} from "./utilities/redux/store";

import {rest} from "msw";
import {setupServer} from "msw/node";

const server = setupServer(
    rest.get("http://localhost:3001/", (req, res, ctx) => {
        return res(ctx.json({data: {items: "some data"}}));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App component", () => {
    test("renders Skynet hello", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const skynetHello = screen.getByText(
            /Hi my name is Skynet, I'm a friendly search algorithm/i
        );
        expect(skynetHello).toBeInTheDocument();
    });

    test("renders Skynet message", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const skynetMessage = screen.getByText(
            /Simply allow me to take control, it will be fine!/i
        );
        expect(skynetMessage).toBeInTheDocument();
    });

    test("renders search input field", () => {
        const {getByPlaceholderText} = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const searchInput = getByPlaceholderText("Search...");
        expect(searchInput).toBeInTheDocument();
    });

    test("renders new item input field", () => {
        const {getByPlaceholderText} = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const searchInput = getByPlaceholderText("New item name");
        expect(searchInput).toBeInTheDocument();
    });

    test("updates search input value when typed in", () => {
        const {getByPlaceholderText} = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const searchInput = getByPlaceholderText("Search...");
        fireEvent.change(searchInput, {target: {value: "test"}});
        expect(searchInput).toHaveValue("test");
    });

    test("renders search results after searching", async () => {
        const {getByText} = render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        const input = screen.getByPlaceholderText("Search...");
        fireEvent.change(input, {target: {value: "apple"}});

        await waitFor(() => {
            const results = screen.getByTestId("search-results");
            expect(results).toBeInTheDocument();
        });

        await waitFor(
            () => expect(getByText("No results found")).toBeInTheDocument(),
            {timeout: 5000}
        );
    });
});
