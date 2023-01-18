import { createContext } from 'react';

const formContext = createContext();

export const FormProvider = formContext.Provider;

export default formContext;
