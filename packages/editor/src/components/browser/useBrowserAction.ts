import { useState } from 'react';

export const useBrowserActions = () => {
  const [onRowDoubleClick, setOnRowDoubleClick] = useState<() => void>(() => {});
  const [searchValue, setSearchValue] = useState<() => string>(() => '');

  const setDoubleClickAction = (action: () => void) => {
    setOnRowDoubleClick(action);
  };

  const setInitSearchValue = (action: () => string) => {
    setSearchValue(action);
  };

  return {
    onRowDoubleClick,
    setDoubleClickAction,
    searchValue,
    setInitSearchValue
  };
};
