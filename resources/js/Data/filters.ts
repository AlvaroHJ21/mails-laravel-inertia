import { Filter } from "@/Interfaces/Filter";

export const filters: Filter[] = [
    {
        attr: "edad_grupo",
        text: "Edad",
        options: [
            {
                text: "jovenes",
                value: "JOVEN",
                active: false,
            },
            {
                text: "adultos",
                value: "ADULTO",
                active: false,
            },
            {
                text: "adultos mayores",
                value: "ADULTO MAYOR",
                active: false,
            },
        ],
        count: 0,
    },
    {
        attr: "sexo",
        text: "Género",

        options: [
            {
                text: "hombres",
                value: "M",
                active: false,
            },
            {
                text: "mujeres",
                value: "F",
                active: false,
            },
        ],
        count: 0,
    },
    {
        attr: "estado_civil",
        text: "Estado Civil",
        options: [
            {
                text: "solteros",
                value: "SOLTERO",
                active: false,
            },
            {
                text: "casados",
                value: "CASADO",
                active: false,
            },
            {
                text: "divorciados",
                value: "DIVORCIADO",
                active: false,
            },
            {
                text: "viudos",
                value: "VIUDO",
                active: false,
            },
        ],
        count: 0,
    },
    {
        attr: "generacion",
        text: "Generaciones",
        options: [
            {
                text: "generación x",
                value: "GENERACIÓN X",
                active: false,
            },
            {
                text: "millennials",
                value: "MILLENNIALS",
                active: false,
            },
            {
                text: "generación z",
                value: "GENERACIÓN Z",
                active: false,
            },
        ],
        count: 0,
    },
    {
        attr: "departamento",
        text: "Departamentos",
        options: [
            {
                text: "Amazonas",
                value: "AMAZONAS",
                active: false,
            },
            {
                text: "ancash",
                value: "ANCASH",
                active: false,
            },
            {
                text: "apurimac",
                value: "APURIMAC",
                active: false,
            },
            {
                text: "arequipa",
                value: "AREQUIPA",
                active: false,
            },
            {
                text: "ayacucho",
                value: "AYACUCHO",
                active: false,
            },
            {
                text: "cajamarca",
                value: "CAJAMARCA",
                active: false,
            },
            {
                text: "callao",
                value: "CALLAO",
                active: false,
            },
            {
                text: "cusco",
                value: "CUSCO",
                active: false,
            },
            {
                text: "huancavelica",
                value: "HUANCAVELICA",
                active: false,
            },
            {
                text: "huanuco",
                value: "HUANUCO",
                active: false,
            },
            {
                text: "ica",
                value: "ICA",
                active: false,
            },
            {
                text: "junin",
                value: "JUNIN",
                active: false,
            },
            {
                text: "la libertad",
                value: "LA LIBERTAD",
                active: false,
            },
            {
                text: "lambayeque",
                value: "LAMBAYEQUE",
                active: false,
            },
            {
                text: "lima",
                value: "LIMA",
                active: false,
            },
            {
                text: "loreto",
                value: "LORETO",
                active: false,
            },
            {
                text: "madre de dios",
                value: "MADRE DE DIOS",
                active: false,
            },
            {
                text: "moquegua",
                value: "MOQUEGUA",
                active: false,
            },
            {
                text: "pasco",
                value: "PASCO",
                active: false,
            },
            {
                text: "piura",
                value: "PIURA",
                active: false,
            },
            {
                text: "puno",
                value: "PUNO",
                active: false,
            },
            {
                text: "san martin",
                value: "SAN MARTIN",
                active: false,
            },
            {
                text: "tacna",
                value: "TACNA",
                active: false,
            },
            {
                text: "tumbes",
                value: "TUMBES",
                active: false,
            },
            {
                text: "ucayali",
                value: "UCAYALI",
                active: false,
            },
        ],
        count: 0,
    },
];
