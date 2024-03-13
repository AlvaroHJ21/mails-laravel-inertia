import { Filter, FilterGroup } from "@/Interfaces/Filter";

interface Props {
    group: FilterGroup;
    isFilterActive: (group: FilterGroup, filter: Filter) => boolean;
    toogleFilter: (group: FilterGroup, filter: Filter) => void;
}

export default function FilterGroupTable(props: Props) {
    const { group, isFilterActive, toogleFilter } = props;

    return (
        <div className="overflow-hidden shadow-md rounded-t-md">
            <div className="px-4 py-1 text-sm font-semibold text-white bg-horizontal-gradient">
                Seleccionar {group.text}
            </div>
            <div className="overflow-y-auto max-h-40">
                {group.filters.map((filter) => (
                    <div
                        key={filter.id}
                        className="border-b border-b-celeste-claro"
                    >
                        <button
                            onClick={() => toogleFilter(group, filter)}
                            className={
                                "text-xs px-4 py-1 font-semibold flex items-center w-full justify-between " +
                                (isFilterActive(group, filter) ? "active" : "")
                            }
                        >
                            {filter.text}
                            <div className="w-3 h-3 p-px border rounded-full border-azul-marino">
                                <div
                                    className={
                                        "h-full w-full border-azul-marino rounded-full " +
                                        (isFilterActive(group, filter)
                                            ? "bg-azul-marino"
                                            : "")
                                    }
                                ></div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
