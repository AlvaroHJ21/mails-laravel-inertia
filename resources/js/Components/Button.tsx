import Loader from "@/Icons/Loader";
import { cn } from "@/Utils/cn";

interface ButtonProps {
    variant?: "outline" | "filled" | "text";
    color?: "amarillo" | "error";
    size?: "sm" | "md" | "lg";
    wFit?: boolean;
    isLoading?: boolean;
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

const Button = (props: Props) => {
    const {
        className,
        variant = "filled",
        color = "amarillo",
        size = "md",
        wFit = false,
        isLoading = false,
        disabled,
        children,
        ...restProps
    } = props;

    return (
        <button
            className={cn(
                "flex justify-center w-full max-w-[180px]  gap-2 font-semibold hover:shadow-md rounded-md whitespace-nowrap items-center disabled:opacity-50",
                {
                    "bg-amarillo text-azul-marino":
                        variant === "filled" && color === "amarillo",
                    "bg-red-400 text-white":
                        variant === "filled" && color === "error",

                    "bg-transparent": variant === "text",

                    "text-sm py-1 px-3": size === "sm",
                    "text-base py-1 px-4": size === "md",
                    "text-lg py-2 px-4": size === "lg",
                    "w-fit": wFit,
                },
                className
            )}
            disabled={isLoading || disabled}
            {...restProps}
        >
            {isLoading ? <Loader /> : children}
        </button>
    );
};

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps;

const Link = (props: LinkProps) => {
    const {
        className,
        variant = "filled",
        color = "amarillo",
        size = "md",
        wFit = false,

        ...restProps
    } = props;
    return (
        <a
            className={cn(
                "flex justify-center w-full max-w-[160px]  gap-2 font-semibold hover:shadow-md rounded-md whitespace-nowrap items-center disabled:opacity-50",
                {
                    "bg-amarillo text-azul-marino":
                        variant === "filled" && color === "amarillo",
                    "bg-transparent": variant === "text",
                    "text-sm py-1 px-3": size === "sm",
                    "text-base py-1 px-4": size === "md",
                    "text-lg py-2 px-4": size === "lg",
                    "w-fit": wFit,
                },
                className
            )}
            {...restProps}
        />
    );
};

Button.Link = Link;

export default Button;
