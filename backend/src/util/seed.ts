import prisma from "../config/prisma_client";
import { wheel_type } from "./types";

const vehicleTypes = [
    {
      wheelCount: "FOUR_WHEELER" as wheel_type,
      models: [
        { name: 'Sedan', model: ['Dzire', 'Civic', 'Corolla'] },
        { name: 'SUV', model: ['Creta', 'Fortuner', 'XUV700'] },
        { name: 'Hatchback', model: ['Swift', 'Baleno', 'Polo'] },
      ]
    },
    {
      wheelCount: "TWO_WHEELER" as wheel_type,
      models: [
        { name: 'Sport', model: ['Duke 390', 'Ninja 300', 'R15'] },
        { name: 'Cruiser', model: ['Bullet', 'Harley Davidson', 'Interceptor 650'] },
        { name: 'Scooter', model: ['Activa', 'Jupiter', 'Vespa'] },
      ]
    }
];



const seed = async () => {
  try {
    await prisma.vehicleModel.deleteMany({});
    await prisma.vehicleType.deleteMany({});
    for(let data of vehicleTypes){
        for(let type_data of data.models){
            const type=await prisma.vehicleType.create({
                data:{
                    name:type_data.name,
                    wheel:data.wheelCount
                }
            });
            for(let model_data of type_data.model){
                await prisma.vehicleModel.create({
                    data:{
                        vehicletypeid:type.id,
                        modelname:model_data
                    }
                });
            }
        }
    }
    console.log('Database has been seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seed();
