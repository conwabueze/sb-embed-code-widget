/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Helmet } from "react-helmet";

import { Error } from "./components/Error";
//import { title } from "process";

/**
 * React Component
 */
export interface AAWidgetProps extends BlockAttributes {
  title: string
}

let userHtml = "";

//reads user entered html and pulls out all script tags from them and adds them to array
function scriptElementPull(str){

  let strClone = str;
  let scriptArr = new Array();

  //starter script indexs
  let scriptStartIndex = strClone.indexOf('<script');
  let scriptEndIndex= strClone.indexOf('</script>');

  while(scriptStartIndex > -1){
    if(scriptEndIndex !== -1){
      //copy closet script
      let scriptCut = strClone.substring(scriptStartIndex, scriptEndIndex+9);
      //push script element into arr
      scriptArr.push(scriptCut);

      //cut out pulled script element from html body
      strClone =  strClone.substring(0,scriptStartIndex) + strClone.substring(scriptEndIndex+9);

      //update the indexes
      scriptStartIndex = strClone.indexOf('<script');
      scriptEndIndex= strClone.indexOf('</script>');
    }
  }

 //update user entered html to html without scripts
  userHtml = strClone;
  return scriptArr;
}

let testHtml = '<script src="test1" defer></script><div className="elfsight-app-027ee1e8-a89e-44a9-b819-3b94317b48b7"></div><script src="test2" defer></script><script src="https://apps.elfsight.com/p/platform.js" defer></script><div className="elfsight-app-027ee1e8-a89e-44a9-b819-3b94317b48b7"></div>';
//scriptElementPull(testHtml);
//console.log(document.head.innerHTML);
//takes all elements and generate script elements with correct fields. Finally it appends to the head of the document
function scriptHeadAppend(arr){
  //initials DOMParser
  const parser = new DOMParser();

  //list of possible script element values
  //according to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
  const scriptElementAttributes = ['src', 'type', 'async', 'crossorigin', 'defer', 'fetchpriority', 'integrity', 'nomodule', 'nonce', 'referrerpolicy', ]
  


  //loop though each script string and convert string to actual html and append to document body
  arr.forEach(scriptElement => {

    //covert html string to html
    let doc = parser.parseFromString(scriptElement, "text/html");

    //single out what we need aka the html script
    let htmlScript = doc.getElementsByTagName('script')[0];

    //append to document head
    document.getElementsByTagName('head')[0].appendChild(htmlScript);
    
  });

  console.log(document.head.innerHTML);
}

const fakehtml='<script src="https://apps.elfsight.com/p/platform.js" defer></script><div class="elfsight-app-bf37f02e-a1d3-42d3-855f-b9d2efa16b45"></div>'
function go(userText){
  scriptHeadAppend(scriptElementPull(fakehtml));
  console.log(userHtml);
  return ReactHtmlParser(userHtml);
}

let rr = document.createElement('script');
rr.id = 'https://cdn.logwork.com/widget/text.js';
document.getElementsByTagName('body')[0].appendChild(rr);
console.log(document.head.innerHTML);

export const AAWidget = ({ title }: AAWidgetProps): ReactElement => {
  return <div className="aa-widget">
    
    <a href="https://logwork.com/current-time-in-brooklyn-united-states-ohio" className="clock-widget-text" data-timezone="America/New_York" data-language="en">Brooklyn, United States</a>
  </div>
};





/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Helmet } from "react-helmet";

import { Error } from "./components/Error";

/**
 * React Component
 */
export interface AAWidgetProps extends BlockAttributes {
  title: string
}

function scriptTagPull(str){

}

