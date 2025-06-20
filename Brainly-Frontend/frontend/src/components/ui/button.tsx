interface ButtonProps {
  variant: "primary" | "secondry"|"start";
  size: "sm" | "md" | "lg";
  text: string;
  starticon?: React.ReactNode;
  onClick?: () => void;
}

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondry: "bg-blue-100 text-black-600 hover:bg-blue-200",
start:"bg-black text-white hover:bg-gray-600",
};

const sizes = {
  sm: "py-1 px-3 text-sm",
  md: "py-2 px-5 text-base",
  lg: "py-3 px-6 text-lg",
};

const defultstyle = "flex items-center gap-2 rounded-md font-medium shadow transition-all duration-200";

const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variants[props.variant]} ${sizes[props.size]} ${defultstyle}`}
    >
      
      {props.starticon}{props.text}
    </button>
  );
};

export default Button;
