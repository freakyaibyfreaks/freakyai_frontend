import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { USER_POOL_ID, CLIENT_ID } from "../../config/config";

const userPoolId = USER_POOL_ID;
const clientId = CLIENT_ID;

const poolData = {
  UserPoolId: userPoolId,
  ClientId: clientId,
};

export const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
