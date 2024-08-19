export const errors = {
  VALIDATION: { result: "Validation Error", status: 400 },
  INVALID_PATH_PARAM: { result: "Invalid Path Param Error", status: 400 },
  INVALID_PARAMS: { result: "Invalid Params Error", status: 400 },
  UNAUTHORIZED: { result: "Unauthorized Error", status: 401 },
  FORBIDDEN: { result: "Forbidden Error", status: 403 },
  NOT_FOUND: { result: "Not Found Error", status: 404 },
  METHOD_NOT_ALLOWED: { result: "Method Not Allowed Error", status: 405 },
  CONFLICT: { result: "Conflict Error", status: 409 },
  INTERNAL_SERVER: { result: "Internal Server Error", status: 500 },
  NOT_IMPLEMENTED: { result: "Not Implemented", status: 501 },
};

export class HttpError extends Error {
  result: string = "";
  status: number = 400;
  constructor(key: keyof typeof errors) {
    super(key);
    this.result = errors[key].result;
    this.status = errors[key].status;
  }
  serialize() {
    return { result: this.result, status: this.status };
  }
}

export class ValidationError extends HttpError {
  constructor() {
    super("VALIDATION");
  }
}

export class InvalidPathParamError extends HttpError {
  constructor() {
    super("INVALID_PATH_PARAM");
  }
}

export class InvalidParamsError extends HttpError {
  constructor() {
    super("INVALID_PARAMS");
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    super("UNAUTHORIZED");
  }
}

export class ForbiddenError extends HttpError {
  constructor() {
    super("FORBIDDEN");
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super("NOT_FOUND");
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor() {
    super("METHOD_NOT_ALLOWED");
  }
}

export class ConflictError extends HttpError {
  constructor() {
    super("CONFLICT");
  }
}

export class InternalServerError extends HttpError {
  constructor() {
    super("INTERNAL_SERVER");
  }
}

export class NotImprementedError extends HttpError {
  constructor() {
    super("NOT_IMPLEMENTED");
  }
}


