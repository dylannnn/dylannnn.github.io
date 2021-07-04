/**
 * Firebase Functions Response Class
 */
export class FirebaseFunctionsResponse {
  message: string;
  status: RESPONSE_STATUS_CODE;
  details: string;

  /**
   * ResponseSuccess Constructor
   * @param {string} message Message to the user
   * @param {RESPONSE_STATUS_CODE} status Status Code
   * @param {string} details Details to the user
  */
  constructor(
      message: string,
      status: RESPONSE_STATUS_CODE,
      details: string
  ) {
    this.message = message;
    this.status = status;
    this.details = details;
  }
}

export enum RESPONSE_STATUS_CODE {
  OK = 200,
  SERVICE_ERROR = 500,
  NOT_FOUND = 404
}
