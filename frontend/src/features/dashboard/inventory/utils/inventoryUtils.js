export const calculateInventory=(product)=>{


const cartons = Number(product.stock || 0);


const packetsPerCarton =

Number(product.packetsPerCarton || 0);



const piecesPerPacket =

Number(product.piecesPerPacket || 0);





const packets =

cartons * packetsPerCarton;



const pieces =

packets * piecesPerPacket;





return {

cartons,

packets,

pieces

};


};