import { ButtonSize, ButtonType } from 'models';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    variant?: ButtonType;
    size?: ButtonSize;
    to?: string;
    additionalClasses?: string;
}

export const Button: React.FC<Props> = ({
    variant,
    size,
    to,
    additionalClasses,
    children,
}) => {
    return to ? (
        <Link
            className={`btn ${buttonType()} ${buttonSize()} ${additionalClasses}`}
            to={to}
        >
            {children}
        </Link>
    ) : (
        <button
            className={`btn ${buttonType()} ${buttonSize()} ${additionalClasses}`}
        >
            {children}
        </button>
    );

    function buttonType() {
        switch (variant) {
            case ButtonType.Primary:
                return 'btn--primary';
            case ButtonType.Secondary:
                return 'btn--secondary';
            case ButtonType.PrimaryOutline:
                return 'btn--primary--outline';
            default:
                return;
        }
    }

    function buttonSize() {
        switch (size) {
            case ButtonSize.Small:
                return 'btn--sml';
            case ButtonSize.Medium:
                return 'btn-med';
            case ButtonSize.Large:
                return 'btn-lrg';
            default:
                return;
        }
    }
};
