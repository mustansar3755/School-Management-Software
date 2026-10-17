import { Link } from "react-router-dom";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-line bg-white text-ink hover:bg-chalk",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({ children, icon: Icon, variant = "primary", to, className = "", ...props }) {
  const classes = `inline-flex items-center cursor-pointer justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon size={16} />}
      {children}
    </>
  );

  // "to" diya ho to ye link ban jata hai, warna aam button
  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}