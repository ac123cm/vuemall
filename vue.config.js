module.export = {
    configureWebpack: {
        resolve: {
            alias: {
                assets: "@/assets",
                components: "@/components",
                network: "@/network",
                views: "@/views",
            },
        },
    },
};
