'use strict';

module.exports = {
    swagger: "2.0",
    info: {
        description: "",
        version: "0.0.1",
        title: "Swagger Doc",
        termsOfService: "http://swagger.io/terms/",
        contact: {
            email: "egui.mariano@gmail.com"
        },
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    host: "localhost:3000",
    basePath: "/",
    tags: [
        {
            name: "item",
            description: "Información sobre un item",
            externalDocs: {
                description: "Más información",
                url: "localhost:3000"
            }
        }
    ],
    schemes: ["http"],
    paths: {
        "/items/{itemId}": {
            get: {
                tags: ["item"],
                summary: "Buscar item por ID",
                description: "Retorna un item",
                operationId: "getItemById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        name: "itemId",
                        in: "path",
                        description: "ID of pet to return",
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    200: {
                        description: "successful operation",
                        schema: {
                            '$ref': "#/definitions/Item"
                        }
                    },
                    400: {
                        description: "Invalid ID supplied"
                    },
                    404: {
                        description: "Item not found"
                    }
                }
            }
        }
    },
    definitions: {
        "Item": {
            type: "object",
            properties: {
                id: {
                    type: "string"
                },
                title: {
                    type: "string"
                },
                category_id: {
                    type: "string"
                },
                price: {
                    type: "string"
                },
                start_time: {
                    type: "string"
                },
                stop_time: {
                    type: "string"
                },
                children: []
            }
        }
    }
};