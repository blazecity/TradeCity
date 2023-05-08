interface TcContextMenuConfigGroup {
    type: "submenu" | "single",
    items: Array<TcContextMenuItem>,
    name: string
}

interface TcContextMenuItem {
    id: string,
    name: string,
    callback: () => void
}

export class TcContextMenuConfig {
    constructor(
        public id: string,
        public elements: { [key: string] : TcContextMenuConfigGroup }
    ) {}
}