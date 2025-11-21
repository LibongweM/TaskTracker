import { ErrorResponse } from "./error-response";
import { SuccessResponse } from "../interfaces/success-response.interface";

export type Result<T> = SuccessResponse<T> | ErrorResponse;
