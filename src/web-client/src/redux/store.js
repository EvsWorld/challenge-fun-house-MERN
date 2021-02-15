import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    preloadedState,
  });

  if (module.hot) {
    module.hot.accept('./reducers/rootReducer', () =>
      store.replaceReducer(rootReducer)
    );
  }

  return store;
}
