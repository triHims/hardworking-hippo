export interface ErrorOb {
    type: string;
    status?: number;
    statusMessage: string;
    data?: string;
}
export let processError = (error: any) => {
    if (error.response) {
        return {
            type: "error",
            status: error.response.status,
            statusMessage: error.response.statusText,
            data: JSON.stringify(error.response.data),
        } as ErrorOb;
    } else {
        return {
            type: "error",
            statusMessage: error.message,
        } as ErrorOb;
    }
};
export const BACKEND_URL=process.env.BACKEND_URL
