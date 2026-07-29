export default function WidgetCard({
title,
children
}){

return (

<div className="h-full bg-white rounded-3xl shadow-lg overflow-hidden">


<div className="widget-drag-handle cursor-move p-4 bg-slate-50 font-bold">

{title}

</div>


<div className="p-5 h-full">

{children}

</div>


</div>

);

}