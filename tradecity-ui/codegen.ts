import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: '../config/schema.graphql',
    documents: ['src/**/*.vue'],
    ignoreNoDocuments: true,
    generates: {
        './src/gql/': {
            preset: 'client',
            config: {
                useTypeImports: true
            }
        }
    }
}

export default config