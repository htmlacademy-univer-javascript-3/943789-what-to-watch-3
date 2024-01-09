import { ApiError } from '../api-common/api-error';

export type AuthError = {
  details: {
    property: string;
    value: string;
    messages: string[];
  }[];
} & ApiError;
