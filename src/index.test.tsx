import { screen } from "@testing-library/dom";

import "../dev/bootstrap";
import "./index";

describe("Widget test", () => {
  it("should render the widget", () => {
    const widget = document.createElement("embed-code");
    widget.setAttribute("message", "World");
    document.body.appendChild(widget);

    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    expect(screen.getByText(/en_US/)).toBeInTheDocument();
  });
});
