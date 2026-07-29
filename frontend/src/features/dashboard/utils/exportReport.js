export function exportCSV(data){


if(!data || data.length===0){

alert(
"No data available for export"
);

return;

}


const rows=[

Object.keys(data[0]),

...data.map(
item=>Object.values(item)
)

];


const csv =
rows
.map(row=>row.join(","))
.join("\n");



const blob =
new Blob(
[csv],
{
type:"text/csv"
}
);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;

link.download=
"dashboard-report.csv";


link.click();


URL.revokeObjectURL(url);


}