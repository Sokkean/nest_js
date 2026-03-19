import { HttpStatus } from "@nestjs/common";

export class PaginationHelper {
  static paginate<T>(
    page: number,
    perPage: number,
    total: number,
    result: T[],
  ) {
    const totalPages = Math.ceil(total / perPage);

    return {
        status:HttpStatus.OK,
        total,
        page,
        perPage,
        totalPages,
        result,
    };
  }
}