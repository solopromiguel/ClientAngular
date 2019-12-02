import { Injectable } from '@angular/core';
import docxtemplater from 'docxtemplater';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import { from } from 'rxjs';
const PizZip = require('pizzip');

declare const require: any;



@Injectable({
  providedIn: 'root'
})
export class DocxtemplaterService {
  URL = './assets/tag-example.docx';
 //  URL ='https://github.com/open-xml-templating/docxtemplater/raw/master/examples/tag-example.docx'
// URL = 'file:///D:/myAppFolder/myAppFolder/examples/tag-example.docx';

constructor() { }

loadFileGeneration(URL, callback) { // On click function which triggers docxTemplater function.
  function loadFile(url, callback) {
    JSZipUtils.getBinaryContent(url, callback);
  };

  loadFile(this.URL, function (error, content) {
    if (error) { throw error };
     
   // const zip = new JSZip.loadAsync(content); 
   var zip = new PizZip(content);
    const doc = new docxtemplater().loadZip(zip)
    doc.setData({
      first_name: 'John',
      last_name: 'Doe',
      phone: '0652455478',
      description: 'New Website'      
      
    });
    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render()
    } catch (error) {
      const e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
      }
      console.log(JSON.stringify({ error: e }));
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
      throw error;
    }
 
    const out = doc.getZip().generate({type: "blob"});
   

   saveAs(out, 'output.docx')
    //fs.writeFileSync('output.docx', out);
  })
}
}
