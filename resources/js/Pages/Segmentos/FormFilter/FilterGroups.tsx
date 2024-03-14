import { Filter, FilterGroup } from "@/Interfaces/Filter";
import FilterGroupTable from "./FilterGroupTable";

interface Props {
    filterGroups: FilterGroup[];
    isFilterActive: (group: FilterGroup, filter: Filter) => boolean;
    resetFilters: () => void;
    toogleFilter: (group: FilterGroup, filter: Filter) => void;
    toggleSelectAll: (group: FilterGroup) => void;
    isGroupAllSelected: (group: FilterGroup) => boolean;
}

export default function FilterGroups(props: Props) {
    const {
        filterGroups,
        resetFilters,
        isFilterActive,
        toogleFilter,
        toggleSelectAll,
        isGroupAllSelected,
    } = props;
    return (
        <div className="">
            <h2 className="text-xl font-bold" hidden>
                Filtros
            </h2>
            <div className="flex flex-wrap gap-4 mb-8">
                {filterGroups.slice(0, 7).map((group) => (
                    <div key={group.text}>
                        <label className="flex items-center gap-2 w-fit">
                            <h3 className="mb-1 text-xl font-bold select-none text-celeste-claro">
                                {group.text}
                            </h3>
                            <input
                                type="checkbox"
                                className="w-3 h-3 cursor-pointer"
                                checked={isGroupAllSelected(group)}
                                onChange={() => toggleSelectAll(group)}
                            />
                        </label>

                        {group.table ? (
                            <span>
                                <FilterGroupTable
                                    group={group}
                                    isFilterActive={isFilterActive}
                                    toogleFilter={toogleFilter}
                                />
                            </span>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {group.filters.map((filter) => (
                                    <button
                                        key={filter.id}
                                        onClick={() =>
                                            toogleFilter(group, filter)
                                        }
                                        className={
                                            "border shadow-sm text-sm px-3 rounded-md py-0 " +
                                            (isFilterActive(group, filter)
                                                ? "bg-azul-marino text-amarillo"
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
            <div className="flex items-start gap-4 mb-6">
                {filterGroups.slice(7, filterGroups.length).map((group) => (
                    <div key={group.attr}>
                        <label className="flex items-center gap-2 w-fit">
                            <h3 className="mb-1 text-xl font-bold select-none text-celeste-claro">
                                {group.text}
                            </h3>
                            <input
                                type="checkbox"
                                className="w-3 h-3 cursor-pointer"
                                checked={isGroupAllSelected(group)}
                                onChange={() => toggleSelectAll(group)}
                            />
                        </label>
                        <FilterGroupTable
                            group={group}
                            isFilterActive={isFilterActive}
                            toogleFilter={toogleFilter}
                        />
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
