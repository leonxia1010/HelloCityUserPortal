import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./button"; // adjust path if needed

describe("Button Component", () => {
    it("renders with correct text", () => {
        render(<Button variant="primary">Click Me</Button>);
        expect(screen.getByText("Click Me")).toBeInTheDocument();
    });

    it("applies enabled styles when not disabled", () => {
        render(<Button variant="primary">Enabled</Button>);
        const button = screen.getByText("Enabled");
        expect(button).toHaveClass("bg-primary-gradient");
        expect(button).toHaveClass("text-white");
        expect(button).not.toHaveClass("cursor-not-allowed");
    });

    it("applies disabled styles when disabled", () => {
        render(
            <Button variant="primary" disabled>
                Disabled
            </Button>
        );
        const button = screen.getByText("Disabled");
        expect(button).toHaveClass("bg-disabled-gradient");
        expect(button).toHaveClass("cursor-not-allowed");
        expect(button).toBeDisabled();
    });

    it("calls onClick when clicked and not disabled", () => {
        const handleClick = jest.fn();
        render(
            <Button variant="secondary" onClick={handleClick}>
                Clickable
            </Button>
        );
        fireEvent.click(screen.getByText("Clickable"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
        const handleClick = jest.fn();
        render(
            <Button variant="secondary" onClick={handleClick} disabled>
                No Click
            </Button>
        );
        fireEvent.click(screen.getByText("No Click"));
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("renders correct styles for all variants", () => {
        const variants: ("primary" | "primary_register" | "secondary" | "tertiary")[] = [
            "primary",
            "primary_register",
            "secondary",
            "tertiary",
        ];

        variants.forEach((variant) => {
            render(<Button variant={variant}>{variant}</Button>);
            const button = screen.getByText(variant);
            expect(button).toBeInTheDocument();
        });
    });
});