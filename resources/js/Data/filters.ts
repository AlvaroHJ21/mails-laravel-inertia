import { FilterGroup } from "@/Interfaces/Filter";

export const filtersGroups: FilterGroup[] = [
    {
        attr: "edad_grupo",
        text: "Edad",
        filters: [
            { id: 1, text: "18-25", value: "JOVEN" },
            { id: 2, text: "26-35", value: "ADULTO" },
            { id: 3, text: "36-45", value: "ADULTO MAYOR" },
        ],
        count: 0,
    },
    {
        attr: "sexo",
        text: "Género",

        filters: [
            {
                id: 1,
                text: "Hombres",
                value: "M",
            },
            {
                id: 2,
                text: "Mujeres",
                value: "F",
            },
        ],
        count: 0,
    },
    {
        attr: "estado_civil",
        text: "Estado Civil",
        filters: [
            {
                id: 1,
                text: "Solteros",
                value: "SOLTERO",
            },
            {
                id: 2,
                text: "Casados",
                value: "CASADO",
            },
            {
                id: 3,
                text: "Divorciados",
                value: "DIVORCIADO",
            },
            {
                id: 4,
                text: "Viudos",
                value: "VIUDO",
            },
        ],
        count: 0,
    },
    {
        attr: "generacion",
        text: "Generaciones",
        filters: [
            {
                id: 1,
                text: "Generación x",
                value: "GENERACIÓN X",
            },
            {
                id: 2,
                text: "Millennials",
                value: "MILLENNIALS",
            },
            {
                id: 3,
                text: "Generación z",
                value: "GENERACIÓN Z",
            },
        ],
        count: 0,
    },
    // {
    //     attr: "departamento",
    //     text: "Departamentos",
    //     filters: [
    //         {
    //             text: "Amazonas",
    //             value: "AMAZONAS",
    //         },
    //         {
    //             text: "Ancash",
    //             value: "ANCASH",
    //         },
    //         {
    //             text: "Apurimac",
    //             value: "APURIMAC",
    //         },
    //         {
    //             text: "Arequipa",
    //             value: "AREQUIPA",
    //         },
    //         {
    //             text: "Ayacucho",
    //             value: "AYACUCHO",
    //         },
    //         {
    //             text: "Cajamarca",
    //             value: "CAJAMARCA",
    //         },
    //         {
    //             text: "Callao",
    //             value: "CALLAO",
    //         },
    //         {
    //             text: "Cusco",
    //             value: "CUSCO",
    //         },
    //         {
    //             text: "Huancavelica",
    //             value: "HUANCAVELICA",
    //         },
    //         {
    //             text: "Huanuco",
    //             value: "HUANUCO",
    //         },
    //         {
    //             text: "Ica",
    //             value: "ICA",
    //         },
    //         {
    //             text: "Junin",
    //             value: "JUNIN",
    //         },
    //         {
    //             text: "La libertad",
    //             value: "LA LIBERTAD",
    //         },
    //         {
    //             text: "Lambayeque",
    //             value: "LAMBAYEQUE",
    //         },
    //         {
    //             text: "Lima",
    //             value: "LIMA",
    //         },
    //         {
    //             text: "Loreto",
    //             value: "LORETO",
    //         },
    //         {
    //             text: "Madre de dios",
    //             value: "MADRE DE DIOS",
    //         },
    //         {
    //             text: "Moquegua",
    //             value: "MOQUEGUA",
    //         },
    //         {
    //             text: "Pasco",
    //             value: "PASCO",
    //         },
    //         {
    //             text: "Piura",
    //             value: "PIURA",
    //         },
    //         {
    //             text: "Puno",
    //             value: "PUNO",
    //         },
    //         {
    //             text: "San martin",
    //             value: "SAN MARTIN",
    //         },
    //         {
    //             text: "Tacna",
    //             value: "TACNA",
    //         },
    //         {
    //             text: "Tumbes",
    //             value: "TUMBES",
    //         },
    //         {
    //             text: "Ucayali",
    //             value: "UCAYALI",
    //         },
    //     ],
    //     count: 0,
    // },
];
