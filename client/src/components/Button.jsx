function Button({children, ...props}) {
    return(
        <button className="px-4 py-2 text-xs md:text-base rounded-md bg-yellow-700 text-stone-100 hover:bg-yellow-900 hover:text-stone-200" {...props}>
            {children}
        </button>
    );
}

export default Button;