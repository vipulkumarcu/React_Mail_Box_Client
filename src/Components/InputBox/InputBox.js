import { forwardRef, useId } from 'react';

function InputBox (
  {
    className = "w-full px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-md focus:outline-none focus:ring focus:border-indigo-500",
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
            className = "block text-indigo-600 font-medium mb-1"
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