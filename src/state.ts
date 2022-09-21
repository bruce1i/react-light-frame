import { atomWithStorage } from "jotai/utils";

//! react-light-frame
export const showMenuSidebarAtom = atomWithStorage("showMenuSidebarAtom", true);
export const themeModeAtom = atomWithStorage<"light" | "dark">("themeModeAtom", "light");
// end react-light-frame
