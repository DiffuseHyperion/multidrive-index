import {create} from "zustand"
import {persist} from "zustand/middleware"

interface viewTypeState {
    viewType: "list" | "grid"
    setViewType: (viewType: "list" | "grid") => void
}

export const useViewTypeStore = create<viewTypeState>()(
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