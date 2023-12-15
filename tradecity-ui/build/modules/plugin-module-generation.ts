import {Rollup} from "vite";
import * as fs from "fs";
import * as util from "util";
import * as ts from "typescript";
import {FunctionalityGroups, ModuleTree} from "./types";

function exportModifier(): ts.ModifierToken<ts.SyntaxKind.ExportKeyword> {
    return ts.factory.createModifier(ts.SyntaxKind.ExportKeyword);
}

function readOnlyModifier():  ts.ModifierToken<ts.SyntaxKind.ReadonlyKeyword> {
    return ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword);
}

function createProperty(name: string, type: string) {
    return ts.factory.createPropertySignature(
        [readOnlyModifier()],
        name,
        undefined,
        ts.factory.createTypeReferenceNode(type)
    )
}

function generateFunctionalityType(): ts.TypeLiteralNode {
    return ts.factory.createTypeLiteralNode([
        createProperty("name", "string"),
        createProperty("path", "string"),
        createProperty("chunk", "string"),
    ]);
}

function generateFunctionalityGroupType(functionalities: {}): ts.TypeLiteralNode {
    const readonlyModifier = readOnlyModifier();

    const funcObject = Object.keys(functionalities).map(functionalityKey => ts.factory.createPropertySignature(
            [readonlyModifier],
            functionalityKey,
            undefined,
            generateFunctionalityType()
        )
    );

    const properties = [
        createProperty("name", "string"),
        createProperty("path", "string"),
        ts.factory.createPropertySignature(
            [readonlyModifier],
            "functionalities",
            undefined,
            ts.factory.createTypeLiteralNode(funcObject)
        )
    ];

    return ts.factory.createTypeLiteralNode(properties);
}

function generateModuleType(functionalityGroups: FunctionalityGroups): ts.TypeLiteralNode {
    const readonlyModifier = readOnlyModifier();

    const groupObject = Object.entries(functionalityGroups).map(([groupKey, group]) => ts.factory.createPropertySignature(
            [readonlyModifier],
            groupKey,
            undefined,
            generateFunctionalityGroupType(group.functionalities)
        )
    );

    const properties = [
        createProperty("name", "string"),
        createProperty("path", "string"),
        createProperty("icon", "string"),
        ts.factory.createPropertySignature(
            [readonlyModifier],
            "functionalityGroups",
            undefined,
            ts.factory.createTypeLiteralNode(groupObject)
        )
    ];

    return ts.factory.createTypeLiteralNode(properties);
}

function generateSchemaType(moduleTree: ModuleTree): string {
    const file = ts.createSourceFile("", "", ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const readonlyModifier = readOnlyModifier();

    const properties = Object.entries(moduleTree).map(([moduleKey, module]) => ts.factory.createPropertySignature(
            [readonlyModifier],
            moduleKey,
            undefined,
            generateModuleType(module.functionalityGroups)
        )
    );

    const t = ts.factory.createInterfaceDeclaration(
        [exportModifier()],
        "ModuleSchema",
        undefined,
        undefined,
        properties
    );

    return printer.printNode(ts.EmitHint.Unspecified, t, file);
}

/**
 * Rollup or rather Vite plugin which generates a module tree object which defines the functionalities of the app.
 */
export default function moduleGeneration(): Rollup.Plugin {
    return {
        name: "module-generation",
        buildStart: {
            sequential: false,
            order: "pre",
            async handler() {
                fs.readFile("../config/modules.json", "utf-8", (error, data) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }

                    fs.readFile("./build/modules/types.ts", "utf-8", (error) => {
                        if (error) {
                            console.error(error);
                            throw error;
                        }

                        const moduleTree: ModuleTree = JSON.parse(data);

                        const moduleSchema = generateSchemaType(moduleTree);

                        const moduleTreeCode = `export const moduleTree: ModuleSchema = ${util.inspect(moduleTree, true, 10)};`;
                        const fileContent = moduleSchema + "\n\n" + moduleTreeCode;

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
        }
    };
}