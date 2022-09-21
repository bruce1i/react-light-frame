import { useAtom } from "jotai";
import { RiLightbulbLine, RiLightbulbFlashLine } from "react-icons/ri";

import type { IButtonMenu } from "@/types/menu";
import { themeModeDarkAtom } from "@/state";

function Icon() {
  const [themeModeDark] = useAtom(themeModeDarkAtom);

  return themeModeDark ? <RiLightbulbLine /> : <RiLightbulbFlashLine />;
}

function useClick() {
  const [themeModeDark, setThemeModeDark] = useAtom(themeModeDarkAtom);

  return () => {
    setThemeModeDark(!themeModeDark);
  };
}

const dark: IButtonMenu = {
  kind: "button",
  icon: <Icon />,
  useClick,
};

export default dark;
