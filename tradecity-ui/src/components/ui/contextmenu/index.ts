type ContextMenuAction = () => void;

type ContextMenu = Array<ContextMenuItem>;

type ContextMenuItem = {
    id: string;
    label: string;
    icon?: string;
    action?: ContextMenuAction;
    contextMenuItems?: Array<ContextMenuItem>;
}