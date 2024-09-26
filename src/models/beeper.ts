

interface ibeeper extends location {
    name: string;
    status: Status;
    time: Date;

}

interface location {
    longitude: number;
    latitude:  number;
}


enum Status {
    manufactured,
    assembled,
    shipped,
    deployed,
    detonated
}