function stringToHtml() {
  /*
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  let nodes = doc.body.childNodes;

  const pat = document.body;
  console.log(nodes);
  for(let node of nodes){
    pat.appendChild(node.cloneNode());
  }
  
  console.log(typeof doc.body.firstChild);
  console.log(doc.body.firstChild);
  
  return doc.body.firstChild;
 
  console.log(ReactHtmlParser("<h1>hello</h1>"))
   */
  const script = document.createElement('script');
  //script.type = "text/javascript";
  //script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
  //script.src="https://static.tagboard.com/embed/assets/js/embed.js";
  script.src = "https://apps.elfsight.com/p/platform.js";
  script.defer = true;
  //script.async = true;
  //script.innerHTML = '{"symbol": "FX:EURUSD", "width": 350, "colorTheme": "light", "isTransparent": false,"locale": "en"}';
  document.getElementsByTagName('head')[0].appendChild(script);
  console.log(document.getElementsByTagName('script')[0]);
  console.log(document.head.innerHTML);
  console.log(document.body.innerHTML);
}
stringToHtml();
export const AAWidget = ({ title }: AAWidgetProps): ReactElement => {
  return <div className="aa-widget">
    {/*
  <div className="tradingview-widget-container">
  
  <div className="tradingview-widget-container__widget"></div>
  <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/EURUSD/?exchange=FX" rel="noopener" target="_blank"><span className="blue-text">EURUSD Rates</span></a> by TradingView</div>
  <Helmet><script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js" async> </script></Helmet>
</div>
  */}

    {/*
  <div>
      <a href="https://www.alaskasworld.com/news/IAmAlaska/tagboard.asp">See more #iamalaska posts</a>
      <div className="tagboard-embed" tgb-embed-id="1777"></div>

    </div>
  */}

  {/*
  
  */}
    <script src="https://apps.elfsight.com/p/platform.js" defer></script>
    <div className="elfsight-app-027ee1e8-a89e-44a9-b819-3b94317b48b7"></div>



  </div>

};











/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Helmet } from "react-helmet";

import { Error } from "./components/Error";
//import { title } from "process";

/**
 * React Component
 */
export interface AAWidgetProps extends BlockAttributes {
  title: string
}

let userHtml = "";

//reads user entered html and pulls out all script tags from them and adds them to array
function scriptElementPull(str){

  let strClone = str;
  let scriptArr = new Array();

  //starter script indexs
  let scriptStartIndex = strClone.indexOf('<script');
  let scriptEndIndex= strClone.indexOf('</script>');

  while(scriptStartIndex > -1){
    if(scriptEndIndex !== -1){
      //copy closet script
      let scriptCut = strClone.substring(scriptStartIndex, scriptEndIndex+9);
      //push script element into arr
      scriptArr.push(scriptCut);

      //cut out pulled script element from html body
      strClone =  strClone.substring(0,scriptStartIndex) + strClone.substring(scriptEndIndex+9);

      //update the indexes
      scriptStartIndex = strClone.indexOf('<script');
      scriptEndIndex= strClone.indexOf('</script>');
    }
  }

 //update user entered html to html without scripts
  userHtml = '<div id="userEmbedCode">'+strClone+'</div>';
  console.log(userHtml);
  return scriptArr;
}

let testHtml = '<script src="test1" defer></script><div className="elfsight-app-027ee1e8-a89e-44a9-b819-3b94317b48b7"></div><script src="test2" defer></script><script src="https://apps.elfsight.com/p/platform.js" defer></script><div className="elfsight-app-027ee1e8-a89e-44a9-b819-3b94317b48b7"></div>';
//scriptElementPull(testHtml);
//console.log(document.head.innerHTML);
//takes all elements and generate script elements with correct fields. Finally it appends to the head of the document
function scriptHeadAppend(arr){
  //initials DOMParser
  const parser = new DOMParser();

  //list of possible script element values
  //according to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
  const scriptElementAttributes = ['src', 'type', 'async', 'crossorigin', 'defer', 'fetchpriority', 'integrity', 'nomodule', 'nonce', 'referrerpolicy', ]
  


  //loop though each script string and convert string to actual html and append to document body
  arr.forEach(scriptElement => {

    //covert html string to html
    let doc = parser.parseFromString(scriptElement, "text/html");

    //single out what we need aka the html script
    let htmlScript = doc.getElementsByTagName('script')[0];

    //append to document head
    document.getElementsByTagName('head')[0].appendChild(htmlScript);
    
  });

 // console.log(document.head.innerHTML);
}

