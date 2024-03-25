import {create, insert, search} from "@orama/orama";
import {ref} from "vue";

export type ComboBoxItem<T> = {
    label: string,
    data: T
};

export type ComboBoxItems<T> = {
    [id: string]: ComboBoxItem<T>;
};

type SchemaTypes = "string" | "number" | "boolean" | "string[]" | "number[]" | "boolean[]";

type Schema<T> = {
    label: "string",
    id: "string",
    data: {
        [K in keyof T]?: SchemaTypes
    }
};

type Document<T> = {
    [K in keyof Schema<T>]: any;
};


export function useSearch<T extends object>(items: ComboBoxItems<T>) {
    const searchDb = ref<(term: string) => Promise<Array<string>>>(() => Promise.resolve([]));
    if (Object.keys(items).length === 0) return searchDb;
    
    const schema: Schema<T> = {
        label: "string",
        id: "string",
        data: {}
    };

    const firstObject = items[0]
    Object.entries(Object.entries(items)[0]).map(([key, value]) => {
        const indexKey = key as keyof T;
        if (Array.isArray(value) && value.length > 0) {
            const firstEntry = value[0];
            const firstEntryType = typeof firstEntry;

            switch (firstEntryType) {
                case "string":
                    schema.data[indexKey] = "string[]"
                    break;
                case "number":
                    schema.data[indexKey] = "number[]";
                    break;
                case "boolean":
                    schema.data[indexKey] = "boolean[]"
                    break;
                default:
                    return;
            }
        }

        switch (typeof value) {
            case "string":
                schema.data[indexKey] = "string";
                break;
            case "number":
                schema.data[indexKey] = "number";
                break;
            case "boolean":
                schema.data[indexKey] = "boolean";
                break;
            default:
                return;
        }
    });

    const setupDb = async () => {
        const db = await create({
            schema
        });

        for (const [id, item] of Object.entries(items)) {
            const dbEntry: Document<T> = {
                label: item.label,
                id: id,
                data: {}
            };
            Object.keys(schema.data).forEach(key => {
                const schemaKey = key as keyof T;
                dbEntry.data[schemaKey] =  item.data[schemaKey];
            });
            await insert(db, dbEntry);

            searchDb.value = async (term: string) => {
                const searchResults = await search(db, { term });
                return searchResults.hits.map(el => el.id);
            }
        }
    }

    setupDb();

    return searchDb;
}