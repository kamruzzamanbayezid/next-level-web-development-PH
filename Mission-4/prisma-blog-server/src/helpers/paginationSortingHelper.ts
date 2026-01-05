type IOptions = {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  orderBy?: string;
};

type IOptionReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  orderBy: string;
};

const paginationSortingHelper = (options: IOptions): IOptionReturn => {
  const page = Number(options?.page) || 1;
  const limit = Number(options?.limit) || 10;
  const sortBy = options?.sortBy || "createdAt";
  const orderBy = options?.orderBy || "desc";

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    sortBy,
    orderBy,
  };
};

export default paginationSortingHelper;
