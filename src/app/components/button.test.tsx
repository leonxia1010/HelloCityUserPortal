import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./button"; // adjust path if needed

interface RenderButtonProps {
    variant: "primary" | "primary_register" | "secondary" | "tertiary";
    disabled?: boolean;
}

//variant
const variantList: RenderButtonProps["variant"][] = [
    "primary",
    "primary_register",
    "secondary",
    "tertiary"
];

//variant style
const expectedClass: Record<string, string> = {
    primary: "bg-primary-gradient",
    primary_register: "bg-modal-gradient",
    secondary: "bg-white",
    tertiary: "text-primary"
};

//generate variant × enabled/disabled
const cases = variantList.flatMap((variant) => [
    { variant, disabled: false },
    { variant, disabled: true }
]);

//button function
const renderButton = ({
    variant,
    disabled,
    onClick
}: RenderButtonProps & { onClick?: () => void }) => {
    render(
        <Button variant={variant} disabled={disabled} onClick={onClick}>
            Click Me
        </Button>
    );
    return screen.getByRole("button", { name: /click me/i });
};

//main test
test.each(cases)(
    "renders %s button as %s with correct style and click behavior",
    ({ variant, disabled }) => {
        const handleClick = jest.fn();
        const button = renderButton({ variant, disabled, onClick: handleClick });

        expect(button).toBeInTheDocument();

        //variant style & enable/disable test
        if (disabled) {
            expect(button).toBeDisabled();
            expect(button).toHaveClass("cursor-not-allowed");
        } else {
            expect(button).not.toBeDisabled();
            expect(button).toHaveClass(expectedClass[variant]);
        }

        //onclick test
        fireEvent.click(button);

        if (disabled) {
            expect(handleClick).not.toHaveBeenCalled();
        } else {
            expect(handleClick).toHaveBeenCalledTimes(1);
        }
    }
);