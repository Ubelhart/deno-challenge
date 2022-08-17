import { Router } from "../../deps.ts";
import {
    findAll,
    findProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from "../handlers/products.handler.ts";

export const router = new Router()
    .get("/api/productos", findAll)
    .get("/api/productos/:productId", findProduct)
    .post("/api/productos", createProduct)
    .put("/api/productos/:productId", updateProduct)
    .delete("/api/productos/:productId", deleteProduct);
