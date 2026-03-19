export class ResponseHelper {

    static Pagination(page:number, limit:number, total:number, data:any) {
        return {
            page: page,
            limit: limit,
            total: total,
            data: data,
        };
    }

    static success(data: any) {
        return {
            status: 200,
            message: 'Success',
            result: data,
        };
    }

    static created(data: any) {
        return {
            status: 201,
            message: 'Create Successfully',
            result: data,
        };
    }

    static updated(data: any) {
        return {
            status: 200,
            message: 'Update Successfully',
            result: data,
        };
    }

    static deleted(data: any) {
        return {
            status: 200,
            message: 'Delete Successfully',
            result: data,
        };
    }

    static error(data: any) {
        return {
            status: 500,
            message: 'Error',
            result: data,
        };
    }

    static notFound(data: any) {
        return {
            status: 404,
            message: 'Not Found',
            result: data,
        };
    }

    static unAuthorized(data: any) {
        return {
            status: 401,
            message: 'Unauthorized',
            result: data,
        };
    }

    static badRequest(data: any) {
        return {
            status: 400,
            message: 'Bad Request',
            result: data,
        };
    }

    static conflict(data: any) {
        return {
            status: 409,
            message: 'Conflict',
            result: data,
        };
    }

    static internalServerError(data: any) {
        return {
            status: 500,
            message: 'Internal Server Error',
            result: data,
        };
    }           
}