const fakehtml='<script src="https://apps.elfsight.com/p/platform.js" defer></script><div class="elfsight-app-bf37f02e-a1d3-42d3-855f-b9d2efa16b45"></div>'
function go(userText){
  scriptHeadAppend(scriptElementPull(fakehtml));
  console.log(userHtml);
  return ReactHtmlParser(userHtml);
}

/*
let rr = document.createElement('script');
rr.id = 'https://cdn.logwork.com/widget/text.js';
document.getElementsByTagName('body')[0].appendChild(rr);
console.log(document.head.innerHTML);
*/

function stringToHtml(str) {
  /*
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  let nodes = doc.body.childNodes;

  const pat = document.body;
  console.log(nodes);
  for(let node of nodes){
    pat.appendChild(node.cloneNode());
  }
  
  console.log(typeof doc.body.firstChild);
  console.log(doc.body.firstChild);
  
  return doc.body.firstChild;
 
  console.log(ReactHtmlParser("<h1>hello</h1>"))
   */
  const script = document.createElement('script');
  //script.type = "text/javascript";
  //script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
  //script.src="https://static.tagboard.com/embed/assets/js/embed.js";
  script.src = str;
  script.defer = true;
  //script.async = true;
  //script.innerHTML = '{"symbol": "FX:EURUSD", "width": 350, "colorTheme": "light", "isTransparent": false,"locale": "en"}';
  document.getElementsByTagName('head')[0].appendChild(script);
  console.log(document.getElementsByTagName('script')[0]);
  console.log(document.head.innerHTML);
  console.log(document.body.innerHTML);
}
/*
function textToHtmlConverter(str){
  const parser = new DOMParser();
  let doc = parser.parseFromString(str, "application/xml");
  return doc.getElementById('userEmbedCode')[0].childNodes;
  
}
*/

// https://cdn.logwork.com/widget/text.js
// <script src="https://cdn.logwork.com/widget/text.js" defer=""></script> <a href="https://logwork.com/current-time-in-brooklyn-united-states-ohio" class="clock-widget-text" data-timezone="America/New_York" data-language="en">Brooklyn, United States</a>
export const AAWidget = ({ title }: AAWidgetProps): ReactElement => {
  //https://cdn.logwork.com/widget/text.js
  //stringToHtml(title);
  //scriptHeadAppend(scriptElementPull(title))
  if(title!==undefined){
    scriptHeadAppend(scriptElementPull(title))
  
    console.log(ReactHtmlParser(userHtml)[0]);
    
    return <div className="aa-widget">
      {ReactHtmlParser(userHtml)[0]}
    </div>
  }
  else{
    return <div className="aa-widget">
    {userHtml}
  </div>
  }
  
};










/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Helmet } from "react-helmet";

import { Error } from "./components/Error";
//import { title } from "process";

/**
 * React Component
 */
export interface AAWidgetProps extends BlockAttributes {
  title: string
}

let userHtml = "";
let uScript = "";

//reads user entered html and pulls out all script tags from them and adds them to array
function scriptElementPull(str){

  let strClone = str;
  let scriptArr = new Array();

  //starter script indexs
  let scriptStartIndex = strClone.indexOf('<script');
  let scriptEndIndex= strClone.indexOf('</script>');

  while(scriptStartIndex > -1){
    if(scriptEndIndex !== -1){
      //copy closet script
      let scriptCut = strClone.substring(scriptStartIndex, scriptEndIndex+9);

      const parser = new DOMParser();
      let doc = parser.parseFromString(scriptCut, "text/html");
    //single out what we need aka the html script
    let htmlScript = doc.getElementsByTagName('script')[0];

      //add helmet and push script element into arr
      scriptArr.push(htmlScript);

      //cut out pulled script element from html body
      strClone =  strClone.substring(0,scriptStartIndex) + strClone.substring(scriptEndIndex+9);

      //update the indexes
      scriptStartIndex = strClone.indexOf('<script');
      scriptEndIndex= strClone.indexOf('</script>');
    }
  }

 //update user entered html to html without scripts
  userHtml = '<div id="userEmbedCode">'+strClone+'</div>';
  console.log(scriptArr);
  console.log(userHtml);
  return scriptArr;
}

