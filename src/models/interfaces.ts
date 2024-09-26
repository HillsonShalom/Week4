export interface ibeeper {

    id:           number;
    name:         string;
    status:       string;
    created_at:   Date;
    detonated_at: Date     | null;
    location:     location | null;
}

export interface ilocation {
    latitude:  number;
    longitude: number;
}

export type location = {
    latitude:  number;
    longitude: number;
}


export enum Status {
    manufactured,
    assembled,
    shipped,
    deployed,
    detonated
}