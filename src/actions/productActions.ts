//@ts-nocheck
"use server";

import { sql } from "kysely";
import { DEFAULT_PAGE_SIZE } from "../../constant";
import { db } from "../../db";
import { InsertProducts, UpdateProducts } from "@/types";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/utils/authOptions";
import { cache } from "react";

export async function getProducts(
  pageNo = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  sortBy = "",
  filters = {}
) {
  try {
    let dbQuery = db.selectFrom("products").selectAll("products");

    // Apply sorting
    if (sortBy && typeof sortBy === "string" && sortBy.includes("-")) {
      const [column, direction] = sortBy.split("-");
      const validColumns = ["price", "created_at", "rating"];
      const validDirections = ["asc", "desc"];

      if (validColumns.includes(column) && validDirections.includes(direction)) {
        dbQuery = dbQuery.orderBy(column, direction);
      }
    }

    
    if (filters.brand) {
      const brandIds = Array.isArray(filters.brand)
        ? filters.brand.map(Number)
        : [Number(filters.brand)];
      dbQuery = dbQuery.where("brand_id", "in", brandIds);
    }

    if (filters.gender) {
      const genders = Array.isArray(filters.gender)
        ? filters.gender
        : [filters.gender];
      dbQuery = dbQuery.where("gender", "in", genders);
    }

    if (filters.occasion) {
      const occasions = Array.isArray(filters.occasion)
        ? filters.occasion
        : [filters.occasion];
      dbQuery = dbQuery.where("occasion", "in", occasions);
    }

    if (filters.discount) {
      const discountThreshold = Number(filters.discount);
      if (!isNaN(discountThreshold)) {
        dbQuery = dbQuery.where("discount", ">=", discountThreshold);
      }
    }

    // Filter by category through product_categories table (needs join)
    if (filters.category) {
      const categoryIds = Array.isArray(filters.category)
        ? filters.category.map(Number)
        : [Number(filters.category)];

      dbQuery = dbQuery
        .innerJoin("product_categories", "products.id", "product_categories.product_id")
        .where("product_categories.category_id", "in", categoryIds)
        .distinct(); // Prevent duplicates
    }

    // Get count
    const { count } = await db
      .selectFrom("products")
      .select(sql`COUNT(*)`.as("count"))
      .executeTakeFirst();

    const lastPage = Math.ceil(Number(count?.count || 0) / pageSize);

    const products = await dbQuery
      .offset((pageNo - 1) * pageSize)
      .limit(pageSize)
      .execute();

    const numOfResultsOnCurPage = products.length;

    return {
      products,
      count: Number(count?.count || 0),
      lastPage,
      numOfResultsOnCurPage,
    };
  } catch (error) {
    throw error;
  }
}



export const getProduct = cache(async function getProduct(productId: number) {
  // console.log("run");
  try {
    const product = await db
      .selectFrom("products")
      .selectAll()
      .where("id", "=", productId)
      .execute();

    return product;
  } catch (error) {
    return { error: "Could not find the product" };
  }
});

async function enableForeignKeyChecks() {
  await sql`SET foreign_key_checks = 1`.execute(db);
}

async function disableForeignKeyChecks() {
  await sql`SET foreign_key_checks = 0`.execute(db);
}

export async function deleteProduct(productId: number) {
  try {
    await disableForeignKeyChecks();
    await db
      .deleteFrom("product_categories")
      .where("product_categories.product_id", "=", productId)
      .execute();
    await db
      .deleteFrom("reviews")
      .where("reviews.product_id", "=", productId)
      .execute();

    await db
      .deleteFrom("comments")
      .where("comments.product_id", "=", productId)
      .execute();

    await db.deleteFrom("products").where("id", "=", productId).execute();

    await enableForeignKeyChecks();
    revalidatePath("/products");
    return { message: "success" };
  } catch (error) {
    return { error: "Something went wrong, Cannot delete the product" };
  }
}

export async function MapBrandIdsToName(brandsId) {
  const brandsMap = new Map();
  try {
    for (let i = 0; i < brandsId.length; i++) {
      const brandId = brandsId.at(i);
      const brand = await db
        .selectFrom("brands")
        .select("name")
        .where("id", "=", +brandId)
        .executeTakeFirst();
      brandsMap.set(brandId, brand?.name);
    }
    return brandsMap;
  } catch (error) {
    throw error;
  }
}

export async function getAllProductCategories(products: any) {
  try {
    const productsId = products.map((product) => product.id);
    const categoriesMap = new Map();

    for (let i = 0; i < productsId.length; i++) {
      const productId = productsId.at(i);
      const categories = await db
        .selectFrom("product_categories")
        .innerJoin(
          "categories",
          "categories.id",
          "product_categories.category_id"
        )
        .select("categories.name")
        .where("product_categories.product_id", "=", productId)
        .execute();
      categoriesMap.set(productId, categories);
    }
    return categoriesMap;
  } catch (error) {
    throw error;
  }
}

export async function getProductCategories(productId: number) {
  try {
    const categories = await db
      .selectFrom("product_categories")
      .innerJoin(
        "categories",
        "categories.id",
        "product_categories.category_id"
      )
      .select(["categories.id", "categories.name"])
      .where("product_categories.product_id", "=", productId)
      .execute();

    return categories;
  } catch (error) {
    throw error;
  }
}


