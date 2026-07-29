export const calculatePricing=(product)=>{


const packets =

Number(
product.packetsPerCarton || 0
);



const pieces =

Number(
product.piecesPerPacket || 0
);



return {


totalPacketsPerCarton:

packets,



totalPiecesPerCarton:

packets * pieces,



superStockist:

Number(
product.superStockistPrice || 0
),



distributor:

Number(
product.distributorPrice || 0
),



shop:

Number(
product.shopPrice || 0
)



};


};