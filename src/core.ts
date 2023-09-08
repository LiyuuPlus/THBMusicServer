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
        const controllerPath = path.join(packagePath, "controller");
        const entitiesPath = path.join(packagePath, "entities");
        const servicesPath = path.join(packagePath, "services");
        const providerPath = path.join(packagePath, "provider");
        let entitiesFiles = loadDirFile(entitiesPath).map(v => path.join(entitiesPath, v));
        let servicesFiles = loadDirFile(servicesPath).map(v => path.join(servicesPath, v));
        let providerFiles = loadDirFile(providerPath).map(v => path.join(providerPath, v));
        pack = {
            root: packageName,
            controller: controllerPath,
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
    try {
        files = fs.readdirSync(pathName, "utf-8");
    }
    catch {
        files = [];
    }
    return files;
}

getAllPackages();

export const appPackages: appPackage[] = [
    ...tmpPackages
]

export const getPackage = (packageName: string): appPackage | undefined => {
    return appPackages.find(o => o.root == packageName);
}