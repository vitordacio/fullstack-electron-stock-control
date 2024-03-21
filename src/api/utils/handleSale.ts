import { IStockMovement } from '@entities/StockMovement/IStockMovement';

export function mergeStockMovements(
  stockMovements: IStockMovement[],
): IStockMovement[] {
  const result: Record<string, IStockMovement> = {};

  stockMovements.forEach(movement => {
    const existingMovement = result[movement.product_id];

    if (existingMovement) {
      if (existingMovement.price)
        existingMovement.price =
          Number(existingMovement.price) + Number(movement.price);

      if (existingMovement.store_out)
        existingMovement.store_out =
          Number(existingMovement.store_out) + Number(movement.store_out);
    } else {
      result[movement.product_id] = { ...movement };
    }
  });

  const mergedMovements = Object.values(result);

  return mergedMovements;
}
