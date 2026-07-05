import { PaginationQueryDto } from '../dto/pagination-query.dto';

export const getPagination = (query: PaginationQueryDto) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
  };
};

export const paginationMeta = (page: number, limit: number, total: number) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});
