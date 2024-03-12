import { Filter, FilterGroup } from "@/Interfaces/Filter";
import FilterGroupTable from "./FilterGroupTable";
import { UseFilter } from "./useFilter";

interface Props {
    filterGroups: UseFilter[];
    resetFilters: () => void;
}

export default function FilterGroups(props: Props) {
    const { filterGroups, resetFilters } = props;
    return (
        <div>
            <h2 className="text-xl font-bold" hidden>
                Filtros
            </h2>
            <div className="flex flex-wrap gap-4 mb-8">
                {filterGroups.map((group) => (
                    <div key={group.text}>
                        <h3 className="mb-2 text-lg font-bold text-celeste-claro">
                            {group.text}
                        </h3>

                        {group.table ? (
                            <span>
                                <FilterGroupTable group={group} />
                            </span>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {group.allFilter.map((filter) => (
                                    <button
                                        key={filter.id}
                                        onClick={() =>
                                            group.handleToggleActiveFilter(
                                                filter
                                            )
                                        }
                                        className={
                                            "capitalize btn btn-sm btn-outline py-0 " +
                                            (group.isActiveFilter(filter)
                                                ? "active"
                                                : "")
                                        }
                                    >
                                        {filter.text}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={resetFilters}
                className="m-auto text-white btn bg-celeste-claro"
            >
                Reestablecer filtros
            </button>
        </div>
    );
}
