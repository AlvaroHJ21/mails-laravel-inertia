export interface PeruDepartment {
    id: string;
    name: string;
}

export interface PeruProvince {
    id: string;
    name: string;
    department_id: string;
}

export interface PeruDistrict {
    id: string;
    name: string;
    province_id: string;
    department_id: string;
}
