/* eslint-disable prettier/prettier */
export interface PaginationResult<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export function paginate<T>(
  items: T[],
  totalItems: number,
  currentPage: number,
  limit: number,
): PaginationResult<T> {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: items,
    totalItems,
    totalPages,
    currentPage,
    limit,
  };
}
