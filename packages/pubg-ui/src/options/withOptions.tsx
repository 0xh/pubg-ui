import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RootState, Dispatch } from '../redux';
import { getOptions } from '../redux/selectors';
import {
  OptionState,
  setRegion,
  setSquadSize,
  setPerspective
} from '../redux/option';

export interface StateProps {
  option: OptionState;
}

export interface DispatchProps {
  setOption: {
    setRegion: typeof setRegion;
    setSquadSize: typeof setSquadSize;
    setPerspective: typeof setPerspective;
  }
}

export type InjectedProps = StateProps & DispatchProps;

const mapStateToProps = (state: RootState): StateProps => ({
  option: getOptions(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setOption: bindActionCreators({
    setRegion,
    setSquadSize,
    setPerspective
  }, dispatch)
});

export const withOptions = <P extends {}>(Component: React.ComponentType<P & InjectedProps>) => (
  connect(mapStateToProps, mapDispatchToProps)(Component)
);
