import { location } from "../models/interfaces";

export interface beeperDTO extends location {
    id:           number;
    name:         string;
    status:       string;
    created_at:   Date;
    detonated_at: Date | null;
}

export interface createDto {

}

