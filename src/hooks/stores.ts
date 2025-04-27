import {create} from "zustand"
import {persist} from "zustand/middleware"

interface ViewTypeState {
    viewType: "list" | "grid"
    setViewType: (viewType: "list" | "grid") => void
}

export const useViewTypeStore = create<ViewTypeState>()(
    persist(
        (set) => ({
            viewType: "list",
            setViewType: (viewType: "list" | "grid") => set(() => ({viewType: viewType})),
        }),
        {
            name: "viewType",
        },
    ),
)