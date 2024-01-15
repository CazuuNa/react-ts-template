import React from 'react'
import playerStore from "./playerStore";

export const stores = {
  playerStore: new playerStore(),
};

const StoresContext = React.createContext(stores);

/**
 * 对外使用的状态管理 hook
 */
const useStores = () => React.useContext(StoresContext);

export default useStores;