import React, { useState } from "react";

const COMPONENTS = [
  { key: "cpu", name: "Processor" },
  { key: "motherboard", name: "Motherboard" },
  { key: "ram", name: "RAM" },
  { key: "storage", name: "Storage" },
  { key: "gpu", name: "Graphics Card" },
  { key: "psu", name: "Power Supply" },
];

const SAMPLE_PRODUCTS = {
  cpu: { name: "Intel Core i5 13400F", price: 24500 },
  ram: { name: "Corsair Vengeance 16GB", price: 5200 },
  storage: { name: "Samsung 1TB NVMe SSD", price: 10500 },
};

const PCBuilder = () => {
  const [build, setBuild] = useState({});

  const totalPrice = Object.values(build).reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    // <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    //   {/* Header */}
    //   <div className="max-w-6xl mx-auto mb-10">
    //     <h1 className="text-3xl font-bold text-gray-900">
    //       Build Your Custom PC
    //     </h1>
    //     <p className="text-gray-500 mt-2">
    //       Select components step by step and create your perfect build
    //     </p>
    //   </div>

    //   <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
    //     {/* Component Selector */}
    //     <div className="lg:col-span-2 space-y-4">
    //       {COMPONENTS.map((c) => {
    //         const selected = build[c.key];

    //         return (
    //           <div
    //             key={c.key}
    //             className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex items-center justify-between"
    //           >
    //             <div>
    //               <h3 className="font-semibold text-lg text-gray-800">
    //                 {c.name}
    //               </h3>

    //               {selected ? (
    //                 <p className="text-sm text-gray-500 mt-1">
    //                   {selected.name}
    //                 </p>
    //               ) : (
    //                 <p className="text-sm text-red-500 mt-1">
    //                   Not Selected
    //                 </p>
    //               )}
    //             </div>

    //             <div className="flex items-center gap-4">
    //               {selected && (
    //                 <span className="font-semibold text-gray-700">
    //                   ৳ {selected.price}
    //                 </span>
    //               )}

    //               <button
    //                 onClick={() =>
    //                   setBuild((prev) => ({
    //                     ...prev,
    //                     [c.key]: SAMPLE_PRODUCTS[c.key] || {
    //                       name: "Sample Product",
    //                       price: 10000,
    //                     },
    //                   }))
    //                 }
    //                 className="px-5 py-2 rounded-xl bg-black text-white text-sm hover:scale-105 transition"
    //               >
    //                 {selected ? "Change" : "Select"}
    //               </button>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>

    //     {/* Summary */}
    //     <aside className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-6">
    //       <h3 className="font-semibold text-lg mb-4">Build Summary</h3>

    //       <div className="space-y-3 text-sm">
    //         {COMPONENTS.map((c) => (
    //           <div key={c.key} className="flex justify-between">
    //             <span className="text-gray-500">{c.name}</span>
    //             <span className="font-medium">
    //               {build[c.key] ? `৳ ${build[c.key].price}` : "—"}
    //             </span>
    //           </div>
    //         ))}
    //       </div>

    //       <div className="border-t my-4" />

    //       <div className="flex justify-between text-lg font-bold">
    //         <span>Total</span>
    //         <span>৳ {totalPrice}</span>
    //       </div>

    //       <button
    //         disabled={Object.keys(build).length < COMPONENTS.length}
    //         className={`mt-6 w-full py-3 rounded-xl font-medium transition ${
    //           Object.keys(build).length < COMPONENTS.length
    //             ? "bg-gray-300 cursor-not-allowed"
    //             : "bg-blue-600 text-white hover:bg-blue-700"
    //         }`}
    //       >
    //         Complete Build
    //       </button>
    //     </aside>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mt-10">Coming Soon</h1>
    </div>
  );
};

export default PCBuilder;
