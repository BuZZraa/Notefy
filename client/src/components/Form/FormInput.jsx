function FormInput({ label, type, name, ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">
        {label}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        className="mt-1 p-2 w-full border rounded-md"
        autoComplete="off"
        required
        {...props}
      />
    </div>
  );
}

export default FormInput;
