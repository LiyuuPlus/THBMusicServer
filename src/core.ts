import path from 'path';
import fs from "fs";

/**
 * 应用包体
 */
export type appPackage = {
    /**
     * 包名
     */
    name: string;
    /**
     * 控制器路径
     */
    controller: string;
    /**
     * 实体路径
     */
    entities: string[];
    /**
     * 服务路径
     */
    services: string[];
    /**
     * 适配器路径
     */
    provider: string[];
}

let tmpPackages: appPackage[] = [];

/**
 * 获得所有应用包
 */
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

/**
 * 载入应用包
 * @param packageName 包名
 * @param packagePath 包路径
 * @returns 包体
 */
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
            name: packageName,
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

/**
 * 扫描指定路径下的文件
 * @param pathName 路径
 * @returns 文件列表
 */
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

/**
 * 当前已载入应用包列表
 */
export const appPackages: appPackage[] = [
    ...tmpPackages
]

/**
 * 获得指定包体
 * @param packageName 包名
 * @returns 包体
 */
export const getPackage = (packageName: string): appPackage | undefined => {
    return appPackages.find(o => o.name == packageName);
}