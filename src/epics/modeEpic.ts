import { requestSetMode, setMode } from "@/slices/modeSlice";
import { ofType, type Epic } from "redux-observable";
import { debounceTime, map, tap } from "rxjs";

export const debounceSetModeEpic: Epic = (action$: any) => {
  return action$.pipe(
    ofType(requestSetMode.type),
    tap((action) => console.log("debounceSetModeEpic saw:", action)),
    debounceTime(300),
    map((action: ReturnType<typeof requestSetMode>) => setMode(action.payload))
  );
};
