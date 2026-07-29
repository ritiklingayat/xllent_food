import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const ExportDashboard=()=>{


const exportPDF=async()=>{


const element=
document.getElementById(
"executive-dashboard"
);



const canvas=
await html2canvas(element);



const img=
canvas.toDataURL(
"image/png"
);



const pdf=
new jsPDF(
"landscape"
);


pdf.addImage(
img,
"PNG",
10,
10,
280,
150
);


pdf.save(
"executive-dashboard.pdf"
);


};



return (

<button

onClick={exportPDF}

className="

px-4

py-2

rounded-xl

bg-gradient-to-r

from-blue-600

to-purple-600

text-white

"

>

Export PDF

</button>


);


};


export default ExportDashboard;