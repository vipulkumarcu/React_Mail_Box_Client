import { forwardRef, useId } from 'react';

function InputBox (
  {
    className = "shadow appearance-none bg-slate-100 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    placeholder,
    type = "text",
    label,
    ...props
  }
  , ref
)
{
  const id = useId ();

  return (
    <div className = "mb-4" >

      {
        label &&
        (
          <label
            htmlFor = { id }
            className = "block text-gray-700 text-sm font-bold mb-2"
          >
            { label }
          </label>
        )
      }

      <input
        id = { id }
        ref = { ref }
        type = { type }
        placeholder = { placeholder }
        className = { className }
        { ...props }
      />

    </div>
  );
}

export default forwardRef ( InputBox );