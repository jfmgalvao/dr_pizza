import prismaClient from '../../prisma';

interface UserRequest {
   user_id: string;
}

class DetailUserService {
   async execute({ user_id }: UserRequest) {
      if (!user_id) {
         throw new Error("User id wasn't informed!");
      }

      const user = await prismaClient.user.findFirst({
         where: {
            id: user_id,
         },
         select: {
            id: true,
            name: true,
            email: true,
         },
      });

      return user;
   }
}

export { DetailUserService };
