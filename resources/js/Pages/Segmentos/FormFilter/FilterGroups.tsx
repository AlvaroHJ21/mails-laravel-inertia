import { Filter, FilterGroup } from "@/Interfaces/Filter";
import FilterGroupTable from "./FilterGroupTable";

interface Props {
    allfiltersGroups: FilterGroup[];
    handleToggleActiveFilter: (group: FilterGroup, filter: Filter) => void;
    isFilterActive: (group: FilterGroup, filter: Filter) => boolean;
    resetFilters: () => void;
}

export default function FilterGroups(props: Props) {
    const {
        allfiltersGroups,
        handleToggleActiveFilter,
        isFilterActive,
        resetFilters,
    } = props;
    return (
        <div>
            <h2 className="text-xl font-bold" hidden>
                Filtros
            </h2>
            <div className="flex flex-wrap gap-4 mb-8">
                {allfiltersGroups.map((group) => (
                    <div key={group.text}>
                        <h3 className="mb-2 text-lg font-bold text-celeste-claro">
                            {group.text}
                        </h3>

                        {group.table ? (
                            <FilterGroupTable
                                group={group}
                                handleToggleActiveFilter={
                                    handleToggleActiveFilter
                                }
                                isFilterActive={isFilterActive}
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {group.filters.map((filter) => (
                                    <button
                                        key={filter.id}
                                        onClick={() =>
                                            handleToggleActiveFilter(
                                                group,
                                                filter
                                            )
                                        }
                                        className={
                                            "capitalize btn btn-sm btn-outline py-0 " +
                                            (isFilterActive(group, filter)
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
