import authReducer from "./auth/reducers";
import backgrondRemovalReducer from "./backgroundRemoval/reducers";
import codeConverterReducer from "./codeConverter/reducers";

const reducers = ({ auth, backgrondRemoval, codeConverter }, action) => ({
  auth: authReducer(auth, action),
  backgrondRemoval: backgrondRemovalReducer(backgrondRemoval, action),
  codeConverter: codeConverterReducer(codeConverter, action),
});

export default reducers;
