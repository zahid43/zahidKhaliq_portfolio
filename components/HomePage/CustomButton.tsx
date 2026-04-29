import type { ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  className?: string;
  glowContainerClassName?: string;
  glowClassName?: string;
  textClassName?: string;
};

type CustomButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export default function CustomButton({
  children,
  className = "",
  glowContainerClassName = "",
  glowClassName = "",
  textClassName = "",
  ...props
}: CustomButtonProps) {
  const buttonClassName = `group relative z-[1] inline-flex overflow-hidden rounded-xl bg-transparent p-1 transition-all duration-300 hover:drop-shadow-[0_0_8px_#F0ABFC] ${className}`.trim();
  const { type = "button", ...buttonProps } = props;

  return (
    <button type={type} className={buttonClassName} {...buttonProps}>
      <span
        className={`absolute inset-0 -z-10 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-75 group-hover:opacity-100 ${glowContainerClassName}`}
      >
        <span
          className={`absolute -inset-full aspect-square animate-spin bg-[conic-gradient(from_90deg,transparent_20%,#F0ABFC_30%,#F0ABFC_58%,#1cbab5_72%,transparent_82%)] blur-[8px] [animation-duration:1.4s] ${glowClassName}`}
        />
        <span
          className={`absolute -inset-full aspect-square animate-spin bg-[conic-gradient(from_90deg,transparent_20%,#F0ABFC_30%,#F0ABFC_58%,#1cbab5_72%,transparent_82%)] blur-[8px] [animation-delay:-0.7s] [animation-duration:1.4s] [animation-direction:reverse] ${glowClassName}`}
        />
      </span>
      <span className={`relative block rounded-xl bg-[#1F2124] px-5 py-2.5 text-xl text-white ${textClassName}`}>
        {children}
      </span>
    </button>
  );
}
