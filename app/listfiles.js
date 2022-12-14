import fs from "node:fs/promises";
import path from "node:path";

export default async function () {
    // read list files and folder in current directory
    const list = await fs.readdir(process.cwd());

    // function sort array objects of the
    const sortName = (a, b) => {
        const firstName = a.Name.startsWith(".")
            ? a.Name.split("").slice(1).join("").toLowerCase()
            : a.Name.toLowerCase();
        const SecondName = b.Name.startsWith(".")
            ? b.Name.split("").slice(1).join("").toLowerCase()
            : b.Name.toLowerCase();
        if (firstName < SecondName) return -1;
        if (firstName > SecondName) return 1;
        return 0;
    };

    const arrDirs = [];
    const arrFiles = [];

    const promises = list.map ( async (elem) => {
       if ((await fs.stat(path.resolve(elem))).isFile()){
        arrFiles.push({
            Name: `${elem}`,
            Type: "file",
        })
       }else {
        arrDirs.push({
            Name: `${elem}`,
            Type: "directory",
        })
       }
    }
    );
    
    await Promise.all(promises);
    console.table([...arrDirs.sort(sortName), ...arrFiles.sort(sortName)]);
}
