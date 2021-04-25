import axios, { AxiosResponse } from 'axios';
import config from '../config';

export type JobsParams = {
    query: {
        page: Number,
        description?: String,
        city?: String
    }
}

export type JobDTO = {
    id: string;
    type: string;
    url: string;
    created_at: string;
    company: string;
    company_url?: string;
    location: string;
    title: string;
    description: string;
    how_to_apply: string;
    company_logo?: string;
}

export type SearchJobsResponseData = {
    page: string,
    items: Array<JobDTO>,
    pageSize: string,
}

export async function searchJobs(params: JobsParams): Promise<AxiosResponse> {
    const searchParams = new URLSearchParams();
    Object.entries(params.query).forEach(([key, value]) => {
        if (key && value) {
            searchParams.append(key, value as string);
        }
    });
    const queryString = searchParams.toString();
    return axios.get(`${config.jobsApiUrl}?${queryString}`);

}