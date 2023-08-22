import prismaClient from '../../prisma';

interface OrderRequest {
   order_id: string;
}

class DetailOrderService {
   async execute({ order_id }: OrderRequest) {
      const detail = await prismaClient.item.findFirst({
         where: {
            order_id: order_id,
         },
         include: {
            product: true,
            order: true,
         },
      });

      return detail;
   }
}

export { DetailOrderService };
