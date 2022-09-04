import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Error } from "./components/Error";
import uuid from 'react-uuid';

/**
 * React Component
 */
export interface EmbedCodeWidgetProps extends BlockAttributes {
  code: string
}

let userHtml = "";
let widgetId = uuid();
console.log(widgetId);


//reads user entered html and pulls out all script tags from them and adds them to array
function scriptElementPull(str){

  let strClone = str;
  let scriptArr = new Array();

  //starter script indexs
  let scriptStartIndex = strClone.indexOf('<script');
  let scriptEndIndex= strClone.indexOf('</script>');

  const parser = new DOMParser();
  //covert html string to html
  //let doc = parser.parseFromString(scriptElement, "text/html");

  //single out what we need aka the html script
  //let htmlScript = doc.getElementsByTagName('script')[0];

  while(scriptStartIndex > -1){
    if(scriptEndIndex !== -1){
      //copy closet script
      let scriptCut = strClone.substring(scriptStartIndex, scriptEndIndex+9);

      scriptScan(scriptCut);

      //cut out pulled script element from html body
      strClone =  strClone.substring(0,scriptStartIndex) + strClone.substring(scriptEndIndex+9);

      //update the indexes
      scriptStartIndex = strClone.indexOf('<script');
      scriptEndIndex= strClone.indexOf('</script>');
    }
  }

 //update user entered html to html without scripts
  userHtml = strClone;
}

//responsible for taking a script of type string and converting it a script of hmtl
function scriptScan(str){
  //Parser used to convert script of type string into html
  const parser = new DOMParser();
  
  //convert script of type string into html
  let doc = parser.parseFromString(str, "text/html");

  //single just script needed
  let htmlScript = doc.getElementsByTagName('script')[0];

  //for some reason we cannot just had the converted scripted element to the head of our document.
  //we must create a brand new script and copy the attributes over.

  //create new script element
  const newScript = document.createElement('script');

  //list of all possible attributes
  const scriptElementAttributes = ['src', 'type', 'async', 'crossorigin', 'defer', 'fetchpriority', 'integrity', 'nomodule', 'nonce', 'referrerpolicy', 'innerHTML'];

  //loop through list to see if any of the attributes appear
  scriptElementAttributes.forEach(attribute =>{
    //if attribute is available, copy that attribute to the newScript
    if(htmlScript[attribute]!==undefined){
      newScript[attribute] = htmlScript[attribute];
    }
  });

  //const uniqueDiv = document.createElement('div');
  //uniqueDiv.id = `embed-code-widget-${widgetId}`;
  //document.getElementById("embed-code-widget")[0].appendChild(uniqueDiv);

  //grab root element, embed-code-wodget
  const embedCodeWidgetTags = document.getElementsByTagName("embed-code-widget");  

  //scan the list of embed-code-widgets to see which one does not have a div with a unique id for it class name and attach one
  //we are adding a unique identify in order to find the correct embed-code-widget tag to append our script and elements
  //if a user is using mutiple widgets we need to find where to append
  const allEmbedCodeWidgets = document.getElementsByTagName("embed-code-widget");
  for(const widget of allEmbedCodeWidgets){
    if(widget.getElementsByClassName(`embed-code-widget-${widgetId}`).length ==0){
      const uniqueDiv = document.createElement('div');
      uniqueDiv.className = `embed-code-widget-${widgetId}`;
      widget.appendChild(uniqueDiv);

      //append script to unique id div
      document.getElementsByClassName(`embed-code-widget-${widgetId}`)[0].appendChild(newScript);
    }
  }
}


export const EmbedCodeWidget = ({ code }: EmbedCodeWidgetProps): ReactElement => {
  
  
  if(code!==undefined){
    
    return <div className={`embed-code-widget`}>
        {scriptElementPull(code)}
        {ReactHtmlParser(userHtml)}
        
      </div>
  }
  else{
    return <div className={`embed-code-widget`}>
  </div>
  }
  
};