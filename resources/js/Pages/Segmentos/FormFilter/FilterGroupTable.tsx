import { Filter, FilterGroup } from "@/Interfaces/Filter";

interface Props {
    group: FilterGroup;
    isFilterActive: (group: FilterGroup, filter: Filter) => boolean;
    handleToggleActiveFilter: (group: FilterGroup, filter: Filter) => void;
}

export default function FilterGroupTable(props: Props) {
    const { group, handleToggleActiveFilter, isFilterActive } = props;

    return (
        <div className="shadow-md">
            <div className="px-4 py-2 text-white bg-azul-marino">
                Seleccionar {group.text}
            </div>
            <div className="overflow-y-auto max-h-60">
                {group.filters.map((filter) => (
                    <div
                        key={filter.id}
                        className="border-b border-b-celeste-claro"
                    >
                        <button
                            onClick={() =>
                                handleToggleActiveFilter(group, filter)
                            }
                            className={
                                "text-sm px-4 flex items-center w-full justify-between " +
                                (isFilterActive(group, filter) ? "active" : "")
                            }
                        >
                            {filter.text}
                            <div
                                className={
                                    "w-3 h-3 border border-azul-marino rounded-full " +
                                    (isFilterActive(group, filter)
                                        ? "bg-azul-marino"
                                        : "")
                                }
                            ></div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
