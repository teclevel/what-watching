import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getDisabledFormStatus = (state: State): boolean => state[NameSpace.Form].isFormDisabled;