let testHtml = '<script src="test1" defer></script><div className="elfsight-app-027ee1e8-a89e-44a9-b819-3b94317b48b7"></div><script src="test2" defer></script><script src="https://apps.elfsight.com/p/platform.js" defer></script><div className="elfsight-app-027ee1e8-a89e-44a9-b819-3b94317b48b7"></div>';
//scriptElementPull(testHtml);
//console.log(document.head.innerHTML);
//takes all elements and generate script elements with correct fields. Finally it appends to the head of the document
function scriptHeadAppend(arr){
  //initials DOMParser
  const parser = new DOMParser();

  //list of possible script element values
  //according to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
  const scriptElementAttributes = ['src', 'type', 'async', 'crossorigin', 'defer', 'fetchpriority', 'integrity', 'nomodule', 'nonce', 'referrerpolicy', ]
  


  //loop though each script string and convert string to actual html and append to document body
  arr.forEach(scriptElement => {

    //covert html string to html
    let doc = parser.parseFromString(scriptElement, "text/html");

    //single out what we need aka the html script
    let htmlScript = doc.getElementsByTagName('script')[0];

    //append to document head
    document.getElementsByTagName('head')[0].appendChild(htmlScript);
    
  });

 // console.log(document.head.innerHTML);
}

const fakehtml='<script src="https://apps.elfsight.com/p/platform.js" defer></script><div class="elfsight-app-bf37f02e-a1d3-42d3-855f-b9d2efa16b45"></div>'
function go(userText){
  //get scripts
  scriptElementPull(userText);
}

/*
let rr = document.createElement('script');
rr.id = 'https://cdn.logwork.com/widget/text.js';
document.getElementsByTagName('body')[0].appendChild(rr);
console.log(document.head.innerHTML);
*/

function stringToHtml(str) {
  /*
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  let nodes = doc.body.childNodes;

  const pat = document.body;
  console.log(nodes);
  for(let node of nodes){
    pat.appendChild(node.cloneNode());
  }
  
  console.log(typeof doc.body.firstChild);
  console.log(doc.body.firstChild);
  
  return doc.body.firstChild;
 
  console.log(ReactHtmlParser("<h1>hello</h1>"))
   */
  const script = document.createElement('script');
  //script.type = "text/javascript";
  //script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
  //script.src="https://static.tagboard.com/embed/assets/js/embed.js";
  script.src = str;
  script.defer = true;
  //script.async = true;
  //script.innerHTML = '{"symbol": "FX:EURUSD", "width": 350, "colorTheme": "light", "isTransparent": false,"locale": "en"}';
  document.getElementsByTagName('head')[0].appendChild(script);
  console.log(document.getElementsByTagName('script')[0]);
  console.log(document.head.innerHTML);
  console.log(document.body.innerHTML);
}
/*
function textToHtmlConverter(str){
  const parser = new DOMParser();
  let doc = parser.parseFromString(str, "application/xml");
  return doc.getElementById('userEmbedCode')[0].childNodes;
  
}
*/

/*
// https://cdn.logwork.com/widget/text.js
// <script src="https://cdn.logwork.com/widget/text.js" defer=""></script> <a href="https://logwork.com/current-time-in-brooklyn-united-states-ohio" class="clock-widget-text" data-timezone="America/New_York" data-language="en">Brooklyn, United States</a>
export const AAWidget = ({ title }: AAWidgetProps): ReactElement => {
  //https://cdn.logwork.com/widget/text.js
  //stringToHtml(title);
  //scriptHeadAppend(scriptElementPull(title))
  if(title!==undefined){
    scriptHeadAppend(scriptElementPull(title))
  
    console.log(ReactHtmlParser(userHtml)[0]);
    
    return <div className="aa-widget">
      {ReactHtmlParser(userHtml)[0]}
    </div>
  }
  else{
    return <div className="aa-widget">
    {userHtml}
  </div>
  }
  
};
*/

