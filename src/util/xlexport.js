// var wb = XLSX.utils.book_new();
//         wb.Props = {
//                 Title: "SheetJS Tutorial",
//                 Subject: "Test",
//                 Author: "Red Stapler",
//                 CreatedDate: new Date(2017,12,19)
//         };
        
//         wb.SheetNames.push("Test Sheet");
//         var ws_data = [['hello' , 'world']];
//         var ws = XLSX.utils.aoa_to_sheet(ws_data);
//         wb.Sheets["Test Sheet"] = ws;
//         var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
//         function s2ab(s) {
  
//                 var buf = new ArrayBuffer(s.length);
//                 var view = new Uint8Array(buf);
//                 for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
//                 return buf;
                
//         }
//         $("#button-a").click(function(){
//                 saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');
//         });

// export function exportCSVFile(headers, items, fileTitle) {
//         if (headers) {
//                 items.unshift(headers)
//         }
        
//         // Convert Object to JSON
//         var jsonObject = JSON.stringify(items)
        
//         var csv = convertToCSV(jsonObject)
        
//         var exportedFilenmae = fileTitle + '.csv' || 'export.csv'
        
//         var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
//         if (navigator.msSaveBlob) { // IE 10+
//                 navigator.msSaveBlob(blob, exportedFilenmae)
//         } else {
//                 var link = document.createElement('a')
//                 if (link.download !== undefined) { // feature detection
//                 // Browsers that support HTML5 download attribute
//                 var url = URL.createObjectURL(blob)
//                 link.setAttribute('href', url)
//                 link.setAttribute('download', exportedFilenmae)
//                 link.style.visibility = 'hidden'
//                 document.body.appendChild(link)
//                 link.click()
//                 document.body.removeChild(link)
//                 }
//         }
//         }