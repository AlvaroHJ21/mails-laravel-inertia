import { CampaniaMonthResult } from "@/Interfaces/CampaniaMonthResult";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ChartData,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Datalabels from "chartjs-plugin-datalabels";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    // Title,
    // Legend,
    Tooltip,
    Datalabels
);

interface Props {
    result: CampaniaMonthResult;
    show?: boolean;
}

export default function MainResultCard(props: Props) {
    const { result, show = true } = props;

    const { nCampanias, month, nTotalRecords, nValidRecords, nOpenedRecords } =
        result;

    const labels = [month];

    const data: ChartData<"bar", number[], string> = {
        labels,
        datasets: [
            {
                label: "Total",
                data: [show ? nTotalRecords : 0],
                backgroundColor: "#002d5e",
            },
            {
                label: "Validos",
                data: [show ? nValidRecords : 0],
                backgroundColor: "#304c5d",
            },
            {
                label: "Apertura",
                data: [show ? nOpenedRecords : 0],
                backgroundColor: "#0093ff",
            },
        ],
    };

    return (
        <div className={"transition-opacity "+(show ? "" : "opacity-40")}>
            <div className="px-8 py-1 m-auto mb-4 text-center rounded-full bg-amarillo">
                <span className="font-bold text-azul-marino">{nCampanias}</span>
            </div>
            <div>
                <Bar
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "top" as const,
                            },
                            title: {
                                display: true,
                                text: "Chart.js Bar Chart",
                            },
                            datalabels: {
                                // align: "top",
                                color: "#fff",
                                font: {
                                    weight: "bold",
                                },
                                rotation: -90,
                                formatter: (value) => {
                                    // min height 200px
                                    return value + "K";
                                },
                            },
                        },
                        onClick(event, elements, chart) {
                            console.log("event", event);
                            console.log("elements", elements);
                            console.log("chart", chart);
                        },

                        scales: {
                            y: {
                                display: false,
                                // grid: {
                                //     display: false,
                                // },
                                // ticks: {
                                //     display: true,
                                // },
                                // beginAtZero: true,
                            },
                            x: {
                                display: false,
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    font: {
                                        size: 14,
                                        weight: "bold",
                                    },
                                    backdropColor: "#fff",
                                    padding: 10,
                                },
                            },
                        },
                    }}
                    style={{ width: 100, height: 100 }}
                />
            </div>
            <div className="py-1 my-2 text-center bg-white rounded-md shadow-md">
                <span className="text-sm text-azul-marino">{month}</span>
            </div>
        </div>
    );
}