export const AAWidget = ({ title }: AAWidgetProps): ReactElement => {
  
  if(title!==undefined){
    let ar = scriptElementPull(title).map((s => <div key={s}>{s}</div>));
    return <div className="aa-widget">
      <div>{userHtml}</div>
      {ar}
    </div>
  }
  else{
    return <div className="aa-widget">
    {userHtml}
  </div>
  }
  
};











/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Helmet } from "react-helmet";

import { Error } from "./components/Error";
import { title } from "process";
//import { title } from "process";

/**
 * React Component
 */
export interface AAWidgetProps extends BlockAttributes {
  title: string
}

let userHtml = "";

//reads user entered html and pulls out all script tags from them and adds them to array
function scriptElementPull(str){

  let strClone = str;
  let scriptArr = new Array();

  //starter script indexs
  let scriptStartIndex = strClone.indexOf('<script');
  let scriptEndIndex= strClone.indexOf('</script>');

  while(scriptStartIndex > -1){
    if(scriptEndIndex !== -1){
      //copy closet script
      let scriptCut = strClone.substring(scriptStartIndex, scriptEndIndex+9);
      //push script element into arr
      scriptArr.push(scriptCut);

      //cut out pulled script element from html body
      strClone =  strClone.substring(0,scriptStartIndex) + strClone.substring(scriptEndIndex+9);

      //update the indexes
      scriptStartIndex = strClone.indexOf('<script');
      scriptEndIndex= strClone.indexOf('</script>');
    }
  }

 //update user entered html to html without scripts
  userHtml = '<div id="userEmbedCode">'+strClone+'</div>';
  console.log(userHtml);
  return scriptArr;
}

//---------------------------
let testHtml = '<script src="test1" defer></script><div className="elfsight-app-027ee1e8-a89e-44a9-b819-3b94317b48b7"></div><script src="test2" defer></script><script src="https://apps.elfsight.com/p/platform.js" defer></script><div className="elfsight-app-027ee1e8-a89e-44a9-b819-3b94317b48b7"></div>';
//scriptElementPull(testHtml);
//console.log(document.head.innerHTML);
//takes all elements and generate script elements with correct fields. Finally it appends to the head of the document
function scriptHeadAppend(arr){
  //initials DOMParser
  const parser = new DOMParser();

  //list of possible script element values
  //according to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
  const scriptElementAttributes = ['src', 'type', 'async', 'crossorigin', 'defer', 'fetchpriority', 'integrity', 'nomodule', 'nonce', 'referrerpolicy', ]
  


  //loop though each script string and convert string to actual html and append to document body
  arr.forEach(scriptElement => {
    
    //covert html string to html
    let doc = parser.parseFromString(scriptElement, "text/html");

    //single out what we need aka the html script
    let htmlScript = doc.getElementsByTagName('script')[0];

    //append to document head
    document.getElementsByTagName('body')[0].appendChild(htmlScript);
    
  });

 // console.log(document.head.innerHTML);
}

const fakehtml='<script src="https://apps.elfsight.com/p/platform.js" defer></script><div class="elfsight-app-bf37f02e-a1d3-42d3-855f-b9d2efa16b45"></div>'
function go(userText){
  scriptHeadAppend(scriptElementPull(fakehtml));
  console.log(userHtml);
  return ReactHtmlParser(userHtml);
}


