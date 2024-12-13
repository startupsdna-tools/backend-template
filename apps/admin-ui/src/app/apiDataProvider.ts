import {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  HttpError,
  UpdateManyParams,
  UpdateParams,
} from 'react-admin';
import { AxiosError, AxiosInstance } from 'axios';

export class ApiDataProvider implements DataProvider {
  constructor(private api: AxiosInstance) {}

  async getList(
    resource: string,
    { pagination, sort, filter, meta }: GetListParams,
  ) {
    const { data } = await this.api
      .get(`/${resource}`, {
        params: {
          ...pagination,
          sort,
          filter,
          meta,
        },
      })
      .catch(this.handleError);
    return data;
  }

  async getOne(resource: string, { id }: GetOneParams) {
    const { data } = await this.api
      .get(`/${resource}/${id}`)
      .catch(this.handleError);
    return data;
  }

  async getMany(resource: string, { ids }: GetManyParams) {
    const { data } = await this.api
      .get(`/${resource}`, {
        params: {
          ids: ids.join(','),
        },
      })
      .catch(this.handleError);
    return data;
  }

  async getManyReference(
    resource: string,
    { target, id, pagination, sort, filter, meta }: GetManyReferenceParams,
  ) {
    const { data } = await this.api
      .get(`${target}/${id}/${resource}`, {
        params: {
          ...pagination,
          sort,
          filter,
          meta,
        },
      })
      .catch(this.handleError);
    return data;
  }

  async create(resource: string, { data: body }: CreateParams) {
    const { data } = await this.api
      .post(`/${resource}`, body)
      .catch(this.handleError);
    return data;
  }

  async update(resource: string, { id, data: body }: UpdateParams) {
    const { data } = await this.api
      .patch(`/${resource}/${id}`, body)
      .catch(this.handleError);
    return data;
  }

  async updateMany(resource: string, { ids, data: body }: UpdateManyParams) {
    const { data } = await this.api
      .patch(`/${resource}?ids=${ids.join(',')}`, body)
      .catch(this.handleError);
    return data;
  }

  async delete(resource: string, { id }: DeleteParams) {
    const { data } = await this.api
      .delete(`/${resource}/${id}`)
      .catch(this.handleError);
    return data;
  }

  async deleteMany(resource: string, { ids }: DeleteManyParams) {
    const { data } = await this.api
      .delete(`/${resource}?ids=${ids.join(',')}`)
      .catch(this.handleError);
    return data;
  }

  private handleError(error: AxiosError<{ message?: string }>): never {
    if (error.response?.data) {
      throw new HttpError(error.response.data.message, error.response.status);
    }

    throw error;
  }
}
