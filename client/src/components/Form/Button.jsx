function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 text-xs md:text-base rounded-md bg-indigo-700 text-stone-100 hover:bg-indigo-900 hover:text-stone-200 transition duration-300"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