export const AAWidget = ({ title }: AAWidgetProps): ReactElement => {
  //https://cdn.logwork.com/widget/text.js
  //stringToHtml(title);
  //scriptHeadAppend(scriptElementPull(title))
  if(title!==undefined){
    scriptHeadAppend(scriptElementPull(title))
    console.log(ReactHtmlParser(userHtml)[0]);
    const script = document.createElement('script');
    script.src = "//w.24timezones.com/l.js";
    script.type = "text/javascript";
    document.getElementsByTagName('head')[0].appendChild(script);

    return <div className="aa-widget">
      {ReactHtmlParser(userHtml)[0]}
    </div>
  }
  else{
    return <div className="aa-widget">
    {userHtml}
  </div>
  }
  
};

/*
let rr = document.createElement('script');
rr.id = 'https://cdn.logwork.com/widget/text.js';
document.getElementsByTagName('body')[0].appendChild(rr);
console.log(document.head.innerHTML);


function stringToHtml(str) {
  /*
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  let nodes = doc.body.childNodes;

  const pat = document.body;
  console.log(nodes);
  for(let node of nodes){
    pat.appendChild(node.cloneNode());
  }
  
  console.log(typeof doc.body.firstChild);
  console.log(doc.body.firstChild);
  
  return doc.body.firstChild;
 
  console.log(ReactHtmlParser("<h1>hello</h1>"))
   
  const script = document.createElement('script');
  //script.type = "text/javascript";
  //script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
  //script.src="https://static.tagboard.com/embed/assets/js/embed.js";
  script.src = str;
  script.defer = true;
  //script.async = true;
  //script.innerHTML = '{"symbol": "FX:EURUSD", "width": 350, "colorTheme": "light", "isTransparent": false,"locale": "en"}';
  document.getElementsByTagName('head')[0].appendChild(script);
  console.log(document.getElementsByTagName('script')[0]);
  console.log(document.head.innerHTML);
  console.log(document.body.innerHTML);
}
/*
function textToHtmlConverter(str){
  const parser = new DOMParser();
  let doc = parser.parseFromString(str, "application/xml");
  return doc.getElementById('userEmbedCode')[0].childNodes;
  
}
*/
//console.log(title);
// https://cdn.logwork.com/widget/text.js
// <script src="https://cdn.logwork.com/widget/text.js" defer=""></script> <a href="https://logwork.com/current-time-in-brooklyn-united-states-ohio" class="clock-widget-text" data-timezone="America/New_York" data-language="en">Brooklyn, United States</a>













/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Helmet } from "react-helmet";

import { Error } from "./components/Error";
import { title } from "process";
//import { title } from "process";

/**
 * React Component
 */
export interface AAWidgetProps extends BlockAttributes {
  title: string
}

let userHtml = "";

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
      //push script element into arr
      scriptArr.push(scriptCut);

      //cut out pulled script element from html body
      strClone =  strClone.substring(0,scriptStartIndex) + strClone.substring(scriptEndIndex+9);

      //update the indexes
      scriptStartIndex = strClone.indexOf('<script');
      scriptEndIndex= strClone.indexOf('</script>');
    }
  }

 //update user entered html to html without scripts
  userHtml = '<div id="userEmbedCode">'+strClone+'</div>';
  console.log(userHtml);
  return scriptArr;
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

  console.log(newScript.innerHTML)
  //add new script to head
  document.getElementsByTagName('body')[0].appendChild(newScript);
  /*
  let src, defer = "";
  scriptElementAttributes.forEach((attribute => {
    let currAttr = str.indexOf(attribute);

    if(currAttr !== -1){
      if (attribute === "src"){
        let closingQuoteIndex = str.indexOf('"', currAttr+5);
        let srcStr = str.substring(currAttr+5, closingQuoteIndex);
        script.src = srcStr;
      }
    }
    
    
    
    document.getElementsByTagName('head')[0].appendChild(script);

  }));
  */
}

