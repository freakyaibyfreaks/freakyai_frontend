import backgrondRemovalReducer from './backgroundRemoval/reducers';
import codeConverterReducer from './codeConverter/reducers';

const reducers = ({ backgrondRemoval, codeConverter }, action) => ({
  backgrondRemoval: backgrondRemovalReducer(backgrondRemoval, action),
  codeConverter: codeConverterReducer(codeConverter, action),
});

export default reducers;
