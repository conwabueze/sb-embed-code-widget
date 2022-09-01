import React from "react"
import {screen, render} from "@testing-library/react"

import {EmbedCodeWidget} from "./EmbedCodeWidget";

describe("AAWidget", () => {
    it("should render the component", () => {
        render(<EmbedCodeWidget contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