//scriptScan('<script src="https://apps.elfsight.com/p/platform.js" defer></script>');
//---------------------------
let testHtml = '<script src="test1" defer></script><div className="elfsight-app-027ee1e8-a89e-44a9-b819-3b94317b48b7"></div><script src="test2" defer></script><script src="https://apps.elfsight.com/p/platform.js" defer></script><div className="elfsight-app-027ee1e8-a89e-44a9-b819-3b94317b48b7"></div>';
//scriptElementPull(testHtml);
//console.log(document.head.innerHTML);
//takes all elements and generate script elements with correct fields. Finally it appends to the head of the document
function scriptHeadAppend(arr){
  //initials DOMParser
  const parser = new DOMParser();

  //list of possible script element values
  //according to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
  const scriptElementAttributes = ['src', 'type', 'async', 'crossorigin', 'defer', 'fetchpriority', 'integrity', 'nomodule', 'nonce', 'referrerpolicy', ]
  


  //loop though each script string and convert string to actual html and append to document body
  arr.forEach(scriptElement => {
    
    /*
    //covert html string to html
    let doc = parser.parseFromString(scriptElement, "text/html");

    //single out what we need aka the html script
    let htmlScript = doc.getElementsByTagName('script')[0];

    //append to document head
    document.getElementsByTagName('body')[0].appendChild(htmlScript);
    */
  });

 // console.log(document.head.innerHTML);
}

const fakehtml='<script src="https://apps.elfsight.com/p/platform.js" defer></script><div class="elfsight-app-bf37f02e-a1d3-42d3-855f-b9d2efa16b45"></div>'
function go(userText){
  scriptHeadAppend(scriptElementPull(fakehtml));
  console.log(userHtml);
  return ReactHtmlParser(userHtml);
}


export const AAWidget = ({ title }: AAWidgetProps): ReactElement => {
  //https://cdn.logwork.com/widget/text.js
  //stringToHtml(title);
  //scriptHeadAppend(scriptElementPull(title))
  if(title!==undefined){
    scriptElementPull(title);

    /*
    console.log(ReactHtmlParser(userHtml)[0]);
    const script = document.createElement('script');
    script.src = "//w.24timezones.com/l.js";
    script.type = "text/javascript";
    document.getElementsByTagName('head')[0].appendChild(script);
    */

    return <div className="aa-widget">
      {ReactHtmlParser(userHtml)[0]}
    </div>
  }
  else{
    return <div className="aa-widget">
    {userHtml}
  </div>
  }
  
};

/*
let rr = document.createElement('script');
rr.id = 'https://cdn.logwork.com/widget/text.js';
document.getElementsByTagName('body')[0].appendChild(rr);
console.log(document.head.innerHTML);


function stringToHtml(str) {
  /*
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  let nodes = doc.body.childNodes;

  const pat = document.body;
  console.log(nodes);
  for(let node of nodes){
    pat.appendChild(node.cloneNode());
  }
  
  console.log(typeof doc.body.firstChild);
  console.log(doc.body.firstChild);
  
  return doc.body.firstChild;
 
  console.log(ReactHtmlParser("<h1>hello</h1>"))
   
  const script = document.createElement('script');
  //script.type = "text/javascript";
  //script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
  //script.src="https://static.tagboard.com/embed/assets/js/embed.js";
  script.src = str;
  script.defer = true;
  //script.async = true;
  //script.innerHTML = '{"symbol": "FX:EURUSD", "width": 350, "colorTheme": "light", "isTransparent": false,"locale": "en"}';
  document.getElementsByTagName('head')[0].appendChild(script);
  console.log(document.getElementsByTagName('script')[0]);
  console.log(document.head.innerHTML);
  console.log(document.body.innerHTML);
}
/*
function textToHtmlConverter(str){
  const parser = new DOMParser();
  let doc = parser.parseFromString(str, "application/xml");
  return doc.getElementById('userEmbedCode')[0].childNodes;
  
}
*/
//console.log(title);
// https://cdn.logwork.com/widget/text.js
// <script src="https://cdn.logwork.com/widget/text.js" defer=""></script> <a href="https://logwork.com/current-time-in-brooklyn-united-states-ohio" class="clock-widget-text" data-timezone="America/New_York" data-language="en">Brooklyn, United States</a>
