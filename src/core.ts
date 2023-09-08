import path from 'path';
import fs from "fs";

export type appPackage = {
    root: string;
    controller: string;
    entities: string[];
    services: string[];
    provider: string[];
}

let tmpPackages: appPackage[] = [];

const getAllPackages = () => {
    const PackagesPath = path.join(__dirname, "packages");
    try {
        const PackagesDir = loadDirFile(PackagesPath);
        for (const PackageDir of PackagesDir) {
            const appPack = loadPackage(PackageDir, path.join(PackagesPath, PackageDir));
            if (appPack) {
                tmpPackages.push(appPack);
            }
        }
    }
    catch {

    }
};

const loadPackage = (packageName: string, packagePath: string): appPackage | null => {
    let pack: appPackage | null = null;
    try {
        let controllerFile = path.join(packagePath, "controller");
        let entitiesFiles = loadDirFile(path.join(packagePath, "entities"));
        let servicesFiles = loadDirFile(path.join(packagePath, "services"));
        let providerFiles = loadDirFile(path.join(packagePath, "provider"));
        pack = {
            root: packageName,
            controller: controllerFile,
            entities: entitiesFiles,
            services: servicesFiles,
            provider: providerFiles
        };
    }
    catch {
        pack = null;
    }
    return pack;
}

const loadDirFile = (pathName: string) => {
    let files: string[] = [];
    try{
        files = fs.readdirSync(pathName, "utf-8");
    }
    catch{
        files = [];
    }
    return files;
}

getAllPackages();
console.log(tmpPackages)

export const appPackages: appPackage[] = [
    ...tmpPackages
]
