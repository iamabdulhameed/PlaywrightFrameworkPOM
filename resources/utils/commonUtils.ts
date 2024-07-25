import fs from "node:fs";

export const getJsonData = (fileName: string) => {
    const fileContent = fs.readFileSync(`${process.cwd()}/resources/data/${fileName}`, 'utf8');
    return JSON.parse(fileContent);
}