import { clearAlert } from "../Slices/alertSlice";

export function DismissAlert ( dispatch )
{
  setTimeout (
    () => {
      dispatch ( clearAlert () );
    }, 3000
  );
}