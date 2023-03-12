import * as _ from 'lodash';
import { FindManyOptions, ILike } from 'typeorm';

export const queryBuilder = <T>(query): FindManyOptions<T> => {
  const { order, pagination } = query;
  const skip = pagination?.page == 1 ? 0 : pagination?.page;

  const filterQuery = query.filter
    ? Object.keys(query.filter).reduce((acc, elem) => {
        if (elem === 'id') {
          return { ...acc, [elem]: Number(query.filter[elem]) };
        }
        if (elem === 'stages.id') {
          return {
            ...acc,
            stages: { id: Number(query.filter[elem]), is_current: true },
          };
        }
        if (elem.includes('.id')) {
          return _.set({ ...acc }, elem, Number(query.filter[elem]));
        }
        return _.set({ ...acc }, elem, ILike(`%${query.filter[elem]}%`));
      }, {})
    : null;

  const options: FindManyOptions<T> = {
    order: {
      id: 'ASC',
    } as unknown as any,
    skip,
    take: pagination?.per_page,
  };

  if (filterQuery) {
    options.where = filterQuery;
  }

  if (order) {
    options.order = Object.keys(order).reduce((acc, elem) => {
      return _.set({ ...acc }, elem, order[elem]);
    }, {});
  }

  return options;
};
