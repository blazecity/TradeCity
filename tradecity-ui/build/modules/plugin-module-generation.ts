import {PluginOption} from "vite";
import * as fs from "fs";
import * as util from "util";
import {ModuleSchema} from "./types";

function sourceGeneration(): void {
    fs.readFile("../config/modules.json", "utf-8", (error, data) => {
        if (error) {
            console.error(error);
            throw error;
        }

        fs.readFile("./build/modules/types.ts", "utf-8", (error, typesData) => {
            if (error) {
                console.error(error);
                throw error;
            }

            const moduleTree: ModuleSchema = JSON.parse(data);

            const moduleTreeCode = `export const moduleTree: ModuleSchema = ${util.inspect(moduleTree, true, 10)};`;
            const fileContent = typesData + "\n\n" + moduleTreeCode;

            fs.mkdir("./src/modules", { recursive: true }, error => {
                if (error) {
                    console.error(error);
                    throw error;
                }

                fs.writeFile("./src/modules/index.gen.ts", fileContent, error => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
        });
    });
}

/**
 * Vite plugin which generates a module tree object which defines the functionalities of the app.
 */
export default function moduleGeneration(): PluginOption {
    return {
        name: "module-generation",
        handleHotUpdate({ file }) {
            if (!file.includes("index.gen.ts")) sourceGeneration();
        },
        buildStart: {
            async handler() {
                sourceGeneration();
            }
        }
    };
}