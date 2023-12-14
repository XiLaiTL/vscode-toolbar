const { default: genTypeSchema } = require('fast-typescript-to-jsonschema');
const path = require('path');

/*https://github.com/yunke-yunfly/fast-typescript-to-jsonschema */

const deals = [
    ['../src/model/toolbox.ts', 'Toolbox'],
    ['../src/action/custom/command.ts', 'CommandAction'],
    ['../src/action/custom/find_replace.ts', 'FindReplaceAction'],
    ['../src/action/custom/replace.ts', 'ReplaceAction'],
    ['../src/action/custom/run.ts', 'RunAction'],
];

function generate() {
    for (let [path1, type] of deals) {
        // 目标文件
        const file = path.resolve(__dirname,path1 );

        // 生成数据
        genTypeSchema.genJsonDataFormFile(file);

        // 获得当前文件对应的所有jsonschema数据
        const json = genTypeSchema.genJsonData();

        // 获得具体的某个type的jsonschema数据
        const jsonSchema = genTypeSchema.getJsonSchema(file, type);

        // 返回结果
        console.log(`"${type}": ${JSON.stringify(jsonSchema,undefined,2)}  ` ); 
    }
}

generate();