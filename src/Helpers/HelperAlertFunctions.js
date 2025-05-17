import { enqueueAlert } from "../Features/AlertSlice";

export function showSuccessMessage ( dispatch, message, duration )
{
  dispatch (
    enqueueAlert (
      {
        type: "success",
        message: message,
        duration: duration || 3000,
      }
    )
  );
}

export function showErrorMessage ( dispatch, message, duration )
{
  dispatch (
    enqueueAlert (
      {
        type: "error",
        message: message,
        duration: duration || 3000,
      }
    )
  );
}

export function showInfoMessage ( dispatch, message, duration )
{
  dispatch (
    enqueueAlert (
      {
        type: "info",
        message: message,
        duration: duration || 3000,
      }
    )
  );
}