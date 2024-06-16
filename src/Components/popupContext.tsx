import { createContext, ReactElement, Dispatch, SetStateAction } from 'react';

type PopupContextType = {
  popup: ReactElement<any, any>[] | null;
  setPopup: Dispatch<SetStateAction<ReactElement<any, any>[] | null>>;
};

const popupContext = createContext<PopupContextType>({
  popup: null,
  setPopup: () => {},
});

export default popupContext;