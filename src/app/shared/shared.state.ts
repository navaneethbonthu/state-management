export interface SharedState {
  isLoading: boolean;
  errorMassage: string;
}

export const initialState: SharedState = {
  isLoading: false,
  errorMassage: '',
};
