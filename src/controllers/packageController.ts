import { RouterContext } from "../../deps.ts";
import {
  insertPackage,
  getAllPackages,
  getPackageById
} from "../database/models/package.ts";
import { registerPackageService } from "../services/packageService.ts";
import { updateStatusById } from "../database/models/package.ts";

export async function registerPackage(ctx: RouterContext) {
  try {
    const body = await ctx.request.body().value;
    const result = await registerPackageService(body);
    ctx.response.body = result;
    ctx.response.status = 201;
  } catch (error) {
    ctx.response.status = error.name === "ValidationError" ? 400 : 500;
    ctx.response.body = { 
      error: error.message,
      type: error.name // Para identificar el tipo en el frontend
    };
  }
}

export async function getPackages(ctx: RouterContext) {
  try {
    const packages = await getAllPackages();
    ctx.response.body = packages;
    ctx.response.status = 200;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { 
      error: "Error al obtener los paquetes",
      type: "DatabaseError"
    };
  }
}

export async function getPackage(ctx: RouterContext) {
  try {
    const id = ctx.params.id;
    if (!id || isNaN(Number(id))) {
      ctx.response.status = 400;
      ctx.response.body = { 
        error: "ID de paquete inválido",
        type: "ValidationError"
      };
      return;
    }

    const packageData = await getPackageById(Number(id));
    if (!packageData) {
      ctx.response.status = 404;
      ctx.response.body = { 
        error: "Paquete no encontrado",
        type: "NotFoundError"
      };
      return;
    }

    ctx.response.body = packageData;
    ctx.response.status = 200;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { 
      error: "Error al obtener el paquete",
      type: "DatabaseError"
    };
  }
}

// para actualizar el estado de los paquetes pendientes de la lista
export async function updatePackageStatus(ctx: RouterContext) {
  try {
    const id = Number(ctx.params.id);
    const { status } = await ctx.request.body().value;

    if (!["entregado", "retirado"].includes(status)) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Estado inválido para actualización" };
      return;
    }

    const pickup_date = status === "retirado" ? new Date() : null;

    const updated = await updateStatusById(id, status, pickup_date);
    if (!updated) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Paquete no encontrado o no es pendiente" };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Estado actualizado con éxito" };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
}