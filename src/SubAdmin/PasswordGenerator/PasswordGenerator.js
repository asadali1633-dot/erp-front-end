import React from "react";
import { ActionButton } from "../../Components/Button/Button";

function PasswordGenerator({
    length = 12,
    onGenerate,
    className
}) {
    const generateStrongPassword = () => {
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const special = "!@#$%^&*()_+[]{}|;:,.<>?";
        const allChars = upper + lower + numbers + special;

        let password = "";
        password += upper[Math.floor(Math.random() * upper.length)];
        password += lower[Math.floor(Math.random() * lower.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += special[Math.floor(Math.random() * special.length)];

        for (let i = 4; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        password = password.split("").sort(() => Math.random() - 0.5).join("");

        if (onGenerate) onGenerate(password);
    };

    return (
        <>
            <span
                onClick={generateStrongPassword}
                className={className}>
                Generate Password
            </span>
            {/* <ActionButton
                type="button"
                title="Generate Strong Password"
                onClick={generateStrongPassword}
            /> */}
        </>

    );
}

export default PasswordGenerator;
