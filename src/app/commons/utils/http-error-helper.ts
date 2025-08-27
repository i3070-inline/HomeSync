const errorHttpRetry = [406, 422, 500, 502, 503, 504];
export const isHttpErrorRetry = (error: number) => errorHttpRetry.includes(error);