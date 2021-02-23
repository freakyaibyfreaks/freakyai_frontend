import codeConverterReducer from './codeConverter/reducers';

const reducers = ({ codeConverter }, action) => ({
  codeConverter: codeConverterReducer(codeConverter, action),
});

export default reducers;
