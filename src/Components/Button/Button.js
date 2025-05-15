function Button (
  {
    className = "bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold py-2 px-6 border-b-4 border-purple-900 rounded-md shadow-md hover:scale-110 hover:border-b-2 transition-all duration-300 ease-in-out active:scale-100",
    type = "button",
    buttonText,
    ...props
  }
)
{
  return (
    <button
      type = { type }
      className = { className }
      { ...props }
    >
      { buttonText }
    </button>
  );
}

export default Button;