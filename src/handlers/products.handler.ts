import { Context, helpers } from "../../deps.ts";
import { Product } from "../interfaces/Product.ts";

const DB_PRODUCTS: Product[] = [];
DB_PRODUCTS.push({
    id: 1,
    name: "Product 1",
    price: 100,
    thumbnail: "https://via.placeholder.com/150"
});
DB_PRODUCTS.push({
    id: 2,
    name: "Product 2",
    price: 200,
    thumbnail: "https://via.placeholder.com/150"
});
DB_PRODUCTS.push({
    id: 3,
    name: "Product 3",
    price: 300,
    thumbnail: "https://via.placeholder.com/150"
});

export const findAll = (ctx: Context) => {
    try {
        ctx.response.status = 200;
        ctx.response.body = { data: DB_PRODUCTS };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            msg: error
        };
    }
};

export const findProduct = (ctx: Context) => {
    try {
        const { productId } = helpers.getQuery(ctx, { mergeParams: true });
        const product = DB_PRODUCTS.find((p) => p.id === Number(productId));

        if (product) {
            ctx.response.status = 200;
            ctx.response.body = { data: product };
        } else {
            ctx.response.status = 404;
            ctx.response.body = {
                msg: "Producto no encontrado"
            };
        }
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            msg: error
        };
    }
};

export const createProduct = async (ctx: Context) => {
    try {
        const { name, price, thumbnail } = await ctx.request.body().value;
        const product = {
            id: DB_PRODUCTS.length + 1,
            name,
            price,
            thumbnail
        };
        DB_PRODUCTS.push(product);
        ctx.response.status = 201;
        ctx.response.body = { data: product };
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            msg: error
        };
    }
};

export const updateProduct = async (ctx: Context) => {
    try {
        const { productId } = helpers.getQuery(ctx, { mergeParams: true });
        const product = DB_PRODUCTS.find((p) => p.id === Number(productId));

        if (product) {
            const { name, price, thumbnail } = await ctx.request.body().value;
            product.name = name;
            product.price = price;
            product.thumbnail = thumbnail;
            ctx.response.status = 200;
            ctx.response.body = {
                msg: `El producto con el id:${productId} ha sido actualizado`,
                data: product
            };
        } else {
            ctx.response.status = 404;
            ctx.response.body = {
                msg: "Producto no encontrado"
            };
        }
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            msg: error
        };
    }
};

export const deleteProduct = (ctx: Context) => {
    try {
        const { productId } = helpers.getQuery(ctx, { mergeParams: true });
        const product = DB_PRODUCTS.find((p) => p.id === Number(productId));

        if (product) {
            const index = DB_PRODUCTS.indexOf(product);
            DB_PRODUCTS.splice(index, 1);
            ctx.response.status = 200;
            ctx.response.body = {
                msg: `El producto con el id:${productId} ha sido eliminado`
            };
        } else {
            ctx.response.status = 404;
            ctx.response.body = {
                msg: "Producto no encontrado"
            };
        }
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            msg: error
        };
    }
};
