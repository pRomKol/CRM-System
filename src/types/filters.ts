export type Filters = 'inWork' | 'all' | 'completed';

export type FiltersList = {
    name: string;
    filterName: Filters;
    length: number;
};